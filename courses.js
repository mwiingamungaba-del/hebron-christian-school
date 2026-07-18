document.addEventListener('DOMContentLoaded', () => {
  const chips = document.querySelectorAll('.filter-chip');
  const cards = document.querySelectorAll('.course-card');

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((item) => item.classList.remove('active'));
      chip.classList.add('active');

      const filter = chip.dataset.filter;
      cards.forEach((card) => {
        if (filter === 'all' || card.dataset.level === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
});
