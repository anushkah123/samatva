CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS profiles (
    user_id INTEGER PRIMARY KEY,
    name TEXT,
    age INTEGER,
    gender TEXT,
    weight REAL,
    height REAL,
    goal TEXT,
    diet TEXT,
    preferred_foods TEXT, -- JSON string
    water_target INTEGER DEFAULT 3000,
    FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS daily_workouts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    log_date DATE,
    muscles TEXT, -- JSON string
    duration INTEGER,
    intensity TEXT,
    sets INTEGER,
    reps INTEGER,
    cardio BOOLEAN,
    cardio_dur INTEGER,
    UNIQUE(user_id, log_date),
    FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS daily_meals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    log_date DATE,
    meal_json TEXT, -- The array of meals for that day
    UNIQUE(user_id, log_date),
    FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS daily_water (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    log_date DATE,
    amount INTEGER,
    UNIQUE(user_id, log_date),
    FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS history_archive (
    user_id INTEGER,
    log_date DATE,
    data_json TEXT, -- Full snapshot for history view
    PRIMARY KEY (user_id, log_date),
    FOREIGN KEY (user_id) REFERENCES users (id)
);
