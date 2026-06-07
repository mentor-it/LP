(function () {
  "use strict";

  /* ---- Header shadow on scroll ---- */
  const header = document.getElementById("siteHeader");
  const onScroll = () => {
    header.classList.toggle("scrolled", window.scrollY > 8);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Mobile nav toggle ---- */
  const navToggle = document.getElementById("navToggle");
  const actions = document.querySelector(".header-actions");
  if (navToggle && actions) {
    navToggle.addEventListener("click", () => {
      const open = actions.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(open));
    });
  }

  /* ---- Scroll reveal ---- */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("in"));
  }

  /* ---- Mentors slider ---- */
  const track = document.getElementById("mentorsTrack");
  const prev = document.getElementById("prevMentor");
  const next = document.getElementById("nextMentor");
  if (track && prev && next) {
    let index = 0;

    const perView = () => {
      const w = window.innerWidth;
      if (w <= 680) return 1;
      if (w <= 980) return 2;
      return 3;
    };

    const update = () => {
      const cards = track.children;
      const total = cards.length;
      const pv = perView();
      const maxIndex = Math.max(0, total - pv);
      if (index > maxIndex) index = maxIndex;

      const card = cards[0];
      const gap = parseFloat(getComputedStyle(track).gap) || 24;
      const step = card.getBoundingClientRect().width + gap;
      track.style.transform = `translateX(${-index * step}px)`;

      prev.disabled = index <= 0;
      next.disabled = index >= maxIndex;
    };

    prev.addEventListener("click", () => {
      index = Math.max(0, index - 1);
      update();
    });
    next.addEventListener("click", () => {
      index += 1;
      update();
    });

    let rt;
    window.addEventListener("resize", () => {
      clearTimeout(rt);
      rt = setTimeout(update, 150);
    });
    update();
  }

  /* ---- Modal: Zapisz się ---- */
  const modal = document.getElementById("signupModal");
  const modalOpenBtn = document.getElementById("ctaSignupBtn");
  const modalCloseBtn = document.getElementById("modalClose");
  if (modal && modalOpenBtn) {
    const openModal = () => {
      modal.removeAttribute("hidden");
      document.body.style.overflow = "hidden";
      modalCloseBtn && modalCloseBtn.focus();
    };
    const closeModal = () => {
      modal.setAttribute("hidden", "");
      document.body.style.overflow = "";
      modalOpenBtn.focus();
    };
    modalOpenBtn.addEventListener("click", (e) => { e.preventDefault(); openModal(); });
    modalCloseBtn && modalCloseBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !modal.hasAttribute("hidden")) closeModal(); });
  }

  /* ---- FAQ: accordion (one open at a time) ---- */
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (item.open) {
        faqItems.forEach((other) => {
          if (other !== item) other.open = false;
        });
      }
    });
  });

})();
