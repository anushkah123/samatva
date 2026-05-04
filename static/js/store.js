export function initStore() {
    if (!localStorage.getItem('gym_app_state')) {
        localStorage.setItem('gym_app_state', JSON.stringify({
            user_session: null,
            today_workout: null,
            daily_cache: []
        }));
    }
}

export function getStore(key) {
    const state = JSON.parse(localStorage.getItem('gym_app_state'));
    return state[key];
}

export function setStore(key, value) {
    const state = JSON.parse(localStorage.getItem('gym_app_state'));
    state[key] = value;
    localStorage.setItem('gym_app_state', JSON.stringify(state));
}
