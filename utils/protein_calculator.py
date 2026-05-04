def calculate_protein(weight, goal, intensity, muscle_group):
    """
    Formula: weight * adjusted_multiplier
    """
    base_multipliers = {
        "Muscle Gain": 2.0,
        "Fat Loss": 2.2,
        "Maintain": 1.8
    }
    
    intensity_mods = {
        "Light": 0.9,
        "Moderate": 1.0,
        "Heavy": 1.1
    }
    
    muscle_bonus = 0
    if muscle_group == "Legs":
        muscle_bonus = 0.15
    elif muscle_group == "Back":
        muscle_bonus = 0.10
    
    base = base_multipliers.get(goal, 1.8)
    mod = intensity_mods.get(intensity, 1.0)
    
    adjusted_multiplier = (base * mod) + muscle_bonus
    
    ideal_target = round(weight * adjusted_multiplier, 1)
    min_target = round(ideal_target * 0.8, 1)
    recovery_target = round(ideal_target * 1.1, 1)
    
    return {
        "min": min_target,
        "ideal": ideal_target,
        "recovery": recovery_target
    }
