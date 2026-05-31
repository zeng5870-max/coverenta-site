const body = document.body;
const menuButton = document.querySelector(".menu-button");
const mobileMenu = document.querySelector(".mobile-menu");
const revealItems = document.querySelectorAll(".reveal");
const demoForm = document.querySelector(".demo-form");
const formStatus = document.querySelector(".form-status");

body.classList.add("js-enabled");

if (menuButton && mobileMenu) {
  menuButton.addEventListener("click", () => {
    const isOpen = body.classList.toggle("menu-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      body.classList.remove("menu-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open menu");
    });
  });
}

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -10% 0px"
    }
  );

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index % 5, 4) * 65}ms`;
    revealObserver.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add("in-view"));
}

if (demoForm && formStatus) {
  demoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const button = demoForm.querySelector("button");
    button.disabled = true;
    button.textContent = "Request sent";
    formStatus.textContent = "Thanks. Our strategy team will contact you shortly.";

    window.setTimeout(() => {
      demoForm.reset();
      button.disabled = false;
      button.textContent = "Request demo";
    }, 2400);
  });
}

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuButton && body.classList.contains("menu-open")) {
    body.classList.remove("menu-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open menu");
  }
});
