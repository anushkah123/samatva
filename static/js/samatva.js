// ═══════════════════════════ CONSTANTS ═══════════════════════════
// TODO: Replace with your actual Render URL when deploying the backend!
// Keep it as an empty string '' for local development using Flask
const API_BASE_URL = 'https://samatva-1.onrender.com';

const FOOD_DB = {
  // --- PROTEIN SOURCES ---
  eggs:      { name:'Eggs', emoji:'🥚', unit:'eggs', p:6.5, c:0.5, f:5.5, cal:78, diet:['Egg','NonVeg'], isBasic:true },
  egg_white: { name:'Egg Whites', emoji:'⚪', unit:'eggs', p:3.6, c:0.2, f:0.1, cal:17, diet:['Egg','NonVeg'], isBasic:true },
  paneer:    { name:'Paneer', emoji:'🧀', unit:'g', p:0.18, c:0.03, f:0.20, cal:2.65, diet:['Veg','Egg','NonVeg'], isBasic:true },
  chicken:   { name:'Chicken Breast', emoji:'🍗', unit:'g', p:0.31, c:0, f:0.036, cal:1.65, diet:['NonVeg'], isBasic:true },
  chicken_t: { name:'Chicken Thigh', emoji:'🍗', unit:'g', p:0.24, c:0, f:0.09, cal:1.77, diet:['NonVeg'] },
  fish:      { name:'Fish', emoji:'🐟', unit:'g', p:0.25, c:0, f:0.13, cal:2.08, diet:['NonVeg'], isBasic:true },
  mutton:    { name:'Mutton', emoji:'🥩', unit:'g', p:0.25, c:0, f:0.21, cal:2.94, diet:['NonVeg'], isBasic:true },
  soy:       { name:'Soy Chunks', emoji:'🫘', unit:'g', p:0.52, c:0.33, f:0.005, cal:3.45, diet:['Veg','Egg','NonVeg','Vegan'], isBasic:true },
  tofu:      { name:'Tofu', emoji:'🧊', unit:'g', p:0.08, c:0.02, f:0.04, cal:0.76, diet:['Veg','Egg','NonVeg','Vegan'], isBasic:true },
  whey:      { name:'Whey Protein', emoji:'🥤', unit:'scoop', p:24, c:3, f:1.5, cal:120, diet:['Veg','Egg','NonVeg'], isBasic:true },
  chhole:    { name:'Chickpeas (Chhole)', emoji:'🟡', unit:'bowls', p:9, c:27, f:2.6, cal:164, diet:['Veg','Egg','NonVeg','Vegan'], isBasic:true },
  rajma:     { name:'Rajma', emoji:'🔴', unit:'bowls', p:9, c:22, f:1.5, cal:137, diet:['Veg','Egg','NonVeg','Vegan'], isBasic:true },
  
  // --- INDIAN STAPLES ---
  chapati:   { name:'Chapati/Roti', emoji:'🫓', unit:'pieces', p:3, c:15, f:0.4, cal:71, diet:['Veg','Egg','NonVeg','Vegan'], isBasic:true },
  paratha:   { name:'Paratha', emoji:'🫓', unit:'pieces', p:4, c:35, f:12, cal:260, diet:['Veg','Egg','NonVeg'] },
  rice:      { name:'Rice (cooked)', emoji:'🍚', unit:'bowls', p:2.7, c:28, f:0.3, cal:130, diet:['Veg','Egg','NonVeg','Vegan'], isBasic:true },
  dal:       { name:'Dal (cooked)', emoji:'🫕', unit:'bowls', p:9, c:20, f:0.4, cal:116, diet:['Veg','Egg','NonVeg','Vegan'], isBasic:true },
  poha:      { name:'Poha', emoji:'🥣', unit:'bowls', p:5, c:45, f:8, cal:270, diet:['Veg','Egg','NonVeg','Vegan'] },
  upma:      { name:'Upma', emoji:'🥘', unit:'bowls', p:4, c:35, f:10, cal:250, diet:['Veg','Egg','NonVeg','Vegan'] },
  idli:      { name:'Idli', emoji:'⚪', unit:'pieces', p:2, c:15, f:0.2, cal:70, diet:['Veg','Egg','NonVeg','Vegan'] },
  dosa:      { name:'Dosa', emoji:'🥞', unit:'pieces', p:3, c:25, f:4, cal:150, diet:['Veg','Egg','NonVeg','Vegan'] },
  sambhar:   { name:'Sambhar', emoji:'🍲', unit:'bowls', p:3, c:12, f:2, cal:80, diet:['Veg','Egg','NonVeg','Vegan'] },
  khichdi:   { name:'Khichdi', emoji:'🥘', unit:'bowls', p:6, c:35, f:5, cal:210, diet:['Veg','Egg','NonVeg'] },
  
  // --- VEGETABLES/SABZI ---
  bhaji:     { name:'Mixed Veg Sabzi', emoji:'🍛', unit:'bowls', p:4, c:15, f:8, cal:150, diet:['Veg','Egg','NonVeg','Vegan'], isBasic:true },
  potato:    { name:'Aloo Sabzi', emoji:'🥔', unit:'bowls', p:2, c:25, f:10, cal:200, diet:['Veg','Egg','NonVeg','Vegan'] },
  bhindi:    { name:'Bhindi Fry', emoji:'🥒', unit:'bowls', p:2, c:10, f:8, cal:120, diet:['Veg','Egg','NonVeg','Vegan'] },
  salad:     { name:'Green Salad', emoji:'🥗', unit:'bowls', p:1, c:5, f:0.2, cal:25, diet:['Veg','Egg','NonVeg','Vegan'], isBasic:true },
  
  // --- FRUITS ---
  banana:    { name:'Banana', emoji:'🍌', unit:'pieces', p:1.5, c:27, f:0.3, cal:107, diet:['Veg','Egg','NonVeg','Vegan'] },
  apple:     { name:'Apple', emoji:'🍎', unit:'pieces', p:0.5, c:25, f:0.3, cal:95, diet:['Veg','Egg','NonVeg','Vegan'] },
  mango:     { name:'Mango', emoji:'🥭', unit:'pieces', p:1, c:35, f:0.5, cal:150, diet:['Veg','Egg','NonVeg','Vegan'] },
  orange:    { name:'Orange', emoji:'🍊', unit:'pieces', p:1, c:12, f:0.1, cal:50, diet:['Veg','Egg','NonVeg','Vegan'] },
  papaya:    { name:'Papaya', emoji:'🍈', unit:'bowls', p:1, c:15, f:0.2, cal:60, diet:['Veg','Egg','NonVeg','Vegan'] },
  
  // --- DAIRY ---
  milk:      { name:'Milk', emoji:'🥛', unit:'glass', p:8.5, c:12, f:8.5, cal:162, diet:['Veg','Egg','NonVeg'], isBasic:true },
  curd:      { name:'Curd/Yoghurt', emoji:'🍶', unit:'bowls', p:3.5, c:5, f:4, cal:70, diet:['Veg','Egg','NonVeg'], isBasic:true },
  butter:    { name:'Butter', emoji:'🧈', unit:'tbsp', p:0.1, c:0.1, f:11, cal:100, diet:['Veg','Egg','NonVeg'] },
  ghee:      { name:'Ghee', emoji:'🍯', unit:'tbsp', p:0, c:0, f:14, cal:120, diet:['Veg','Egg','NonVeg'] },
  
  // --- SNACKS/OTHERS ---
  oats:      { name:'Oats', emoji:'🌾', unit:'g', p:0.17, c:0.66, f:0.07, cal:3.89, diet:['Veg','Egg','NonVeg','Vegan'], isBasic:true },
  pb:        { name:'Peanut Butter', emoji:'🥜', unit:'tbsp', p:4, c:3, f:8, cal:95, diet:['Veg','Egg','NonVeg','Vegan'] },
  nuts:      { name:'Mixed Nuts', emoji:'🌰', unit:'g', p:0.2, c:0.2, f:0.5, cal:5.8, diet:['Veg','Egg','NonVeg','Vegan'] },
  bread:     { name:'Whole Wheat Bread', emoji:'🍞', unit:'slices', p:4, c:15, f:1, cal:85, diet:['Veg','Egg','NonVeg','Vegan'] },
  sandwich:  { name:'Veg Sandwich', emoji:'🥪', unit:'pieces', p:6, c:30, f:10, cal:230, diet:['Veg','Egg','NonVeg'] },
  biryani:   { name:'Biryani', emoji:'🍲', unit:'bowls', p:15, c:60, f:20, cal:480, diet:['Veg','Egg','NonVeg'] },
  burger:    { name:'Burger', emoji:'🍔', unit:'pieces', p:15, c:40, f:18, cal:380, diet:['NonVeg'] },
  pizza:     { name:'Pizza Slice', emoji:'🍕', unit:'slices', p:12, c:35, f:15, cal:320, diet:['Veg','Egg','NonVeg'] },
  maggi:     { name:'Instant Noodles', emoji:'🍜', unit:'bowls', p:8, c:50, f:15, cal:350, diet:['Veg','Egg','NonVeg'] },
};

