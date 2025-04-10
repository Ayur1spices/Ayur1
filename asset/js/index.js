function fadeAndMoveIcons() {
    const icons = document.querySelectorAll('.spice-icon');

    icons.forEach((icon, index) => {
        // STEP 1: Fade In at Current Position
        icon.style.opacity = 1;

        // STEP 2: After 10s, Fade Out
        setTimeout(() => {
            icon.style.opacity = 0;
        }, 10000 + index * 500); // staggered delay if needed

        // STEP 3: After fade out (~12s), Change Position
        setTimeout(() => {
            const top = Math.random() * 90;
            const left = Math.random() * 90;
            icon.style.top = `${top}%`;
            icon.style.left = `${left}%`;
        }, 12000 + index * 500);

        // STEP 4: Fade In again at new position
        setTimeout(() => {
            icon.style.opacity = 1;
        }, 13000 + index * 500);
    });
}

// Start loop every 15s
setInterval(fadeAndMoveIcons, 15000);
setTimeout(fadeAndMoveIcons, 1000); // Initial start
