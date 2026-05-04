import { initStore, getStore, setStore } from './store.js';
import { fetchProfile, fetchWorkoutTarget, fetchFoods, logFoodAPI, fetchTodayStats, fetchWeeklyAnalytics } from './api.js';
import { drawProgressRing } from './components/proteinCalculator.js';
import { initMealPlanner } from './components/mealPlanner.js';
import { checkNotifications, renderNotifications } from './components/notificationEngine.js';

document.addEventListener('DOMContentLoaded', async () => {
    initStore();
    setupEventListeners();
    
    const user = getStore('user_session');
    if (user && user.id) {
        showPage('page-dashboard');
        updateDashboard();
    }
    
    loadQuickAdd();
});

function setupEventListeners() {
    // Generic Pill/Card Selectors
    const setupSelector = (containerId, activeClass = 'bg-magenta') => {
        const container = document.getElementById(containerId);
        if (!container) return;
        container.addEventListener('click', (e) => {
            const item = e.target.closest('button');
            if (!item) return;
            container.querySelectorAll('button').forEach(b => {
                b.classList.remove(activeClass, 'text-white', 'border-magenta');
                if (activeClass === 'bg-magenta') b.classList.add('bg-white/5', 'text-on-surface-medium');
            });
            item.classList.add(activeClass, 'text-white');
            if (activeClass === 'border-magenta') item.classList.add('bg-white/5');
            item.classList.remove('bg-white/5');
        });
    };

    setupSelector('goal-selector');
    setupSelector('diet-selector');
    setupSelector('muscle-selector', 'border-magenta');
    setupSelector('intensity-selector', 'border-magenta');

    window.addEventListener('save-profile', async () => {
        const data = {
            name: document.getElementById('prof-name').value,
            age: parseInt(document.getElementById('prof-age').value),
            gender: document.getElementById('prof-gender').value,
            weight: parseFloat(document.getElementById('prof-weight').value),
            height: parseFloat(document.getElementById('prof-height').value),
            goal: document.querySelector('#goal-selector button.bg-magenta')?.dataset.value || 'Muscle Gain',
            diet_type: document.querySelector('#diet-selector button.bg-magenta')?.dataset.value || 'Non-veg'
        };
        
        const res = await fetchProfile(data);
        if (res.status === 'success') {
            data.id = res.user_id;
            setStore('user_session', data);
            showPage('page-workout');
        }
    });

    window.addEventListener('log-workout', async () => {
        const user = getStore('user_session');
        const muscle = document.querySelector('#muscle-selector button.border-magenta')?.dataset.value || 'Full Body';
        const intensity = document.querySelector('#intensity-selector button.border-magenta')?.dataset.value || 'Moderate';
        const duration = parseInt(document.getElementById('duration-val').innerText);

        const res = await fetchWorkoutTarget({
            user_id: user.id,
            weight: user.weight,
            goal: user.goal,
            muscle_group: muscle,
            intensity: intensity,
            duration: duration
        });

        if (res.status === 'success') {
            setStore('today_workout', { muscle, intensity, targets: res.targets });
            showPage('page-dashboard');
            updateDashboard();
        }
    });
}