const MUSCLES = ['Chest','Back','Legs','Shoulders','Arms','Core','Full Body','Rest Day'];

// ═══════════════════════════ STATE HELPERS ═══════════════════════════
const fmtDate = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

const parseKey = (key) => {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(y, m - 1, d);
};

const today = () => fmtDate(new Date());

function getTimestamp() {
  const d = new Date();
  const datePart = fmtDate(d);
  const timePart = d.toTimeString().split(' ')[0];
  return `${datePart} ${timePart}`;
}

let lastCheckDate = today();
function checkDayReset() {
  const now = today();
  if (now !== lastCheckDate) {
    lastCheckDate = now;
    // Force reload to ensure fresh state for new day
    location.reload();
  }
}

const LS = {
  get: k => { try { return JSON.parse(localStorage.getItem(k)); } catch(e) { return null; } },
  set: (k,v) => { 
    localStorage.setItem(k, JSON.stringify(v));
    if (k.startsWith('sv_')) syncKeyToBackend(k, v);
  },
  del: k => { localStorage.removeItem(k); }
};

let isAuthLoading = false;

function syncKeyToBackend(fullKey, value) {
  if (isAuthLoading) return;
  const email = localStorage.getItem('sv_email');
  if (!email || fullKey === 'sv_email' || fullKey === 'sv_is_auth') return;
  
  let key = '';
  let date = today();
  
  if (fullKey === 'sv_profile') key = 'profile';
  else if (fullKey === 'sv_history') key = 'history';
  else if (fullKey.startsWith('sv_wo_')) { key = 'workout'; date = fullKey.replace('sv_wo_', ''); }
  else if (fullKey.startsWith('sv_meals_')) { key = 'meals'; date = fullKey.replace('sv_meals_', ''); }
  else if (fullKey.startsWith('sv_water_')) { key = 'water'; date = fullKey.replace('sv_water_', ''); }
  else if (fullKey === 'sv_saved_foods') key = 'custom_foods';
  else return;
  
  const timestamp = getTimestamp();
  
  fetch(`${API_BASE_URL}/api/save`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, key, value, date, timestamp })
  }).catch(e => console.error("Save error", e));
}

const getProfile   = () => LS.get('sv_profile');
const saveProfileLS = p => LS.set('sv_profile', p);
const getTodayWorkout = () => LS.get('sv_wo_' + today());
const saveTodayWorkout = w => { LS.set('sv_wo_' + today(), w); archiveCheck(); };
const getTodayMeals = () => LS.get('sv_meals_' + today()) || [];
const saveTodayMeals = m => { LS.set('sv_meals_' + today(), m); archiveCheck(); };
const getTodayWater = () => LS.get('sv_water_' + today()) || 0;
const saveTodayWater = ml => LS.set('sv_water_' + today(), ml);
const getHistory = () => LS.get('sv_history') || {};
const saveHistory = h => LS.set('sv_history', h);
const getSavedFoods = () => LS.get('sv_saved_foods') || [];
const saveSavedFoods = f => {
  LS.set('sv_saved_foods', f);
  syncKeyToBackend('sv_saved_foods', f);
};

function archiveCheck() {
  const hist = getHistory();
  const lastDay = LS.get('sv_last_day');
  const t = today();
  const profile = getProfile();
  
  if (lastDay && lastDay !== t && !hist[lastDay]) {
    const wo = LS.get('sv_wo_' + lastDay);
    const meals = LS.get('sv_meals_' + lastDay) || [];
    const water = LS.get('sv_water_' + lastDay) || 0;
    
    if (wo || meals.length) {
      // Calculate and save targets for this specific day
      const dayTargets = calcTargets(profile, wo);
      
      hist[lastDay] = { 
        workout: wo, 
        meals, 
        water,
        weight: profile ? profile.weight : 70,
        goal: profile ? profile.goal : 'Maintain',
        targets: dayTargets // Save exact targets for historical accuracy
      };
      saveHistory(hist);
    }
  }
  LS.set('sv_last_day', t);
}

// ═══════════════════════════ AUTH LOGIC ═══════════════════════════
let authMode = 'login';

function showAuth(mode) {
  authMode = mode;
  if (mode === 'signup') {
    LS.del('sv_profile'); // Ensure fresh start for new signups
  }
  navTo('page-auth');
  document.getElementById('auth-title').textContent = mode === 'login' ? 'Welcome Back' : 'Create Account';
  document.getElementById('auth-toggle-text').textContent = mode === 'login' ? "Don't have an account?" : "Already have an account?";
  document.getElementById('auth-toggle-btn').textContent = mode === 'login' ? 'Sign Up' : 'Login';
}

function toggleAuthMode() {
  showAuth(authMode === 'login' ? 'signup' : 'login');
}

