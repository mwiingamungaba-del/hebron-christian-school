document.addEventListener('DOMContentLoaded', () => {
  const quizForm = document.getElementById('quiz-form');
  if (quizForm) {
    quizForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const result = document.getElementById('quiz-result');
      if (result) {
        result.classList.remove('hidden');
        result.innerHTML = '<strong>Quiz submitted.</strong> Your response has been recorded for review.';
      }
    });
  }
});
