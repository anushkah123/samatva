export function checkNotifications(consumed, target, workout) {
    const notifications = [];
    const now = new Date();
    const hour = now.getHours();

    if (consumed < target * 0.5 && hour >= 18) {
        notifications.push({
            icon: '🕒',
            text: 'Low protein alert! Try a high-protein snack soon.',
            color: 'var(--red)'
        });
    }

    if (workout && workout.intensity === 'Heavy') {
        notifications.push({
            icon: '🔥',
            text: 'Intense workout detected. Add a recovery shake!',
            color: 'var(--amber)'
        });
    }

    if (consumed >= target) {
        notifications.push({
            icon: '✅',
            text: 'Daily goal hit! Great work today.',
            color: 'var(--green)'
        });
    }

    return notifications;
}

export function renderNotifications(containerId, notifications) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = notifications.map(n => `
        <div class="card" style="border-left: 4px solid ${n.color}; padding: 16px; margin-bottom: 12px; display: flex; gap: 12px; align-items: center;">
            <div style="font-size: 20px;">${n.icon}</div>
            <p style="font-size: 14px;">${n.text}</p>
        </div>
    `).join('');
}
