// Typing animation for the home section
document.addEventListener("DOMContentLoaded", function () {
  // Typing animation
  const typingElement = document.getElementById("highlight");
  const texts = ["Full Stack Developer", "Web Designer", "Software Engineer"];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentText = texts[textIndex];

    if (isDeleting) {
      // Deleting text
      typingElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      // Typing text
      typingElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    // Check if current text is fully typed
    if (!isDeleting && charIndex === currentText.length) {
      // Pause at the end
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      // Move to next text
      isDeleting = false;
      textIndex++;
      if (textIndex === texts.length) {
        textIndex = 0;
      }
      typingSpeed = 500;
    }

    setTimeout(type, typingSpeed);
  }

  // Start typing animation
  setTimeout(type, 1000);

  // Progress bar animation
  const progressBars = document.querySelectorAll(".progress");
  progressBars.forEach((bar) => {
    const progress = bar.getAttribute("data-progress");
    bar.style.width = progress + "%";
  });

  // Hamburger menu functionality
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("show");
  });

  // Close menu when clicking on a link
  const navLinksItems = document.querySelectorAll(".nav-links a");
  navLinksItems.forEach((link) => {
    link.addEventListener("click", function () {
      navLinks.classList.remove("show");
    });
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Night Mode Toggle
  const nightToggle = document.getElementById("night-mode-toggle");
  nightToggle.addEventListener("click", () => {
    document.body.classList.toggle("night-mode");
    nightToggle.classList.toggle("active");
    // Change icon
    const icon = nightToggle.querySelector("i");
    if (document.body.classList.contains("night-mode")) {
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
    } else {
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
    }
  });
});