export async function updateDashboard() {
    const workout = getStore('today_workout');
    const user = getStore('user_session');
    if (!workout || !user) return;

    document.getElementById('dash-context').innerText = `${workout.intensity} ${workout.muscle} Day · ${user.weight}kg · ${user.goal}`;
    document.getElementById('target-val').innerHTML = `${Math.round(workout.targets.ideal)}<span class="text-2xl opacity-50">g</span>`;
    document.getElementById('min-target').innerText = Math.round(workout.targets.min);
    document.getElementById('ideal-target').innerText = Math.round(workout.targets.ideal);
    document.getElementById('rec-target').innerText = Math.round(workout.targets.recovery);

    if (workout.intensity === 'Heavy' && workout.muscle === 'Legs') {
        document.getElementById('alert-card').classList.remove('hidden');
    } else {
        document.getElementById('alert-card').classList.add('hidden');
    }

    const stats = await fetchTodayStats(user.id);
    const consumed = stats.consumed || 0;
    const target = workout.targets.ideal;
    const perc = Math.min(100, (consumed / target) * 100);

    const dashProtLabel = document.getElementById('dash-prot-label');
    if (dashProtLabel) dashProtLabel.innerText = `${consumed} / ${Math.round(target)}g`;
    
    const protBar = document.getElementById('prot-bar');
    if (protBar) protBar.style.width = `${perc}%`;
    
    // Draw Ring
    setTimeout(() => drawProgressRing('dash-ring-circle', perc), 100);
    
    // Update Tracker Page
    const trackerConsumed = document.getElementById('tracker-consumed');
    if (trackerConsumed) trackerConsumed.innerText = consumed;
    
    const trackerBar = document.getElementById('tracker-bar');
    if (trackerBar) trackerBar.style.width = `${perc}%`;
    
    const trackerPercLabel = document.getElementById('tracker-perc-label');
    if (trackerPercLabel) trackerPercLabel.innerText = `${Math.round(perc)}%`;
    
    const notifications = checkNotifications(consumed, target, workout);
    renderNotifications('notifications', notifications);
    
    renderLogs(stats.logs);
    initMealPlanner();
}

function renderLogs(logs) {
    const list = document.getElementById('log-list');
    if (!list) return;
    list.innerHTML = logs.map(log => `
        <div class="flex items-center justify-between py-4 border-b border-white/10 hover:bg-white/5 transition-colors px-2 -mx-2 rounded-lg group">
            <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-lg bg-black/50 border border-white/10 flex items-center justify-center text-2xl">🍲</div>
                <div>
                    <h4 class="font-body-lg text-body-lg font-medium text-on-surface-high">${log.name}</h4>
                    <p class="font-label-caps text-label-caps text-on-surface-medium mt-1">${log.meal_type}</p>
                </div>
            </div>
            <div class="text-right flex items-center gap-4">
                <div>
                    <p class="font-body-lg text-body-lg text-magenta font-semibold">${Math.round(log.protein_per_100g * log.quantity)}g</p>
                    <p class="font-label-caps text-label-caps text-on-surface-medium mt-1">Logged</p>
                </div>
            </div>
        </div>
    `).join('');
}

async function loadQuickAdd() {
    const foods = await fetchFoods();
    const grid = document.getElementById('quick-add-grid');
    if (!grid) return;
    const displayFoods = foods.slice(0, 5); // Take 5 + 1 custom
    
    grid.innerHTML = displayFoods.map(food => `
        <button class="glass-card rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:bg-white/10 transition-colors group" onclick="quickAdd(${food.id})">
            <span class="text-3xl group-hover:scale-110 transition-transform">🥩</span>
            <span class="font-label-caps text-label-caps text-on-surface-high">${food.name}</span>
            <span class="font-body-md text-body-md text-magenta">+${food.protein_per_100g}g</span>
        </button>
    `).join('') + `
        <button class="glass-card rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:bg-white/10 transition-colors group border-dashed border-white/30 text-on-surface-medium">
            <span class="material-symbols-outlined text-3xl group-hover:scale-110 transition-transform">add</span>
            <span class="font-label-caps text-label-caps">New Shortcut</span>
        </button>
    `;
}

window.quickAdd = async (foodId) => {
    const user = getStore('user_session');
    if (!user) return;
    await logFoodAPI({
        user_id: user.id,
        food_id: foodId,
        quantity: 1, 
        meal_type: 'Snack'
    });
    updateDashboard();
};

window.showPage = (pageId) => {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const target = document.getElementById(pageId);
    if(target) target.classList.add('active');
    
    // Toggle sidebar visibility
    const sidebar = document.getElementById('sidebar');
    if (pageId === 'page-landing' || pageId === 'page-profile') {
        sidebar.classList.add('hidden');
        document.getElementById('main-canvas').classList.remove('md:ml-72');
    } else {
        sidebar.classList.remove('hidden');
        document.getElementById('main-canvas').classList.add('md:ml-72');
    }
    window.scrollTo(0,0);
};
