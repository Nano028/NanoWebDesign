/* =========================================================
   NANO WEB DESIGN
   app.js
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".main-nav");
  const navLinks = document.querySelectorAll(".main-nav a");
  const year = document.querySelector("#current-year");

  /* =========================
     MENÚ MOBILE
  ========================= */

  if (header && menuToggle && navigation) {
    const mobile = window.matchMedia("(max-width: 820px)");
    const pageContent = document.querySelectorAll("main, .site-footer");

    const setMenu = (open, returnFocus = false) => {
      const isOpen = mobile.matches && open;
      header.classList.toggle("nav-open", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
      document.body.classList.toggle("menu-open", isOpen);
      navigation.inert = mobile.matches && !isOpen;
      pageContent.forEach((element) => { element.inert = isOpen; });

      if (returnFocus) menuToggle.focus();
    };

    header.classList.add("nav-ready");
    setMenu(false);

    menuToggle.addEventListener("click", () => {
      setMenu(!header.classList.contains("nav-open"));
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => setMenu(false));
    });

    mobile.addEventListener("change", () => setMenu(false));

    document.addEventListener("keydown", (event) => {
      if (!header.classList.contains("nav-open")) return;

      if (event.key === "Escape") {
        setMenu(false, true);
      } else if (event.key === "Tab") {
        const first = header.querySelector(".brand");
        const last = navigation.querySelector("a:last-child");

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });
  }

  /* =========================
     AÑO AUTOMÁTICO
  ========================= */

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  /* =========================
     CONSULTA POR WHATSAPP
  ========================= */

  const form = document.querySelector("#contact-form");
  const draft = document.querySelector("#contact-draft");
  const preview = document.querySelector("#draft-preview");
  const whatsappLink = document.querySelector("#draft-whatsapp");

  if (form && draft && preview && whatsappLink) {
    const nameField = form.elements.namedItem("name");
    const messageField = form.elements.namedItem("message");

    form.addEventListener("input", (event) => {
      event.target.setCustomValidity("");
      draft.hidden = true;
      whatsappLink.removeAttribute("href");
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      nameField.setCustomValidity(nameField.value.trim() ? "" : "Ingresá tu nombre.");
      messageField.setCustomValidity(messageField.value.trim() ? "" : "Contanos sobre tu proyecto.");
      if (!form.reportValidity()) return;

      const data = new FormData(form);
      const date = data.get("date");
      const email = data.get("email").trim();
      const message = [
        "Hola Nano, quisiera consultar por un proyecto web.",
        "",
        `Nombre: ${data.get("name").trim()}`,
        ...(email ? [`Email: ${email}`] : []),
        `Fecha deseada: ${date ? date.split("-").reverse().join("/") : "A coordinar"}`,
        "",
        data.get("message").trim(),
      ].join("\n");

      preview.textContent = message;
      whatsappLink.href = `https://wa.me/${form.dataset.whatsapp}?text=${encodeURIComponent(message)}`;
      draft.hidden = false;
      draft.focus();
    });

    form.hidden = false;
  }

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
