// document.addEventListener('DOMContentLoaded', () => {
//     const icons = document.querySelectorAll('.spice-icon');
//     icons.forEach(icon => {
//       const randomLeft = Math.random() * window.innerWidth;
//       const fallDuration = 5 + Math.random() * 5; // Duration between 5s and 10s
//       const floatDuration = 3 + Math.random() * 3; // Duration between 3s and 6s
  
//       icon.style.left = `${randomLeft}px`;
//       icon.style.animationDuration = `${fallDuration}s, ${floatDuration}s`;
//       icon.style.opacity = 1;
//     });
//   });

document.addEventListener('DOMContentLoaded', function () {
  // Apply saved theme on load
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.remove('light-mode');
    document.body.classList.add('dark-mode');
    // Set the correct icon on page load
    document.getElementById("themeIcon").src = "https://cdn-icons-png.flaticon.com/512/869/869869.png"; // Sun icon for Dark Mode
  } else {
    // Set the correct icon for light mode
    document.getElementById("themeIcon").src = "https://cdn-icons-png.flaticon.com/512/747/747376.png"; // Moon icon for Light Mode
  }

  // Toggle button click function
  function toggleDarkMode() {
    console.log('clicked');

    // Toggle dark and light mode classes on body
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');

    // Save preference to localStorage
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');

    // Change icon based on theme
    const icon = document.getElementById("themeIcon");
    icon.src = isDark 
      ? "https://cdn-icons-png.flaticon.com/512/869/869869.png" // Sun icon for Light Mode
      : "https://cdn-icons-png.flaticon.com/512/747/747376.png"; // Moon icon for Dark Mode
  }

  // Make the function globally accessible for HTML onclick
  window.toggleDarkMode = toggleDarkMode;
});

  
  