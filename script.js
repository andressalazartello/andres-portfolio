/* =====================================================
   PREMIUM INTERACTIONS
   Andres Salazar Portfolio
   Scroll reveal + 3D tilt + magnetic buttons + cursor glow
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initCursorGlow();
  initScrollReveal();
  initTiltCards();
  initMagneticButtons();
});


/* =========================
   1. CURSOR GLOW
========================= */

function initCursorGlow() {
  const glow = document.createElement("div");
  glow.classList.add("cursor-glow");
  document.body.appendChild(glow);

  let mouseX = 0;
  let mouseY = 0;
  let glowX = 0;
  let glowY = 0;

  window.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
  });

  function animateGlow() {
    glowX += (mouseX - glowX) * 0.12;
    glowY += (mouseY - glowY) * 0.12;

    glow.style.transform = `translate(${glowX}px, ${glowY}px) translate(-50%, -50%)`;

    requestAnimationFrame(animateGlow);
  }

  animateGlow();
}


/* =========================
   2. SCROLL REVEAL
========================= */

function initScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -60px 0px",
    }
  );

  revealElements.forEach((element) => {
    observer.observe(element);
  });
}


/* =========================
   3. 3D TILT CARDS
========================= */

function initTiltCards() {
  const cards = document.querySelectorAll(".tilt-card");

  cards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)";
    });
  });
}


/* =========================
   4. MAGNETIC BUTTONS
========================= */

function initMagneticButtons() {
  const buttons = document.querySelectorAll(".magnetic-btn");

  buttons.forEach((button) => {
    button.addEventListener("mousemove", (event) => {
      const rect = button.getBoundingClientRect();

      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;

      button.style.transform = `translate(${x * 0.15}px, ${y * 0.25}px)`;
    });

    button.addEventListener("mouseleave", () => {
      button.style.transform = "translate(0px, 0px)";
    });
  });
}

