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
// Wrap to ensure DOM is ready if script is placed in head
document.addEventListener("DOMContentLoaded", () => {
  const progressEls = document.querySelectorAll(".progress");

  if (!progressEls.length) return; // nothing to do

  // Ensure each .progress has a data-progress attribute (0-100)
  progressEls.forEach((p) => {
    const parent = p.closest(".progress-bar");
    if (!parent) return;

    // create percent label if missing
    if (!parent.querySelector(".progress-percent")) {
      const percent = document.createElement("span");
      percent.className = "progress-percent";
      percent.textContent = "0%";
      parent.appendChild(percent);
    }

    // ensure initial width is 0 (in case inline css present)
    p.style.width = "0%";
    p.setAttribute("aria-valuemin", "0");
    p.setAttribute("aria-valuemax", "100");
    const targetVal = parseInt(p.getAttribute("data-progress"), 10);
    p.setAttribute("aria-valuenow", isNaN(targetVal) ? "0" : String(targetVal));
  });

  // animate a single bar
  function animateBar(progressEl) {
    const target = Math.max(
      0,
      Math.min(100, parseInt(progressEl.dataset.progress, 10) || 0)
    );
    const container = progressEl.closest(".progress-bar");
    const label = container.querySelector(".progress-percent");

    // set CSS width (this triggers the CSS transition)
    // small timeout to ensure layout is ready
    requestAnimationFrame(() => {
      progressEl.style.width = target + "%";
    });

    // animate the numeric counter inside the label
    const duration = 1200; // ms for number counter
    const start = performance.now();
    const startVal = 0;

    function step(now) {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / duration);
      const eased = t; // linear for the number; CSS handles visual fill easing
      const current = Math.round(startVal + (target - startVal) * eased);
      label.textContent = current + "%";

      if (t < 1) {
        requestAnimationFrame(step);
      } else {
        label.textContent = target + "%";
        // if the fill is more than ~50%, invert text color for readability
        if (target >= 50) container.classList.add("text-inverse");
      }
    }
    requestAnimationFrame(step);
  }

  // Use IntersectionObserver when available
  if ("IntersectionObserver" in window) {
    const ioOptions = { threshold: 0.2, rootMargin: "0px 0px -80px 0px" };
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateBar(entry.target);
          obs.unobserve(entry.target); // run once per bar
        }
      });
    }, ioOptions);

    progressEls.forEach((el) => observer.observe(el));
  } else {
    // Fallback: animate all right away
    progressEls.forEach(animateBar);
  }
});
const toggleBtn = document.querySelector("#toggle-theme");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});
