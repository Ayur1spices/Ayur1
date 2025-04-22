document.addEventListener('DOMContentLoaded', () => {
    const icons = document.querySelectorAll('.spice-icon');
    icons.forEach(icon => {
      const randomLeft = Math.random() * window.innerWidth;
      const fallDuration = 5 + Math.random() * 5; // Duration between 5s and 10s
      const floatDuration = 3 + Math.random() * 3; // Duration between 3s and 6s
  
      icon.style.left = `${randomLeft}px`;
      icon.style.animationDuration = `${fallDuration}s, ${floatDuration}s`;
      icon.style.opacity = 1;
    });
  });
  