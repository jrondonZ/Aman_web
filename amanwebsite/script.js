/* =====================================================================
   Aman — marketing site behavior
   Vanilla JS, no dependencies. Loaded with `defer`.
   - mobile nav toggle
   - sticky-nav shadow + scroll progress bar
   - reveal-on-scroll (IntersectionObserver)
   - animated stat count-up
   - card cursor-follow spotlight
   - smooth anchor scrolling that closes the mobile menu
   - current year + live mock clock
   All motion respects prefers-reduced-motion.
   ===================================================================== */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------- Mobile nav toggle ---------------------- */
  var nav = document.getElementById("nav");
  var toggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");

  function closeMenu() {
    if (!nav) return;
    nav.classList.remove("is-open");
    if (toggle) {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
    }
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    // Close on Escape for keyboard users
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }

  /* -------- Smooth scroll for in-page anchors + menu close -------- */
  // Native CSS smooth-scroll handles motion; here we just close the
  // mobile menu and keep focus sensible for same-page links.
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var id = link.getAttribute("href");
      if (!id || id === "#") return; // placeholder app links
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      closeMenu();
      target.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start"
      });
      // update the hash without an extra jump
      history.replaceState(null, "", id);
    });
  });

  /* ---------- Sticky-nav style + scroll progress bar ------------- */
  var progress = document.getElementById("scrollProgress");

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;

    if (nav) nav.classList.toggle("is-stuck", y > 8);

    if (progress) {
      var docH = document.documentElement.scrollHeight - window.innerHeight;
      var pct = docH > 0 ? (y / docH) * 100 : 0;
      progress.style.width = pct + "%";
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ----------------- Reveal-on-scroll (sections) ----------------- */
  var reveals = document.querySelectorAll(".reveal");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    // Show everything immediately, no animation.
    reveals.forEach(function (el) { el.classList.add("is-revealed"); });
  } else {
    var revealObserver = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach(function (el) { revealObserver.observe(el); });

    // Stagger the feature cards a touch via a CSS custom prop.
    document.querySelectorAll("#featureCards .reveal").forEach(function (el, i) {
      el.style.setProperty("--i", i);
    });
  }

  /* -------------------- Animated stat count-up ------------------- */
  var counters = document.querySelectorAll("[data-count]");

  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var suffix = el.getAttribute("data-suffix") || "";
    if (isNaN(target)) return;

    var duration = 1400;
    var start = null;

    function frame(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      // easeOutCubic for a confident settle
      var eased = 1 - Math.pow(1 - p, 3);
      var value = Math.round(eased * target);
      el.textContent = value + suffix;
      if (p < 1) requestAnimationFrame(frame);
      else el.textContent = target + suffix; // exact final value
    }
    requestAnimationFrame(frame);
  }

  if (reduceMotion || !("IntersectionObserver" in window)) {
    // Leave the static HTML values as-is.
  } else if (counters.length) {
    var countObserver = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach(function (el) { countObserver.observe(el); });
  }

  /* ---------------- Card cursor-follow spotlight ----------------- */
  // Skip on touch / reduced-motion — hover spotlight is a desktop nicety.
  if (!reduceMotion && window.matchMedia("(hover: hover)").matches) {
    document.querySelectorAll(".spotlight").forEach(function (card) {
      card.addEventListener("pointermove", function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty("--mx", (e.clientX - r.left) + "px");
        card.style.setProperty("--my", (e.clientY - r.top) + "px");
      });
    });
  }

  /* ----------------------- Footer year --------------------------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------------- Live clock in the map mock ------------------- */
  // Purely decorative: shows a real ticking time in the product mock.
  var clockEl = document.querySelector("[data-clock]");
  if (clockEl) {
    var fmt = new Intl.DateTimeFormat([], { hour: "numeric", minute: "2-digit" });
    function tick() { clockEl.textContent = fmt.format(new Date()); }
    tick();
    if (!reduceMotion) setInterval(tick, 30000);
  }
})();
