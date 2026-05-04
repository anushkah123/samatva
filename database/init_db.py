import sqlite3
import os

def init_db():
    db_path = os.path.join(os.path.dirname(__file__), 'gym_app.db')
    schema_path = os.path.join(os.path.dirname(__file__), 'schema.sql')
    
    connection = sqlite3.connect(db_path)
    
    with open(schema_path) as f:
        connection.executescript(f.read())
    
    connection.commit()
    connection.close()
    print("Database initialized successfully.")

if __name__ == '__main__':
    init_db()