function handleAuth() {
  const eVal = document.getElementById('auth-email').value;
  const pVal = document.getElementById('auth-pass').value;
  
  if (!eVal || !pVal) { 
    toast("Please enter both email and password"); 
    return; 
  }
  
  const email = eVal.toLowerCase().trim();
  const password = pVal.trim();
  
  isAuthLoading = true;
  localStorage.clear();
  localStorage.setItem('sv_email', email);
  toast("Authenticating...");
  
  fetch(`${API_BASE_URL}/api/auth`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  .then(res => {
    if (!res.ok) {
      return res.json().then(err => { throw new Error(err.error || "Authentication failed"); });
    }
    return res.json();
  })
  .then(data => {
    // 2. Populate LocalStorage with FRESH data
    if (data.profile) localStorage.setItem('sv_profile', JSON.stringify(data.profile));
    
    // Process all daily logs
    const history = data.history || {};
    
    if (data.workouts) {
      Object.entries(data.workouts).forEach(([d, v]) => {
        localStorage.setItem('sv_wo_' + d, JSON.stringify(v));
        if (!history[d]) history[d] = {};
        history[d].workout = v;
      });
    }
    
    if (data.meals) {
      Object.entries(data.meals).forEach(([d, v]) => {
        localStorage.setItem('sv_meals_' + d, JSON.stringify(v));
        if (!history[d]) history[d] = {};
        history[d].meals = v;
      });
    }
    
    if (data.water) {
      Object.entries(data.water).forEach(([d, v]) => {
        localStorage.setItem('sv_water_' + d, JSON.stringify(v));
        if (!history[d]) history[d] = {};
        history[d].water = v;
      });
    }
    
    localStorage.setItem('sv_history', JSON.stringify(history));
    if (data.custom_foods) localStorage.setItem('sv_saved_foods', JSON.stringify(data.custom_foods));
    
    // 3. Mark as authenticated and RELOAD
    localStorage.setItem('sv_is_auth', 'true');
    localStorage.setItem('sv_just_authed', 'true');
    isAuthLoading = false;
    location.reload();
  })
  .catch(err => {
    console.error(err);
    isAuthLoading = false;
    toast(err.message || "Authentication failed");
  });
}

function logout() {
  // Clear EVERYTHING and reload to ensure a perfect fresh start
  localStorage.clear();
  location.reload();
}

// ═══════════════════════════ TARGETS ═══════════════════════════
function calcTargets(profile, workout) {
  if (!profile) return { protein:150, carbs:250, fats:70, cal:2200, water:3000 };
  
  const w = parseFloat(profile.weight) || 70;
  const goal = profile.goal || 'Maintain';
  
  // 1. PROTEIN CALCULATION (Dynamic g/kg)
  // Rest Day Base: 1.0g/kg
  let pRatio = 1.0; 
  
  if (workout) {
    const intensity = workout.intensity || 'Moderate';
    // Intensity scaling
    if (intensity === 'Light') pRatio = 1.2;
    else if (intensity === 'Moderate') pRatio = 1.4;
    else if (intensity === 'Intense' || intensity === 'Heavy') pRatio = 1.8;
    
    // Muscle Group Bonus
    const largeMuscles = ['Legs', 'Back', 'Full Body'];
    if (workout.muscles && workout.muscles.some(m => largeMuscles.includes(m))) {
      pRatio += 0.1; // Extra for large groups
    }
    
    // Volume bonus
    if (workout.sets > 15) pRatio += 0.1;
  }
  
  // Goal Adjustment
  if (goal === 'Fat Loss') pRatio += 0.2; // Keep protein high to prevent muscle loss
  if (goal === 'Muscle Gain') pRatio += 0.1;
  
  // Cap pRatio to max 2.2g/kg to be realistic
  pRatio = Math.min(pRatio, 2.2);
  
  const protein = Math.round(w * pRatio);
  
  // 2. CALORIE CALCULATION (Dynamic TDEE)
  let bmr = w * 22; // Conservative BMR
  let activityMult = 1.2; // Sedentary/Rest
  
  if (workout) {
    const intensity = workout.intensity || 'Moderate';
    if (intensity === 'Light') activityMult = 1.35;
    else if (intensity === 'Moderate') activityMult = 1.55;
    else if (intensity === 'Intense' || intensity === 'Heavy') activityMult = 1.85;
    
    // Duration impact
    const durationHours = (workout.duration || 0) / 60;
    bmr += durationHours * 200; // ~200 kcal/hr lifting
    
    // Cardio impact
    if (workout.cardio && workout.cardioDur) {
      const cardioMult = workout.intensity === 'Intense' ? 10 : 7;
      bmr += workout.cardioDur * cardioMult; 
    }
  }
  
  let cal = Math.round(bmr * activityMult);
  
  // Goal Offset
  if (goal === 'Muscle Gain') cal += 400;
  if (goal === 'Fat Loss') cal -= 500;
  
  // 3. CARBS & FATS
  // Carbs scale with workload
  let carbPct = 0.45;
  if (workout) {
    if (workout.intensity === 'Intense' || workout.intensity === 'Heavy') carbPct = 0.55;
    if (workout.cardio && workout.cardioDur > 30) carbPct += 0.05;
  }
  
  const carbs = Math.round((cal * carbPct) / 4);
  const fats  = Math.round((cal * 0.25) / 9); 
  
  // 4. WATER
  let waterTarget = parseInt(profile.water) || 3000;
  if (workout) {
    waterTarget += 500; // Base workout hydration
    if (workout.duration > 60) waterTarget += 500;
    if (workout.cardio) waterTarget += 500;
  }
  
  return { protein, carbs, fats, cal, water: waterTarget };
}

function getMealsTotal(meals) {
  return meals.reduce((acc, m) => {
    acc.p += m.p; acc.c += m.c; acc.f += m.f; acc.cal += m.cal;
    return acc;
  }, { p:0, c:0, f:0, cal:0 });
}

function calcDayScore(data, targets) {
  if (!data || !data.meals || data.meals.length === 0) return { nutrition: 0, hydration: 0, total: 0 };
  
  const totals = getMealsTotal(data.meals);
  
  // Weighted Nutrition Scoring
  const pScore = Math.min(1.0, totals.p / targets.protein) * 0.45;
  const calScore = Math.min(1.0, totals.cal / targets.cal) * 0.25;
  const carbScore = Math.min(1.0, totals.c / targets.carbs) * 0.15;
  const fatScore = Math.min(1.0, totals.f / targets.fats) * 0.10;
  const consistencyBonus = 0.05; // 5% for just logging
  
  const nutrition = pScore + calScore + carbScore + fatScore + consistencyBonus;
  const hydration = Math.min(1.0, (data.water || 0) / targets.water);
  
  // Total score for history display (Weighted towards nutrition and workout)
  const workoutBonus = data.workout ? 0.1 : 0;
  const total = Math.min(1.0, nutrition + workoutBonus);
  
  return { nutrition, hydration, total };
}

// ═══════════════════════════ STREAK ═══════════════════════════
function getStreak() {
  const hist = getHistory();
  let streak = 0, d = new Date();
  d.setDate(d.getDate() - 1);
  while (true) {
    const key = fmtDate(d);
    if (hist[key]?.workout) { streak++; d.setDate(d.getDate()-1); }
    else break;
    if (streak > 365) break;
  }
  if (getTodayWorkout()) streak++;
  return streak;
}

// ═══════════════════════════ NAVIGATION ═══════════════════════════
function navTo(pageId) {
  const isAuth = LS.get('sv_is_auth');
  const hasProfile = !!getProfile();

  // Hide ALL pages and close ALL modals
  document.querySelectorAll('.page').forEach(p => {
    p.classList.remove('active');
    p.style.display = 'none';
  });
  document.querySelectorAll('.modal-backdrop').forEach(m => m.style.display = 'none');

  // Show target page
  const target = document.getElementById(pageId);
  if (target) {
    target.style.display = (pageId === 'page-landing' || pageId === 'page-auth' || pageId === 'page-onboarding') ? 'flex' : 'block';
    setTimeout(() => target.classList.add('active'), 10);
  }

  // Handle global UI elements (Header/Nav)
  const isDashboardPage = ['page-home','page-workout','page-meals','page-history','page-profile'].includes(pageId);
  
  if (isAuth && hasProfile && isDashboardPage) {
    document.getElementById('main-header').style.display = 'flex';
    document.getElementById('bottom-nav').style.display = 'flex';
    document.getElementById('app-wrapper').classList.add('visible');
  } else {
    document.getElementById('main-header').style.display = 'none';
    document.getElementById('bottom-nav').style.display = 'none';
    document.getElementById('app-wrapper').classList.remove('visible');
  }

  // Update active link states
  document.querySelectorAll('.nav-link, .bottom-nav-link').forEach(l => {
    l.classList.toggle('active', l.dataset.page === pageId);
  });

  // Render calls
  if (pageId === 'page-home')    renderHome();
  if (pageId === 'page-workout') renderWorkoutPage();
  if (pageId === 'page-meals')   renderMealsPage();
  if (pageId === 'page-history') {
    histViewDate = new Date(); // Reset to current month on open
    renderHistoryPage();
  }
  if (pageId === 'page-profile') renderProfilePage();
  
  window.scrollTo(0,0);
}

// ═══════════════════════════ TOAST ═══════════════════════════
function toast(msg, dur=2800) {
  const t = document.getElementById('toast');
  t.textContent = msg; 
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), dur);
}

// ═══════════════════════════ INITIALIZATION ═══════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  // 0. Cleanup Library Duplicates (One-time)
  const saved = getSavedFoods();
  if (saved.length > 0) {
    const unique = [];
    const names = new Set();
    saved.forEach(f => {
      if (!names.has(f.name)) {
        unique.push(f);
        names.add(f.name);
      }
    });
    if (unique.length !== saved.length) saveSavedFoods(unique);
  }
  
  initSelectors();

  // Monitor for day changes (12:00 AM transition)
  setInterval(checkDayReset, 60000);
  checkDayReset();

  const isAuth = LS.get('sv_is_auth');
  const p = getProfile();
  const justAuthed = localStorage.getItem('sv_just_authed');

  // 2. Deterministic Startup Routing
  if (justAuthed) {
    localStorage.removeItem('sv_just_authed');
    navTo(p ? 'page-home' : 'page-onboarding');
  } else {
    // ALWAYS start at Landing for fresh visits
    navTo('page-landing');
  }
});

function initSelectors() {
  initSingleChip('ob-goal');
  initSingleChip('ob-diet');
  initSingleChip('pf-goal');
  initSingleChip('pf-diet');
  initMultiChip('ob-foods');
  initMultiChip('pf-foods');
  initMultiChip('wo-muscles'); // Initialize workout muscles
  
  // Dynamic diet listeners
  document.getElementById('ob-diet')?.addEventListener('click', (e) => {
    if (e.target.classList.contains('chip')) {
      const diet = getSelectedChips('ob-diet')[0];
      renderFoodChips('ob-foods', true, diet);
    }
  });
  document.getElementById('pf-diet')?.addEventListener('click', (e) => {
    if (e.target.classList.contains('chip')) {
      const diet = getSelectedChips('pf-diet')[0];
      renderFoodChips('pf-foods', true, diet);
    }
  });

  const p = getProfile();
  renderFoodChips('ob-foods', true, p?.diet);
  renderFoodChips('pf-foods', true, p?.diet);
}

