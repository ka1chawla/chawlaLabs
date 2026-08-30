(() => {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  const header = document.querySelector(".site-header");
  const onScroll = () => {
    const scrolled = window.scrollY > 48;
    if (header) header.classList.toggle("is-solid", scrolled);
    document.body.classList.toggle("is-scrolled", scrolled);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const revealNodes = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );
    revealNodes.forEach((node) => observer.observe(node));
  } else {
    revealNodes.forEach((node) => node.classList.add("is-visible"));
  }

  // Hero content should appear immediately on load
  document
    .querySelectorAll(".hero [data-reveal], .site-header[data-reveal]")
    .forEach((node) => node.classList.add("is-visible"));

  const form = document.querySelector(".contact-form");
  const status = document.querySelector(".form-status");

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !email || !message) {
      showStatus("Please fill in every field.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showStatus("Please enter a valid email address.");
      return;
    }

    form.reset();
    showStatus("Thanks — we’ll be in touch soon.");
  });

  function showStatus(text) {
    if (!status) return;
    status.hidden = false;
    status.classList.add("is-visible");
    status.textContent = text;
  }
})();
