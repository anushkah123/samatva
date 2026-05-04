from flask import Flask, render_template, jsonify, request
import sqlite3
import json
import os
from werkzeug.security import generate_password_hash, check_password_hash
import secrets

app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY', secrets.token_hex(32))
DB_FILE = 'database/samatva.db'

def get_db():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    return conn

if not os.path.exists('database'):
    os.makedirs('database')

def init_db():
    with app.app_context():
        db = get_db()
        with app.open_resource('database/schema.sql', mode='r') as f:
            # Handle possible BOM
            content = f.read()
            db.cursor().executescript(content)
        db.commit()

init_db()

@app.route('/')
def index():
    return render_template('index.html')

@app.errorhandler(Exception)
def handle_exception(e):
    # Pass through HTTP errors
    if hasattr(e, 'code') and hasattr(e, 'description'):
        return jsonify(error=str(e.description)), e.code
    # Handle non-HTTP exceptions only
    return jsonify(error="Internal Server Error: " + str(e)), 500

@app.route('/api/auth', methods=['POST'])
def auth():
    try:
        data = request.json
        email = data.get('email', '').lower().strip()
        password = data.get('password', '')
        if not email or not password:
            return jsonify({'error': 'Email and password required'}), 400
        
        db = get_db()
        cur = db.cursor()
        
        # Check if user exists
        cur.execute('SELECT * FROM users WHERE email = ?', (email,))
        user = cur.fetchone()
        
        if user:
            # Handle legacy users with no password set
            if user['password'] is None:
                hashed_pw = generate_password_hash(password)
                cur.execute('UPDATE users SET password = ? WHERE id = ?', (hashed_pw, user['id']))
                db.commit()
                user_id = user['id']
            else:
                # Login: Verify password
                if not check_password_hash(user['password'], password):
                    return jsonify({'error': 'Invalid email or password'}), 401
                user_id = user['id']
        else:
            # Signup: Create new user
            hashed_pw = generate_password_hash(password)
            cur.execute('INSERT INTO users (email, password) VALUES (?, ?)', (email, hashed_pw))
            db.commit()
            cur.execute('SELECT id FROM users WHERE email = ?', (email,))
            user_id = cur.fetchone()['id']
        
        # Load all data for this user
        cur.execute('SELECT * FROM profiles WHERE user_id = ?', (user_id,))
        p_row = cur.fetchone()
        profile = None
        if p_row:
            profile = dict(p_row)
            try: profile['foods'] = json.loads(profile.get('preferred_foods', '[]'))
            except: profile['foods'] = []
            # Map water_target for frontend
            profile['water'] = profile.get('water_target', 3000)
            try: profile['custom_foods'] = json.loads(profile.get('custom_foods', '[]'))
            except: profile['custom_foods'] = []
        
        cur.execute('SELECT * FROM daily_workouts WHERE user_id = ?', (user_id,))
        workouts = {}
        for row in cur.fetchall():
            d = dict(row)
            try: d['muscles'] = json.loads(d['muscles'])
            except: d['muscles'] = []
            
            d['cardioDur'] = d.pop('cardio_dur', 0)
            dur = d.get('duration', 0)
            d['hr'] = dur // 60
            d['min'] = dur % 60
            d['cardio'] = bool(d.get('cardio'))
            
            workouts[row['log_date']] = d
        
        cur.execute('SELECT * FROM daily_meals WHERE user_id = ?', (user_id,))
        meals = {row['log_date']: json.loads(row['meal_json']) for row in cur.fetchall()}
        
        cur.execute('SELECT * FROM daily_water WHERE user_id = ?', (user_id,))
        water = {row['log_date']: row['amount'] for row in cur.fetchall()}
        
        cur.execute('SELECT * FROM history_archive WHERE user_id = ?', (user_id,))
        history = {row['log_date']: json.loads(row['data_json']) for row in cur.fetchall()}

        resp = jsonify({
            'user_id': user_id,
            'profile': dict(profile) if profile else None,
            'workouts': workouts,
            'meals': meals,
            'water': water,
            'history': history,
            'custom_foods': profile['custom_foods'] if profile else []
        })
        resp.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
        return resp

    except Exception as e:
        print(f"Auth Error: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/save', methods=['POST'])
def save():
    data = request.json
    email = data.get('email', '').lower().strip()
    key = data.get('key')
    val = data.get('value')
    log_date = data.get('date')
    
    db = get_db()
    cur = db.cursor()
    cur.execute('SELECT id FROM users WHERE email = ?', (email,))
    user = cur.fetchone()
    if not user: return jsonify({'error': 'User not found'}), 404
    user_id = user['id']
    
    if key == 'profile':
        cur.execute('''
            INSERT INTO profiles (user_id, name, age, gender, weight, height, goal, diet, preferred_foods, water_target)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(user_id) DO UPDATE SET 
                name=excluded.name, age=excluded.age, gender=excluded.gender, 
                weight=excluded.weight, height=excluded.height, goal=excluded.goal, 
                diet=excluded.diet, preferred_foods=excluded.preferred_foods, water_target=excluded.water_target
        ''', (user_id, val.get('name'), val.get('age'), val.get('gender'), val.get('weight'), val.get('height'), val.get('goal'), val.get('diet'), json.dumps(val.get('foods')), val.get('water')))
    
    elif key == 'custom_foods':
        cur.execute('''
            UPDATE profiles SET custom_foods = ? WHERE user_id = ?
        ''', (json.dumps(val), user_id))
    
    elif key == 'workout':
        cur.execute('''
            INSERT INTO daily_workouts (user_id, log_date, muscles, duration, intensity, sets, reps, cardio, cardio_dur)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(user_id, log_date) DO UPDATE SET 
                muscles=excluded.muscles, duration=excluded.duration, intensity=excluded.intensity,
                sets=excluded.sets, reps=excluded.reps, cardio=excluded.cardio, cardio_dur=excluded.cardio_dur
        ''', (user_id, log_date, json.dumps(val.get('muscles')), val.get('duration'), val.get('intensity'), val.get('sets'), val.get('reps'), val.get('cardio'), val.get('cardioDur')))
        
    elif key == 'meals':
        cur.execute('''
            INSERT INTO daily_meals (user_id, log_date, meal_json)
            VALUES (?, ?, ?)
            ON CONFLICT(user_id, log_date) DO UPDATE SET meal_json=excluded.meal_json
        ''', (user_id, log_date, json.dumps(val)))
        
    elif key == 'water':
        cur.execute('''
            INSERT INTO daily_water (user_id, log_date, amount)
            VALUES (?, ?, ?)
            ON CONFLICT(user_id, log_date) DO UPDATE SET amount=excluded.amount
        ''', (user_id, log_date, val))

    elif key == 'history':
        cur.execute('''
            INSERT INTO history_archive (user_id, log_date, data_json)
            VALUES (?, ?, ?)
            ON CONFLICT(user_id, log_date) DO UPDATE SET data_json=excluded.data_json
        ''', (user_id, log_date, json.dumps(val)))

    db.commit()
    resp = jsonify({'success': True})
    resp.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
    return resp

if __name__ == '__main__':
    app.run(debug=True, port=5001)