// ═══════════════════════════ HELPERS ═══════════════════════════
function adj(id, delta) {
  const el = document.getElementById(id);
  const v = Math.max(0, parseInt(el.textContent) + delta);
  el.textContent = v;
}
function adjFloat(id, delta) {
  const el = document.getElementById(id);
  const v = Math.max(0.5, parseFloat(el.textContent) + delta);
  el.textContent = Math.round(v * 2) / 2;
}

function adjFoodQty(dir) {
  const fSelect = document.getElementById('fm-food');
  const f = FOOD_DB[fSelect.value];
  if (!f) return;
  const el = document.getElementById('fm-qty');
  let current = parseFloat(el.textContent) || 0;
  
  let step = 1;
  let min = 1;
  
  if (f.unit === 'g' || f.unit === 'ml') {
    step = 50;
    min = 10;
  } else {
    step = 0.5;
    min = 0.5;
  }

  let v = current + (dir * step);
  if (v < min) v = min;
  
  el.textContent = (f.unit === 'g' || f.unit === 'ml') ? Math.round(v) : (Math.round(v * 2) / 2);
  updateFoodPreview();
}

function initSingleChip(containerId) {
  const container = document.getElementById(containerId);
  if (!container || container.dataset.init === 'true') return;
  container.addEventListener('click', e => {
    const chip = e.target.closest('.chip');
    if (!chip) return;
    container.querySelectorAll('.chip').forEach(c => c.classList.remove('selected'));
    chip.classList.add('selected');
  });
  container.dataset.init = 'true';
}
function initMultiChip(containerId) {
  const container = document.getElementById(containerId);
  if (!container || container.dataset.init === 'true') return;
  container.addEventListener('click', e => {
    const chip = e.target.closest('.chip');
    if (!chip) return;
    chip.classList.toggle('selected');
  });
  container.dataset.init = 'true';
}
function getSelectedChips(containerId) {
  return [...document.querySelectorAll(`#${containerId} .chip.selected`)].map(c => c.dataset.val);
}
function setSelectedChips(containerId, vals=[], cls='selected') {
  document.querySelectorAll(`#${containerId} .chip`).forEach(c => {
    c.classList.toggle(cls, vals.includes(c.dataset.val));
  });
}

function renderFoodChips(containerId, multi=true, dietFilter=null) {
  const el = document.getElementById(containerId);
  if (!el) return;
  
  let foods = Object.entries(FOOD_DB);
  if (dietFilter) {
    foods = foods.filter(([k, f]) => {
      let dietMatch = false;
      if (dietFilter === 'NonVeg') dietMatch = true;
      else if (dietFilter === 'Veg') dietMatch = f.diet.includes('Veg');
      else if (dietFilter === 'Egg') dietMatch = f.diet.includes('Veg') || f.diet.includes('Egg');
      else if (dietFilter === 'Vegan') dietMatch = f.diet.includes('Vegan');
      
      // Only show if it matches diet AND is a basic staple
      return dietMatch && f.isBasic;
    });
  }

  // Add custom saved foods (Permanent)
  const saved = getSavedFoods();
  const savedFoods = saved.map(s => [s.name, { emoji: '⭐', name: s.name, unit: s.unit, p: s.p, c: s.c, f: s.f, cal: s.cal, isCustom: true }]);
  const allFoods = [...foods, ...savedFoods];

  el.innerHTML = allFoods.map(([k,f], idx) => {
    const isCustom = !!f.isCustom;
    // For custom foods, add a small 'x' button to remove them
    const deleteHtml = isCustom ? `<span class="delete-food-btn" onclick="removeSavedFood(event, ${idx - foods.length})" style="margin-left: 8px; font-size: 10px; background: rgba(255,255,255,0.1); border-radius: 50%; width: 16px; height: 16px; display: inline-flex; align-items: center; justify-content: center;">✕</span>` : '';
    return `<div class="chip" data-val="${k}" ${isCustom ? 'style="border-color: var(--amber);"' : ''}>${f.emoji} ${f.name}${deleteHtml}</div>`;
  }).join('');
}

function removeSavedFood(e, idx) {
  if (e) e.stopPropagation();
  if (!confirm("Remove this food from your permanent library?")) return;
  const saved = getSavedFoods();
  saved.splice(idx, 1);
  saveSavedFoods(saved);
  renderProfilePage();
  renderMealsPage();
  toast("Food removed from library");
}

function selectIntensity(el) {
  el.parentNode.querySelectorAll('.chip').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
}

function selectCardio(isYes) {
  document.getElementById('wo-cardio-no').classList.toggle('selected', !isYes);
  document.getElementById('wo-cardio-yes').classList.toggle('selected', isYes);
  document.getElementById('wo-cardio-dur-container').style.display = isYes ? 'block' : 'none';
}

// ═══════════════════════════ WATER ═══════════════════════════
function logWater(ml) {
  let cur = getTodayWater();
  if (ml === 'reset') {
    cur = 0;
    toast(`💧 Water reset`);
  } else {
    cur = Math.max(0, cur + ml);
    if (ml > 0) toast(`💧 +${ml}ml hydrated`);
    else toast(`💧 ${Math.abs(ml)}ml removed`);
  }
  saveTodayWater(cur);
  updateWaterUI(cur);
}
function updateWaterUI(ml) {
  const profile = getProfile();
  const target = profile ? calcTargets(profile, getTodayWorkout()).water : 3000;
  const pct = Math.min(100, (ml / target) * 100);
  const lbl = document.getElementById('home-water-label');
  const bar = document.getElementById('home-water-bar');
  
  const rem = Math.max(0, target - ml);
  if (lbl) lbl.innerHTML = `<span style="color:#fff;">${(ml/1000).toFixed(1)}L / ${(target/1000).toFixed(1)}L</span> 
                             <span style="opacity:0.5; margin-left: 8px;">·</span> 
                             <span style="color:var(--royal); margin-left: 8px;">${rem === 0 ? 'Hydrated' : (rem/1000).toFixed(1) + 'L left'}</span>`;
  if (bar) bar.style.width = pct + '%';
}

// ═══════════════════════════ RING RENDERING ═══════════════════════════
function renderProgressBar(val, max, color, label, unit) {
  const pct = Math.min(100, (val / Math.max(1, max)) * 100);
  const remaining = Math.max(0, max - val);
  const isCompleted = remaining === 0;
  
  return `
    <div class="macro-progress-container">
      <div class="macro-progress-header">
        <div class="macro-label" style="color: ${color};">${label} <span style="color: var(--text-muted); font-size: 10px; font-weight: 500;">(Target: ${Math.round(max)}${unit})</span></div>
        <div class="macro-status">
          <span class="macro-consumed">${Math.round(val)}${unit} <span style="font-size: 11px; color: var(--text-muted); font-weight: 500;">consumed</span></span>
        </div>
      </div>
      <div class="macro-bar-bg">
        <div class="macro-bar-fill" style="width: ${pct}%; background-color: ${color}; color: ${color};"></div>
      </div>
      <div class="flex justify-between items-center" style="margin-top: 4px;">
        <span class="macro-percentage">${Math.round(pct)}%</span>
        <span class="macro-remaining" style="color: ${isCompleted ? 'var(--green)' : 'var(--text-muted)'}; font-size: 11px; font-weight: 700;">
          ${isCompleted ? 'Goal Completed 🎉' : 'Need ' + Math.round(remaining) + unit + ' more'}
        </span>
      </div>
    </div>`;
}

// Keep makeRing for small visualizations if needed, but primary is progress bars
function makeRing(val, max, color, label) {
  const r = 40, circ = 2 * Math.PI * r;
  const pct = Math.min(1, val / Math.max(1, max));
  const offset = circ * (1 - pct);
  return `
    <div class="ring-item">
      <div class="ring-svg-container" style="width: 60px; height: 60px; position: relative;">
        <svg viewBox="0 0 100 100" style="width: 100%; height: 100%;">
          <circle cx="50" cy="50" r="${r}" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="8"/>
          <circle cx="50" cy="50" r="${r}" fill="none" stroke="${color}" stroke-width="10" 
            stroke-linecap="round" stroke-dasharray="${circ}" stroke-dashoffset="${offset}"
            style="transition: stroke-dashoffset 0.8s ease;"/>
        </svg>
      </div>
      <div style="font-size: 9px; color: ${color}; font-weight: 800; text-transform: uppercase;">${label}</div>
    </div>`;
}

