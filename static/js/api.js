export async function fetchProfile(data) {
    const res = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return res.json();
}

export async function fetchWorkoutTarget(data) {
    const res = await fetch('/api/workout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return res.json();
}

export async function fetchFoods(diet = '') {
    const res = await fetch(`/api/foods?diet=${diet}`);
    return res.json();
}

export async function logFoodAPI(data) {
    const res = await fetch('/api/log-food', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return res.json();
}

export async function fetchTodayStats(userId) {
    const res = await fetch(`/api/tracker/today?user_id=${userId}`);
    return res.json();
}

export async function fetchWeeklyAnalytics(userId) {
    const res = await fetch(`/api/analytics/weekly?user_id=${userId}`);
    return res.json();
}
