export function drawProgressRing(circleId, percentage) {
    const circle = document.getElementById(circleId);
    if (!circle) return;
    
    // The radius is 140, circumference is 2 * PI * 140 ~= 880
    const circumference = 2 * Math.PI * 140;
    const offset = circumference - (percentage / 100) * circumference;
    
    circle.style.strokeDashoffset = offset;
    
    // Update the label if it exists
    const label = document.getElementById('ring-perc-label');
    if (label) {
        label.innerText = percentage >= 100 ? 'TARGET ACHIEVED' : 'GOAL PROGRESS';
    }
}