// ═══════════════════════════ HOME DASHBOARD ═══════════════════════════
function renderHome() {
  const p = getProfile(); if (!p) return;
  const wo = getTodayWorkout();
  const meals = getTodayMeals();
  const totals = getMealsTotal(meals);
  const targets = calcTargets(p, wo);

  document.getElementById('home-greeting').textContent = `Hi there, ${p.name}! 👋`;
  document.getElementById('home-subgreeting').textContent = `Your Daily Progress`;
  
  const streak = getStreak();
  document.getElementById('home-streak-val').textContent = `${streak} Day Streak`;

  const calRemaining = Math.max(0, targets.cal - totals.cal);
  const nutritionSum = document.getElementById('home-nutrition-summary');
  if (nutritionSum) {
    nutritionSum.innerHTML = `${Math.round(totals.cal)} / ${targets.cal} kcal`;
  }
  const nutritionBar = document.getElementById('home-nutrition-bar');
  if (nutritionBar) {
    nutritionBar.style.width = Math.min(100, (totals.cal / targets.cal) * 100) + '%';
  }

  const ringsEl = document.getElementById('home-rings');
  if (ringsEl) {
    ringsEl.className = "flex-col gap-24 w-full";
    ringsEl.innerHTML = 
      renderProgressBar(totals.p, targets.protein, 'var(--hot-pink)', 'Protein', 'g') +
      renderProgressBar(totals.c, targets.carbs, 'var(--royal)', 'Carbs', 'g') +
      renderProgressBar(totals.f, targets.fats, 'var(--vermilion)', 'Fats', 'g') +
      renderProgressBar(totals.cal, targets.cal, 'var(--amber)', 'Calories', ' kcal');
  }

  updateWaterUI(getTodayWater());

  const woSum = document.getElementById('home-workout-summary');
  if (wo) {
    let dur = wo.hr > 0 ? `${wo.hr}h ${wo.min}m` : `${wo.min}m`;
    woSum.textContent = `${wo.muscles.join(' + ')} · ${dur}`;
  } else {
    woSum.textContent = `No workout logged today`;
  }

  renderSuggestions(totals, targets, wo);
}

function renderSuggestions(totals, targets, wo) {
  const seg = document.getElementById('home-suggestions');
  let suggestions = [];
  
  if (totals.p < targets.protein * 0.8) {
    if (totals.p < targets.protein * 0.5) suggestions.push("Prioritize protein to hit your daily requirement 🍗");
    else suggestions.push("You're close! A scoop of whey or 2 eggs will hit your protein goal 🥚");
  }
  
  if (getTodayWater() < targets.water * 0.7) {
    suggestions.push("Hydration alert: Drink more water to stay optimized 💧");
  }
  
  if (wo) {
    if (wo.intensity === 'Intense' || wo.intensity === 'Heavy') {
      suggestions.push("High intensity session detected → Ensure you get enough carbs for recovery ⚡");
      if (wo.muscles.some(m => ['Legs', 'Back', 'Full Body'].includes(m))) {
        suggestions.push("Large muscle groups trained → Focus on sleep and high protein intake tonight");
      }
    }
  } else {
    suggestions.push("Recovery day → Targets adjusted for lower activity levels 🧘");
  }
  
  if (getStreak() >= 3) {
    suggestions.push(`Fantastic ${getStreak()} day streak! Your body is adapting. Keep going! 🔥`);
  }
  
  if (suggestions.length === 0) {
    suggestions.push("You're hitting all your targets! Keep it up. ✨");
  }

  seg.innerHTML = suggestions.map((s, idx) => {
    const colors = ['var(--hot-pink)', 'var(--royal)', 'var(--vermilion)', 'var(--light-blue)'];
    const color = colors[idx % colors.length];
    return `
      <div class="glass card p-20 border-l-4" style="border-color: ${color}; background: rgba(255, 255, 255, 0.01); display: flex; align-items: center; gap: 16px;">
        <div style="background: ${color}; width: 8px; height: 8px; border-radius: 50%; box-shadow: 0 0 10px ${color};"></div>
        <p class="text-sm font-bold" style="color: #eee;">${s}</p>
      </div>
    `;
  }).join('');
}

// ═══════════════════════════ ONBOARDING ═══════════════════════════
function saveOnboarding() {
  const name = document.getElementById('ob-name').value.trim();
  const weight = document.getElementById('ob-weight').value;
  if (!name || !weight) { toast("Name and Weight are required"); return; }
  
  const profile = {
    name, age: document.getElementById('ob-age').value,
    gender: document.getElementById('ob-gender').value,
    weight, height: document.getElementById('ob-height').value,
    goal: getSelectedChips('ob-goal')[0],
    diet: getSelectedChips('ob-diet')[0],
    water: document.getElementById('ob-water').textContent,
    foods: getSelectedChips('ob-foods')
  };
  
  saveProfileLS(profile);
  
  // Transition to main app
  document.getElementById('page-onboarding').style.display = 'none';
  document.getElementById('app-wrapper').classList.add('visible');
  document.getElementById('main-header').style.display = 'flex';
  document.getElementById('bottom-nav').style.display = 'flex';
  
  navTo('page-home');
  toast("Profile setup complete!");
}

// ═══════════════════════════ PROFILE ═══════════════════════════
function renderProfilePage() {
  const p = getProfile(); if (!p) return;
  document.getElementById('pf-name').value = p.name;
  document.getElementById('pf-age').value = p.age;
  document.getElementById('pf-gender').value = p.gender;
  document.getElementById('pf-weight').value = p.weight;
  document.getElementById('pf-height').value = p.height;
  document.getElementById('pf-water').textContent = p.water || 3000;
  
  setSelectedChips('pf-goal', [p.goal]);
  setSelectedChips('pf-diet', [p.diet]);
  
  renderFoodChips('pf-foods', true, p.diet);
  setSelectedChips('pf-foods', p.foods || []);
  
  // Set button text
  document.getElementById('pf-btn').textContent = 'Update Profile';
}

function saveProfile() {
  const p = {
    name: document.getElementById('pf-name').value,
    age: document.getElementById('pf-age').value,
    gender: document.getElementById('pf-gender').value,
    weight: document.getElementById('pf-weight').value,
    height: document.getElementById('pf-height').value,
    water: document.getElementById('pf-water').textContent,
    goal: getSelectedChips('pf-goal')[0],
    diet: getSelectedChips('pf-diet')[0],
    foods: getSelectedChips('pf-foods')
  };
  saveProfileLS(p);
  document.getElementById('profile-success').style.display = 'flex';
  setTimeout(() => document.getElementById('profile-success').style.display = 'none', 3000);
  toast("Profile Updated");
}

// ═══════════════════════════ WORKOUT ═══════════════════════════
function renderWorkoutPage() {
  const today = new Date();
  document.getElementById('wo-date-label').textContent = today.toLocaleDateString('en-IN', {weekday:'long', day:'numeric', month:'long'});
  
  // Re-init chips for multi-select if they aren't already
  initMultiChip('wo-muscles');
  
  const saved = getTodayWorkout();
  if (saved) {
    document.getElementById('wo-form').style.display = 'none';
    document.getElementById('wo-summary-card').style.display = 'block';
    document.getElementById('wo-success-msg').style.display = 'flex';
    
    let cardioStr = saved.cardio ? `Yes (${saved.cardioDur}m)` : 'No';
    let durationStr = saved.hr > 0 ? `${saved.hr}h ${saved.min}m` : `${saved.min}m`;

    document.getElementById('wo-summary-display').innerHTML = `
      <div class="wo-summary-grid">
        <div class="wo-stat-box"><span class="wo-stat-label">Muscles</span><span class="wo-stat-value">${saved.muscles.join(', ')}</span></div>
        <div class="wo-stat-box"><span class="wo-stat-label">Duration</span><span class="wo-stat-value">${durationStr}</span></div>
        <div class="wo-stat-box"><span class="wo-stat-label">Intensity</span><span class="wo-stat-value">${saved.intensity}</span></div>
        <div class="wo-stat-box"><span class="wo-stat-label">Sets</span><span class="wo-stat-value">${saved.sets}</span></div>
        <div class="wo-stat-box"><span class="wo-stat-label">Reps</span><span class="wo-stat-value">${saved.reps}</span></div>
        <div class="wo-stat-box"><span class="wo-stat-label">Cardio</span><span class="wo-stat-value">${cardioStr}</span></div>
      </div>
    `;
  } else {
    document.getElementById('wo-form').style.display = 'block';
    document.getElementById('wo-summary-card').style.display = 'none';
    document.getElementById('wo-success-msg').style.display = 'none';
  }
}

