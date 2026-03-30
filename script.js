const MODAL_ID = "bookingModal";
const FORM_ID = "bookingForm";

// Укажите email мастера, на который будет отправляться заявка через mailto.
const BOOKING_EMAIL = "master@example.com";

function openModal(modalEl) {
  modalEl.classList.add("is-open");
  modalEl.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal(modalEl) {
  modalEl.classList.remove("is-open");
  modalEl.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function initModal() {
  const modalEl = document.getElementById(MODAL_ID);
  const formEl = document.getElementById(FORM_ID);
  if (!modalEl || !formEl) return;

  const openButtons = document.querySelectorAll("[data-open-booking]");
  const closeButtons = document.querySelectorAll("[data-close-booking]");

  openButtons.forEach((btn) => {
    btn.addEventListener("click", () => openModal(modalEl));
  });

  closeButtons.forEach((btn) => {
    btn.addEventListener("click", () => closeModal(modalEl));
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalEl.classList.contains("is-open")) closeModal(modalEl);
  });

  formEl.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(formEl);
    const name = formData.get("name");
    const phone = formData.get("phone");
    const service = formData.get("service");
    const message = formData.get("message");

    const subject = `Заявка на маникюр: ${service || ""}`.trim();
    const bodyLines = [
      `Имя: ${name || ""}`,
      `Телефон: ${phone || ""}`,
      `Услуга: ${service || ""}`,
      `Комментарий: ${message || ""}`,
    ];
    const body = bodyLines.join("\n");

    // Открываем почтовый клиент. Если почтовик не настроен — пользователь увидит стандартную ошибку/предложение.
    window.location.href = `mailto:${BOOKING_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    closeModal(modalEl);
  });
}

function initYear() {
  const el = document.getElementById("year");
  if (!el) return;
  el.textContent = String(new Date().getFullYear());
}

function initMobileMenu() {
  const burger = document.querySelector(".burger");
  const nav = document.getElementById("site-nav");
  if (!burger || !nav) return;

  burger.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", String(isOpen));
  });

  document.addEventListener("click", (e) => {
    if (!nav.classList.contains("is-open")) return;
    const target = e.target;
    if (!(target instanceof Element)) return;
    const clickedInside = nav.contains(target) || burger.contains(target);
    if (!clickedInside) {
      nav.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
    }
  });

  nav.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      nav.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
    });
  });

  // Закрываем меню, если пользователь нажимает “Записаться” из навигации.
  nav.querySelectorAll("[data-open-booking]").forEach((btn) => {
    btn.addEventListener("click", () => {
      nav.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
    });
  });
}

function initPortfolioFilter() {
  const chips = document.querySelectorAll("[data-filter]");
  const cards = document.querySelectorAll(".work-card");
  if (!chips.length || !cards.length) return;

  function setActiveChip(activeChip) {
    chips.forEach((c) => c.classList.toggle("chip--active", c === activeChip));
  }

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const filter = chip.getAttribute("data-filter") || "all";
      setActiveChip(chip);

      cards.forEach((card) => {
        const tags = (card.getAttribute("data-tags") || "").split(/\s+/).filter(Boolean);
        const visible = filter === "all" || tags.includes(filter);
        card.style.display = visible ? "" : "none";
      });
    });
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href") || "";
      if (href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

initYear();
initModal();
initMobileMenu();
initPortfolioFilter();
initSmoothScroll();

