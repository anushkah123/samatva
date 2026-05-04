import { fetchFoods } from '../api.js';
import { getStore } from '../store.js';

export async function initMealPlanner() {
    const user = getStore('user_session');
    if (!user) return;

    const foods = await fetchFoods(user.diet_type);
    const mealSections = {
        Breakfast: document.getElementById('breakfast-list'),
        Lunch: document.getElementById('lunch-list')
    };

    // Filter foods into categories (simplified for MVP)
    const categorized = {
        Breakfast: foods.filter(f => f.name.includes('Egg') || f.name.includes('Yogurt') || f.name.includes('Milk')),
        Lunch: foods.filter(f => !f.name.includes('Milk') && !f.name.includes('Yogurt'))
    };

    for (const [meal, el] of Object.entries(mealSections)) {
        if (!el) continue;
        el.innerHTML = (categorized[meal] || []).map(food => `
            <div class="card" style="padding: 12px; display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
                <div style="font-size: 20px;">🥗</div>
                <div style="flex: 1;">
                    <div style="font-weight: 700;">${food.name}</div>
                    <div style="font-size: 12px; color: var(--text-secondary);">${food.protein_per_100g}g protein / 100g</div>
                </div>
                <div class="badge badge-veg" style="font-size: 10px;">93% match</div>
            </div>
        `).join('');
    }
}