function saveWorkout() {
  const muscles = getSelectedChips('wo-muscles');
  if (!muscles.length) { toast("Select muscles trained"); return; }
  
  const intensityChip = document.querySelector('#wo-form .three-col-grid .chip.selected');
  const intensity = intensityChip ? intensityChip.dataset.val : 'Moderate';
  const hr = parseInt(document.getElementById('wo-hr').value) || 0;
  const min = parseInt(document.getElementById('wo-min').value) || 0;
  
  const cardioYes = document.getElementById('wo-cardio-yes')?.classList.contains('selected');
  
  const wo = {
    muscles, intensity,
    hr, min,
    duration: (hr * 60) + min,
    sets: parseInt(document.getElementById('wo-sets-in').value) || 0,
    reps: parseInt(document.getElementById('wo-reps-in').value) || 0,
    cardio: cardioYes,
    cardioDur: cardioYes ? (parseInt(document.getElementById('wo-cardio-dur').value) || 0) : 0
  };
  
  saveTodayWorkout(wo);
  renderWorkoutPage();
  toast("Workout saved!");
}

function editWorkout() {
  const saved = getTodayWorkout();
  if (saved) {
    setSelectedChips('wo-muscles', saved.muscles);
    document.getElementById('wo-hr').value = saved.hr || 0;
    document.getElementById('wo-min').value = saved.min || 0;
    document.getElementById('wo-sets-in').value = saved.sets || 0;
    document.getElementById('wo-reps-in').value = saved.reps || 0;
    document.getElementById('wo-cardio-dur').value = saved.cardioDur || 0;
    selectCardio(saved.cardio);
    
    document.querySelectorAll('#wo-form .chip').forEach(c => {
      if (c.dataset.val === saved.intensity) c.classList.add('selected');
      else if (!saved.muscles.includes(c.dataset.val)) c.classList.remove('selected');
    });
  }
  
  document.getElementById('wo-form').style.display = 'block';
  document.getElementById('wo-summary-card').style.display = 'none';
  document.getElementById('wo-success-msg').style.display = 'none';
}

// ═══════════════════════════ MEALS ═══════════════════════════
function renderMealsPage() {
  const p = getProfile(); if (!p) return;
  const meals = getTodayMeals();
  const totals = getMealsTotal(meals);
  const targets = calcTargets(p, getTodayWorkout());
  const savedFoods = getSavedFoods();

  const renderMacro = (id, cur, target, color, label, unit) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = renderProgressBar(cur, target, color, label, unit);
  };

  renderMacro('m-prot-val', totals.p, targets.protein, 'var(--hot-pink)', 'Protein', 'g');
  renderMacro('m-carb-val', totals.c, targets.carbs, 'var(--royal)', 'Carbs', 'g');
  renderMacro('m-fat-val', totals.f, targets.fats, 'var(--vermilion)', 'Fats', 'g');
  
  const calEl = document.getElementById('m-cal-summary-card');
  if (calEl) {
    calEl.innerHTML = renderProgressBar(totals.cal, targets.cal, 'var(--amber)', 'Daily Calories', ' kcal');
  }

  const quickEl = document.getElementById('meals-quick-chips');
  let chipsHtml = '';
  
  // 1. Profile-selected foods from the diet library
  (p.foods || []).forEach(k => {
    const f = FOOD_DB[k];
    if (f) chipsHtml += `<div class="chip orange" onclick="addQuickMeal('${k}')">${f.emoji} ${f.name}</div>`;
  });
  
  // 2. Custom permanent foods from your library
  savedFoods.forEach((s, idx) => {
    chipsHtml += `
      <div class="chip orange" style="border-color: var(--amber); display: inline-flex; align-items: center; gap: 8px;">
        <span onclick="addSavedMeal(${idx})" style="cursor:pointer;">⭐ ${s.name}</span>
        <span onclick="removeSavedFood(${idx})" style="opacity: 0.5; font-size: 14px; cursor: pointer; padding: 4px;">✕</span>
      </div>`;
  });
  
  quickEl.innerHTML = chipsHtml;



  const logEl = document.getElementById('meals-sections');
  logEl.innerHTML = meals.map((m, idx) => `
    <div class="glass card-sm flex items-center gap-16" style="background: rgba(255,255,255,0.01); padding: 16px;">
      <span style="font-size: 24px;">${m.emoji || '🍱'}</span>
      <div class="flex-1">
        <div class="text-sm font-bold">${m.name}</div>
        <div class="text-xs text-muted">${m.qty} ${m.unit} · ${m.p.toFixed(1)}g P · ${m.cal.toFixed(0)} kcal</div>
      </div>
      <button class="btn btn-outline btn-sm" onclick="delMeal(${idx})">✕</button>
    </div>
  `).join('') || '<p class="text-xs text-muted text-center py-20">No meals logged for today.</p>';
  
  const fSelect = document.getElementById('fm-food');
  let foods = Object.entries(FOOD_DB);
  if (p.diet) {
    foods = foods.filter(([k, f]) => {
      if (p.diet === 'NonVeg') return true;
      if (p.diet === 'Veg') return f.diet.includes('Veg');
      if (p.diet === 'Egg') return f.diet.includes('Veg') || f.diet.includes('Egg');
      if (p.diet === 'Vegan') return f.diet.includes('Vegan');
      return true;
    });
  }
  fSelect.innerHTML = foods.map(([k,f]) => `<option value="${k}">${f.emoji} ${f.name}</option>`).join('');
  fSelect.onchange = () => {
    const f = FOOD_DB[fSelect.value];
    if(f) {
      document.getElementById('fm-qty').textContent = (f.unit === 'g' || f.unit === 'ml') ? f.perUnit : 1;
      updateFoodPreview();
    }
  };
  updateFoodPreview();
}

function updateFoodPreview() {
  const f = FOOD_DB[document.getElementById('fm-food').value];
  if (!f) return;
  const q = parseFloat(document.getElementById('fm-qty').textContent);
  document.getElementById('fm-unit').textContent = f.unit;
  const mult = (f.unit === 'g' || f.unit === 'ml') ? (q / 100) : q;
  
  document.getElementById('fm-preview').innerHTML = `
    <div class="flex justify-around text-center">
      <div><div class="text-lg font-bold text-hot-pink">${(f.p * mult).toFixed(1)}g</div><div class="text-xs text-muted">PROT</div></div>
      <div><div class="text-lg font-bold text-royal">${(f.c * mult).toFixed(1)}g</div><div class="text-xs text-muted">CARB</div></div>
      <div><div class="text-lg font-bold text-amber">${(f.cal * mult).toFixed(0)}</div><div class="text-xs text-muted">KCAL</div></div>
    </div>`;
}

function openFoodModal() { document.getElementById('food-modal').style.display = 'flex'; }
function closeFoodModal() { document.getElementById('food-modal').style.display = 'none'; }
function closeCustomFoodModal() { 
  const modal = document.getElementById('custom-food-modal');
  modal.classList.remove('active');
  setTimeout(() => modal.style.display = 'none', 300);
}

function addFoodItem() {
  const f = FOOD_DB[document.getElementById('fm-food').value];
  const q = parseFloat(document.getElementById('fm-qty').textContent);
  const mult = (f.unit === 'g' || f.unit === 'ml') ? (q / 100) : q;
  
  const meals = getTodayMeals();
  meals.push({
    meal: 'Meal',
    name: f.name, emoji: f.emoji, qty: q, unit: f.unit,
    p: f.p * mult, c: f.c * mult, f: f.f * mult, cal: f.cal * mult
  });
  saveTodayMeals(meals);
  closeFoodModal();
  renderMealsPage();
  toast("Meal entry saved");
}

function addQuickMeal(key) {
  const f = FOOD_DB[key];
  if (!f) return;
  document.getElementById('fm-food').value = key;
  document.getElementById('fm-qty').textContent = (f.unit === 'g' || f.unit === 'ml') ? 100 : 1;
  updateFoodPreview();
  openFoodModal();
}

