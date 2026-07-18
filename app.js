document.addEventListener('DOMContentLoaded', () => {
  const yearNodes = document.querySelectorAll('#year');
  yearNodes.forEach((node) => {
    node.textContent = new Date().getFullYear();
  });

  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }

  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      alert('Thank you for contacting Hebron Christian School. We will respond shortly.');
      form.reset();
    });
  }
});
