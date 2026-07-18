document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');

  const assignAcademicAccess = (email, role) => {
    if (role === 'student') {
      const gradeOrForm = email.includes('form') ? 'Form 2' : 'Grade 5';
      localStorage.setItem('hebron-academic-level', gradeOrForm.includes('Form') ? 'Secondary School' : 'Primary School');
      localStorage.setItem('hebron-grade-form', gradeOrForm);
      localStorage.setItem('hebron-assigned-subjects', JSON.stringify([]));
    } else if (role === 'teacher') {
      localStorage.setItem('hebron-academic-level', 'Secondary School');
      localStorage.setItem('hebron-grade-form', 'Form 2');
      localStorage.setItem('hebron-assigned-subjects', JSON.stringify(['English Language', 'Biology', 'Civic Education']));
    } else {
      localStorage.setItem('hebron-academic-level', 'Admin');
      localStorage.setItem('hebron-grade-form', 'All Grades and Forms');
      localStorage.setItem('hebron-assigned-subjects', JSON.stringify([]));
    }
  };

  if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const email = loginForm.querySelector('input[name="email"]').value;
      const role = email.includes('teacher') ? 'teacher' : email.includes('admin') ? 'admin' : 'student';
      localStorage.setItem('hebron-role', role);
      assignAcademicAccess(email, role);
      window.location.href = `${role}/dashboard.html`;
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const role = registerForm.querySelector('select[name="role"]').value;
      const email = registerForm.querySelector('input[name="email"]').value;
      localStorage.setItem('hebron-role', role);
      assignAcademicAccess(email, role);
      window.location.href = `${role}/dashboard.html`;
    });
  }
});