function addSavedMeal(idx) {
  const f = getSavedFoods()[idx];
  if (!f) return;
  const qty = prompt(`Enter quantity for ${f.name} (${f.unit}):`, "1");
  if (!qty || isNaN(qty)) return;
  const q = parseFloat(qty);
  const meals = getTodayMeals();
  
  // Custom foods already have per-unit macros stored
  meals.push({
    meal: 'Log', name: f.name, emoji: f.emoji || '🍱', qty: q, unit: f.unit,
    p: (f.p / f.qty) * q, c: (f.c / f.qty) * q, f: (f.f / f.qty) * q, cal: (f.cal / f.qty) * q
  });
  saveTodayMeals(meals);
  renderMealsPage();
  toast(`${f.name} logged`);
}

function removeSavedFood(idx) {
  if (!confirm("Remove this item from your library?")) return;
  const saved = getSavedFoods();
  saved.splice(idx, 1);
  saveSavedFoods(saved);
  renderMealsPage();
  toast("Item removed from library");
}

let currentCF = null;
function autoFillMacros() {
  const nameInput = document.getElementById('cf-name').value.trim().toLowerCase();
  const preview = document.getElementById('cf-preview');
  
  // 1. Exact Match
  let f = Object.values(FOOD_DB).find(x => x.name.toLowerCase() === nameInput);
  
  // 2. Keyword/Smart Match
  if (!f) {
    const keywords = {
      'chicken': 'chicken', 'egg': 'eggs', 'paneer': 'paneer', 'roti': 'chapati',
      'rice': 'rice', 'dal': 'dal', 'fish': 'fish', 'mutton': 'mutton',
      'apple': 'apple', 'banana': 'banana', 'milk': 'milk', 'bread': 'bread',
      'dosa': 'dosa', 'idli': 'idli', 'salad': 'salad', 'soy': 'soy'
    };
    for (const [k, v] of Object.entries(keywords)) {
      if (nameInput.includes(k)) { f = FOOD_DB[v]; break; }
    }
  }

  if (f) {
    currentCF = f;
    preview.style.display = 'block';
    document.getElementById('cf-preview-cal').textContent = `${Math.round(f.cal)} kcal`;
    document.getElementById('cf-preview-p').textContent = `${f.p}g`;
    document.getElementById('cf-preview-c').textContent = `${f.c}g`;
    document.getElementById('cf-preview-f').textContent = `${f.f}g`;
    document.getElementById('cf-unit').value = f.unit;
  } else {
    // 3. Heuristic Guess (Fallback for unknown items)
    currentCF = { name: document.getElementById('cf-name').value, p:5, c:20, f:5, cal:150, unit:'bowls' };
    preview.style.display = 'block';
    document.getElementById('cf-preview-cal').textContent = `~150 kcal (Est.)`;
    document.getElementById('cf-preview-p').textContent = `5g`;
    document.getElementById('cf-preview-c').textContent = `20g`;
    document.getElementById('cf-preview-f').textContent = `5g`;
    document.getElementById('cf-unit').value = 'bowls';
  }
}

function openCustomFoodModal(mode = 'permanent') {
  cfMode = mode;
  document.getElementById('cf-modal-title').textContent = mode === 'permanent' ? 'Add Custom Food' : 'Log One-Time Food';
  document.getElementById('cf-submit-btn').textContent = mode === 'permanent' ? 'Save to Library' : 'Log for Today';
  
  const dl = document.getElementById('food-suggestions');
  if (dl) dl.innerHTML = Object.values(FOOD_DB).map(f => `<option value="${f.name}">`).join('');
  
  document.getElementById('cf-name').value = '';
  document.getElementById('cf-qty').value = 1;
  document.getElementById('cf-preview').style.display = 'none';
  currentCF = null;
  
  const modal = document.getElementById('custom-food-modal');
  modal.style.display = 'flex';
  setTimeout(() => modal.classList.add('active'), 10);
}

function addCustomFoodItem() {
  const btn = document.getElementById('cf-submit-btn');
  if (btn.disabled) return;
  
  const name = document.getElementById('cf-name').value.trim();
  const q = parseFloat(document.getElementById('cf-qty').value) || 1;
  const unit = document.getElementById('cf-unit').value;
  
  if (!name) { toast("Food name is required"); return; }
  
  let foodObj;
  if (currentCF) {
    const f = currentCF;
    foodObj = {
      name: f.name, emoji: f.emoji || '🥘', qty: q, unit: unit || f.unit,
      p: f.p * q, c: f.c * q, f: f.f * q, cal: f.cal * q,
      meal: 'Log'
    };
  } else {
    // Manual entry for new food
    const mp = parseFloat(document.getElementById('cf-p').value) || 0;
    const mc = parseFloat(document.getElementById('cf-c').value) || 0;
    const mf = parseFloat(document.getElementById('cf-f').value) || 0;
    if (mp === 0 && mc === 0 && mf === 0) { toast("Please enter nutrients for this new food"); return; }
    
    foodObj = {
      name, emoji: '🍱', qty: q, unit: unit || 'bowl',
      p: mp * q, c: mc * q, f: mf * q, cal: (mp*4 + mc*4 + mf*9) * q,
      meal: 'Log'
    };
  }

  btn.disabled = true;
  btn.textContent = 'Saving...';

  if (cfMode === 'permanent') {
    const saved = getSavedFoods();
    // Prevent duplicates in library
    if (!saved.find(x => x.name === foodObj.name)) {
      saved.push(foodObj);
      saveSavedFoods(saved);
      toast(`${name} added to your library`);
    } else {
      toast(`${name} is already in your library`);
    }
  } else {
    const meals = getTodayMeals();
    meals.push(foodObj);
    saveTodayMeals(meals);
    toast(`${name} logged for today`);
  }
  
  setTimeout(() => {
    btn.disabled = false;
    btn.textContent = cfMode === 'permanent' ? 'Save to Library' : 'Log for Today';
    closeCustomFoodModal();
    renderMealsPage();
  }, 400);
}

function delMeal(idx) {
  const meals = getTodayMeals();
  meals.splice(idx, 1);
  saveTodayMeals(meals);
  renderMealsPage();
}

// ═══════════════════════════ HISTORY ═══════════════════════════
let histViewDate = new Date();
function renderHistoryPage() {
  const lbl = document.getElementById('hist-month-label');
  if (!lbl) return;
  lbl.textContent = histViewDate.toLocaleDateString('en-IN', {month:'long', year:'numeric'});
  
  const headers = ['MON','TUE','WED','THU','FRI','SAT','SUN'];
  const headEl = document.getElementById('hist-cal-headers');
  if (headEl) headEl.innerHTML = headers.map(h => `<div class="text-center text-xs font-bold text-muted">${h}</div>`).join('');
  
  const grid = document.getElementById('hist-cal-grid');
  if (!grid) return;
  grid.innerHTML = '';
  
  const first = new Date(histViewDate.getFullYear(), histViewDate.getMonth(), 1);
  const last = new Date(histViewDate.getFullYear(), histViewDate.getMonth() + 1, 0);
  let pad = first.getDay() - 1; if (pad < 0) pad = 6;
  for (let i=0; i<pad; i++) grid.innerHTML += `<div class="cal-day empty"></div>`;
  
  const hist = getHistory();
  const t = today();
  const pProfile = getProfile() || { goal: 'Maintain', weight: 70 };
  
  for (let d=1; d<=last.getDate(); d++) {
    const cur = new Date(histViewDate.getFullYear(), histViewDate.getMonth(), d);
    const key = fmtDate(cur);
    const data = (key === t) ? { workout:getTodayWorkout(), meals:getTodayMeals(), water:getTodayWater() } : hist[key];
    const el = document.createElement('div');
    
    let scorePct = 0;
    if (data) {
      const dayTargets = data.targets || calcTargets(pProfile, data.workout);
      const dayScore = calcDayScore(data, dayTargets);
      scorePct = dayScore.total;
    }
    const pct = parseFloat(scorePct.toFixed(3));
    const displayPct = Math.round(pct * 100);
    
    let color = 'rgba(255,255,255,0.05)';
    if (pct > 0) {
      if (pct <= 0.25) color = 'var(--vermilion)';
      else if (pct <= 0.5) color = 'var(--amber)';
      else if (pct <= 0.75) color = 'var(--royal)';
      else color = 'var(--green)';
    }
    
    el.style.aspectRatio = '1';
    el.className = 'cursor-pointer';
    el.onclick = () => showDayReport(key, null);
    
    const isToday = key === t;
    const highlightStyle = isToday ? 'border: 2px solid var(--vermilion); box-shadow: 0 0 10px rgba(255, 77, 0, 0.3);' : '';
    
    el.innerHTML = `
      <div style="
        width: 100%; height: 100%; 
        border-radius: 50%; 
        ${highlightStyle}
        background: conic-gradient(${color} ${pct*100}%, rgba(255,255,255,0.05) 0%);
        display: flex; align-items: center; justify-content: center;
        padding: 4px;
        position: relative;
      ">
        <div style="
          width: 100%; height: 100%; 
          background: var(--card-bg); 
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 10px; font-weight: bold;
          color: ${pct > 0 ? 'white' : 'var(--muted)'};
        ">
          ${pct > 0 ? displayPct + '%' : d}
        </div>
      </div>
    `;
    grid.appendChild(el);
  }
  renderRecentLogs();
}

