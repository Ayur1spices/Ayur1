// Hero background image rotation
const bg = document.querySelector('.hero-bg');
const images = [
  'asset/image/cuminseed.png',
  'asset/image/cuminseed2.png',
  'asset/image/cuminseed3.png'
];

let current = 0;

function changeBackground() {
  bg.style.transition = 'opacity 0.5s ease'; // Ensure smooth transition
  bg.style.opacity = 0;

  setTimeout(() => {
    bg.style.backgroundImage = `url('${images[current]}')`;
    bg.style.opacity = 1;
    current = (current + 1) % images.length;
  }, 500); // Matches transition duration
}

setInterval(changeBackground, 5000);
window.addEventListener('load', changeBackground); // Use addEventListener for better practice

// Timeline animation observer
const timelineObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        timelineObserver.unobserve(entry.target); // Stop observing once shown
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll('.timeline-item').forEach((item) => {
  timelineObserver.observe(item);
});

// Scroll-fade animation observer
const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible');
      }
    });
  },
  { threshold: 0.3 }
);

document.querySelectorAll('.scroll-fade').forEach((section) => {
  fadeObserver.observe(section);
});
