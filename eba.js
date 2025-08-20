document.addEventListener("DOMContentLoaded", () => {
  const progressBars = document.querySelectorAll(".progress");

  const options = {
    threshold: 0.3, // Trigger when 30% visible
  };

  const fillBar = (entry) => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const value = bar.getAttribute("data-progress");
      bar.style.width = value + "%";
      observer.unobserve(bar); // Animate only once
    }
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(fillBar);
  }, options);

  progressBars.forEach((bar) => {
    observer.observe(bar);
  });
});
const highlightText = "Web Developer";
let charIndex = 0;

function typeHighlight() {
  const element = document.getElementById("highlight");
  if (charIndex < highlightText.length) {
    element.textContent += highlightText.charAt(charIndex);
    charIndex++;
    setTimeout(typeHighlight, 150); // typing speed
  }
}

// Start typing after page loads
window.onload = typeHighlight;