function renderRecentLogs() {
  const container = document.getElementById('hist-recent-logs');
  if (!container) return;
  const hist = getHistory();
  const t = today();
  
  let recentHTML = '';
  let dt = new Date();
  
  for(let i=0; i<7; i++) {
    const key = fmtDate(dt);
    const data = (key === t) ? { workout:getTodayWorkout(), meals:getTodayMeals(), water:getTodayWater() } : hist[key];
    
    if (data && (data.workout || (data.meals && data.meals.length > 0) || data.water > 0)) {
      const wName = data.workout ? (data.workout.muscles || []).join(', ') : 'Rest Day';
      const wDur = data.workout ? data.workout.duration + 'm' : '';
      const cals = data.meals ? Math.round(getMealsTotal(data.meals).cal) : 0;
      recentHTML += `
        <div class="glass card-sm flex items-center justify-between cursor-pointer" onclick="showDayReport('${key}', null)" style="cursor: pointer;">
          <div class="flex-col">
            <div class="text-sm font-bold">${parseKey(key).toLocaleDateString('en-IN', {weekday:'short', month:'short', day:'numeric'})}</div>
            <div class="text-xs text-muted">${wName} ${wDur ? '· '+wDur : ''}</div>
          </div>
          <div class="text-right">
            <div class="text-sm font-bold text-amber">${cals} kcal</div>
            <div class="text-xs text-light-blue">${data.water||0} ml</div>
          </div>
        </div>
      `;
    }
    dt.setDate(dt.getDate() - 1);
  }
  container.innerHTML = recentHTML || '<p class="text-xs text-muted">No recent activity found.</p>';
}

function changeMonth(delta) {
  histViewDate = new Date(histViewDate.getFullYear(), histViewDate.getMonth() + delta, 1);
  renderHistoryPage();
}

function showDayReport(date, data) {
  const dt = parseKey(date);
  if (!data) {
    const t = today();
    if (date === t) data = { workout:getTodayWorkout(), meals:getTodayMeals(), water:getTodayWater() };
    else data = getHistory()[date];
  }

  if (!data || (!data.workout && (!data.meals || !data.meals.length) && !data.water)) { toast("No activity found for this day"); return; }
  
  const currentProfile = getProfile() || { goal: 'Maintain', weight: 70 };
  const dayProfile = {
    weight: data.weight || currentProfile.weight,
    goal: data.goal || currentProfile.goal,
    water: currentProfile.water
  };
  
  const dTargets = data.targets || calcTargets(dayProfile, data.workout);
  const dTotals = getMealsTotal(data.meals || []);
  const dScore = calcDayScore(data, dTargets);
  
  const finalPct = Math.round(dScore.nutrition * 100);
  const hydrationPct = Math.round(dScore.hydration * 100);
  
  let workoutHTML = '<p class="text-sm text-sec">Rest Day</p>';
  if (data.workout) {
    const cardioStr = data.workout.cardio ? `Yes (${data.workout.cardioDur}m)` : 'No';
    workoutHTML = `
      <div class="wo-summary-grid mt-16">
        <div class="wo-stat-box"><span class="wo-stat-label">Muscles</span><span class="wo-stat-value">${data.workout.muscles.join(', ')}</span></div>
        <div class="wo-stat-box"><span class="wo-stat-label">Duration</span><span class="wo-stat-value">${data.workout.duration}m</span></div>
        <div class="wo-stat-box"><span class="wo-stat-label">Intensity</span><span class="wo-stat-value">${data.workout.intensity}</span></div>
        <div class="wo-stat-box"><span class="wo-stat-label">Sets</span><span class="wo-stat-value">${data.workout.sets}</span></div>
        <div class="wo-stat-box"><span class="wo-stat-label">Reps</span><span class="wo-stat-value">${data.workout.reps}</span></div>
        <div class="wo-stat-box"><span class="wo-stat-label">Cardio</span><span class="wo-stat-value">${cardioStr}</span></div>
      </div>
    `;
  }
  
  let mealsHTML = '<p class="text-sm text-sec">No meals logged</p>';
  if (data.meals && data.meals.length > 0) {
    mealsHTML = data.meals.map(m => `
      <div class="flex items-center justify-between py-8 border-b" style="border-bottom: 1px solid rgba(255,255,255,0.05);">
        <div>
          <div class="text-sm">${m.emoji||''} ${m.name}</div>
          <div class="text-xs text-muted">${m.qty} ${m.unit}</div>
        </div>
        <div class="text-right">
          <div class="text-sm font-bold text-amber">${Math.round(m.cal)} kcal</div>
          <div class="text-xs text-muted">${m.p.toFixed(1)}g P · ${m.c.toFixed(1)}g C · ${m.f.toFixed(1)}g F</div>
        </div>
      </div>
    `).join('') + `
      <div class="flex justify-between items-center mt-12 pt-12" style="border-top: 1px solid rgba(255,255,255,0.1);">
        <span class="font-bold text-sm">Total Macros:</span>
        <span class="text-sm"><span class="text-hot-pink font-bold">${Math.round(dTotals.p)}g P</span> · <span class="text-royal font-bold">${Math.round(dTotals.c)}g C</span> · <span class="text-vermilion font-bold">${Math.round(dTotals.f)}g F</span></span>
      </div>
    `;
  }
  
  document.getElementById('dr-title').textContent = dt.toLocaleDateString('en-IN', {day:'numeric', month:'long', year:'numeric'});
  document.getElementById('dr-content').innerHTML = `
    <div class="flex-col gap-24">
      <div class="glass card-sm flex items-center justify-between p-24" style="background: rgba(255,255,255,0.02);">
        <div class="flex gap-24">
          <div>
            <div class="text-2xl font-bold">${finalPct}%</div>
            <div class="text-xs text-muted uppercase font-bold">Nutrition</div>
          </div>
          <div style="width: 1px; background: rgba(255,255,255,0.1);"></div>
          <div>
            <div class="text-2xl font-bold text-light-blue">${hydrationPct}%</div>
            <div class="text-xs text-muted uppercase font-bold">Hydration</div>
          </div>
        </div>
        <div class="text-right">
          <div class="text-sm font-bold ${data.workout ? 'text-vermilion' : 'text-muted'}">${data.workout ? 'WORKOUT COMPLETE 💪' : 'REST DAY 🧘'}</div>
        </div>
      </div>
      
      <div class="flex-col gap-16">
        ${renderProgressBar(dTotals.p, dTargets.protein, 'var(--hot-pink)', 'Protein', 'g')}
        ${renderProgressBar(dTotals.cal, dTargets.cal, 'var(--amber)', 'Calories', ' kcal')}
        ${renderProgressBar(dTotals.c, dTargets.carbs, 'var(--royal)', 'Carbs', 'g')}
        ${renderProgressBar(dTotals.f, dTargets.fats, 'var(--vermilion)', 'Fats', 'g')}
        ${renderProgressBar(data.water || 0, dTargets.water, 'var(--light-blue)', 'Hydration', 'ml')}
      </div>

      <div class="glass card-sm p-24">
        <div class="text-xs text-muted mb-16 uppercase font-bold tracking-widest">Workout Session</div>
        ${workoutHTML}
      </div>
      <div class="glass card-sm p-24">
        <div class="text-xs text-muted mb-16 uppercase font-bold tracking-widest">Meal History</div>
        <div class="flex-col">${mealsHTML}</div>
      </div>
    </div>
  `;
  document.getElementById('day-report-modal').style.display = 'flex';
}

function closeDayReport() { document.getElementById('day-report-modal').style.display = 'none'; }
