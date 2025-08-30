// Simple intersection observer to reveal elements on scroll
(() => {
  const els = document.querySelectorAll(".reveal");
  const onShow = (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  };
  const io = new IntersectionObserver(onShow, { root: null, threshold: 0.15 });
  els.forEach((el) => io.observe(el));
})();
