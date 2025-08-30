// Simple fade-in on scroll effect
document.addEventListener("scroll", () => {
  const cards = document.querySelectorAll(".fade-in");
  cards.forEach((card) => {
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      card.classList.add("visible");
    }
  });
});
