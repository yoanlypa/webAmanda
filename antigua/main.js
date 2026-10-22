const menuToggle = document.getElementById("mobile-menu-toggle");
const mobileOverlay = document.querySelector("[data-mobile-overlay]");
const mobilePanel = document.querySelector("[data-mobile-panel]");
const iconOpen = document.querySelector("[data-menu-icon='open']");
const iconClose = document.querySelector("[data-menu-icon='close']");

const setMenuState = (isOpen) => {
  if (!menuToggle || !mobileOverlay || !mobilePanel) {
    return;
  }

  mobileOverlay.classList.toggle("opacity-0", !isOpen);
  mobileOverlay.classList.toggle("pointer-events-none", !isOpen);
  mobilePanel.classList.toggle("translate-x-full", !isOpen);
  mobilePanel.classList.toggle("opacity-0", !isOpen);
  mobilePanel.classList.toggle("pointer-events-none", !isOpen);
  mobilePanel.setAttribute("aria-hidden", String(!isOpen));
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  document.body.classList.toggle("overflow-hidden", isOpen);
  iconOpen?.classList.toggle("hidden", isOpen);
  iconClose?.classList.toggle("hidden", !isOpen);
};

if (menuToggle) {
  setMenuState(false);
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    setMenuState(!isOpen);
  });
}

if (mobileOverlay) {
  mobileOverlay.addEventListener("click", () => setMenuState(false));
}

if (mobilePanel) {
  mobilePanel.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof HTMLAnchorElement) {
      setMenuState(false);
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenuState(false);
  }
});

const filterButtons = document.querySelectorAll(".service-filter");
const serviceCards = document.querySelectorAll(".service-card");

const applyServiceFilter = (filter) => {
  serviceCards.forEach((card) => {
    const categories = card.dataset.category?.split(" ") ?? [];
    const shouldShow = filter === "todos" || categories.includes(filter);
    card.classList.toggle("hidden", !shouldShow);
  });

  filterButtons.forEach((button) => {
    const isCurrent = button.dataset.filter === filter;
    button.classList.toggle("is-active", isCurrent);
    button.setAttribute("aria-selected", String(isCurrent));
  });
};

if (filterButtons.length > 0 && serviceCards.length > 0) {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter ?? "todos";
      applyServiceFilter(filter);
    });
  });

  applyServiceFilter("todos");
}
