/* =========================================================
   NANO WEB DESIGN
   app.js
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelectorAll(".main-nav a");
  const year = document.querySelector("#current-year");

  /* =========================
     MENÚ MOBILE
  ========================= */

  if (header && menuToggle) {
    menuToggle.addEventListener("click", () => {
      const isOpen = header.classList.toggle("nav-open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      document.body.classList.toggle("menu-open", isOpen);
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        header.classList.remove("nav-open");
        menuToggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
      });
    });
  }

  /* =========================
     AÑO AUTOMÁTICO
  ========================= */

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  /* =========================
     CERRAR MENÚ CON ESC
  ========================= */

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || !header?.classList.contains("nav-open")) {
      return;
    }

    header.classList.remove("nav-open");
    menuToggle?.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  });

  /* =========================
     ANIMACIÓN HERO
  ========================= */

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!reduceMotion) {
    const modules = document.querySelectorAll(".hero-visual .module");
    const lines = document.querySelectorAll(".hero-visual .module-line");
    const labels = document.querySelectorAll(".hero-visual .module-label");

    modules.forEach((module, index) => {
      module.animate(
        [
          {
            opacity: 0,
            transform: "translateY(18px) scale(0.96)",
          },
          {
            opacity: 1,
            transform: "translateY(0) scale(1)",
          },
        ],
        {
          duration: 550,
          delay: 120 + index * 90,
          easing: "ease-out",
          fill: "both",
        },
      );
    });

    lines.forEach((line, index) => {
      line.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 400,
        delay: 450 + index * 100,
        easing: "ease-out",
        fill: "both",
      });
    });

    labels.forEach((label, index) => {
      label.animate(
        [
          {
            opacity: 0,
            transform: "translateY(6px)",
          },
          {
            opacity: 1,
            transform: "translateY(0)",
          },
        ],
        {
          duration: 350,
          delay: 650 + index * 120,
          easing: "ease-out",
          fill: "both",
        },
      );
    });
  }
});
