// Authentication Module - Handles login, registration, and session management
// Demo mode: Any password works with demo emails

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');

  // ===== PASSWORD VISIBILITY TOGGLE =====
  const setupPasswordToggle = () => {
    const toggleButtons = document.querySelectorAll('.toggle-password');
    toggleButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = button.getAttribute('data-target');
        const input = document.getElementById(targetId);
        
        if (input) {
          const isPassword = input.type === 'password';
          input.type = isPassword ? 'text' : 'password';
          button.setAttribute('aria-pressed', !isPassword);
          button.title = isPassword ? 'Hide password' : 'Show password';
        }
      });
    });
  };

  // ===== VALIDATION HELPERS =====
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const showError = (element, message) => {
    element.style.borderColor = 'var(--error)';
    let errorDiv = element.nextElementSibling;
    if (!errorDiv || !errorDiv.classList.contains('error-message')) {
      errorDiv = document.createElement('small');
      errorDiv.className = 'error-message';
      errorDiv.style.color = 'var(--error)';
      errorDiv.style.display = 'block';
      errorDiv.style.marginTop = '0.25rem';
      element.parentNode.insertBefore(errorDiv, element.nextSibling);
    }
    errorDiv.textContent = message;
  };

  const clearError = (element) => {
    element.style.borderColor = '';
    const errorDiv = element.nextElementSibling;
    if (errorDiv && errorDiv.classList.contains('error-message')) {
      errorDiv.remove();
    }
  };

  // ===== ACADEMIC ACCESS ASSIGNMENT =====
  const assignAcademicAccess = (email, role, academicLevel = null) => {
    const isStudent = role === 'student';
    const isTeacher = role === 'teacher';
    const isAdmin = role === 'admin';

    // Determine academic level based on email or selection
    let level = academicLevel || 'primary';
    if (email.includes('form')) {
      level = 'secondary';
    }

    // Set session data
    localStorage.setItem('hebron-role', role);
    localStorage.setItem('hebron-email', email);
    localStorage.setItem('hebron-academic-level', level === 'secondary' ? 'Secondary School' : 'Primary School');

    // Grade/Form assignment
    let gradeForm = 'Grade 5';
    if (level === 'secondary') {
      gradeForm = email.includes('form1') ? 'Form 1' : 
                  email.includes('form2') ? 'Form 2' : 
                  email.includes('form3') ? 'Form 3' : 
                  email.includes('form4') ? 'Form 4' : 'Form 2';
    } else {
      gradeForm = email.includes('grade1') ? 'Grade 1' :
                  email.includes('grade2') ? 'Grade 2' :
                  email.includes('grade3') ? 'Grade 3' :
                  email.includes('grade4') ? 'Grade 4' :
                  email.includes('grade5') ? 'Grade 5' :
                  email.includes('grade6') ? 'Grade 6' :
                  email.includes('grade7') ? 'Grade 7' : 'Grade 5';
    }
    localStorage.setItem('hebron-grade-form', gradeForm);

    // Subject assignment based on role
    let subjects = [];
    if (isStudent) {
      if (level === 'secondary') {
        subjects = ['Mathematics', 'English Language', 'Biology', 'Chemistry', 'Physics', 'Geography'];
      } else {
        subjects = ['Mathematics', 'English Language', 'Integrated Science', 'Social Studies', 'ICT'];
      }
    } else if (isTeacher) {
      subjects = ['English Language', 'Biology', 'Civic Education'];
    }
    localStorage.setItem('hebron-assigned-subjects', JSON.stringify(subjects));
    localStorage.setItem('hebron-login-time', new Date().toISOString());
  };

  // ===== LOGIN FORM HANDLER =====
  if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const emailInput = document.getElementById('login-email');
      const passwordInput = document.getElementById('login-password');
      const email = emailInput.value.trim();
      const password = passwordInput.value;

      let hasErrors = false;

      // Validate email
      if (!validateEmail(email)) {
        showError(emailInput, 'Please enter a valid email address');
        hasErrors = true;
      } else {
        clearError(emailInput);
      }

      // Validate password
      if (!validatePassword(password)) {
        showError(passwordInput, 'Password must be at least 6 characters');
        hasErrors = true;
      } else {
        clearError(passwordInput);
      }

      if (hasErrors) return;

      // Determine role based on email (demo mode)
      let role = 'student';
      if (email.includes('teacher')) {
        role = 'teacher';
      } else if (email.includes('admin')) {
        role = 'admin';
      }

      // Assign academic access and redirect
      assignAcademicAccess(email, role);
      
      // Redirect to role-specific dashboard
      window.location.href = `${role}/dashboard.html`;
    });
  }

  // ===== REGISTER FORM HANDLER =====
  if (registerForm) {
    registerForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const nameInput = document.getElementById('register-name');
      const emailInput = document.getElementById('register-email');
      const passwordInput = document.getElementById('register-password');
      const roleSelect = document.getElementById('register-role');
      const academicLevelSelect = document.getElementById('academic-level');
      const termsCheckbox = document.getElementById('terms');

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const password = passwordInput.value;
      const role = roleSelect.value;
      const academicLevel = academicLevelSelect.value;
      const termsAccepted = termsCheckbox.checked;

      let hasErrors = false;

      // Validate name
      if (name.length < 2) {
        showError(nameInput, 'Name must be at least 2 characters');
        hasErrors = true;
      } else {
        clearError(nameInput);
      }

      // Validate email
      if (!validateEmail(email)) {
        showError(emailInput, 'Please enter a valid email address');
        hasErrors = true;
      } else {
        clearError(emailInput);
      }

      // Validate password
      if (!validatePassword(password)) {
        showError(passwordInput, 'Password must be at least 6 characters');
        hasErrors = true;
      } else {
        clearError(passwordInput);
      }

      // Validate role selection
      if (!role) {
        showError(roleSelect, 'Please select a role');
        hasErrors = true;
      } else {
        clearError(roleSelect);
      }

      // Validate academic level
      if (!academicLevel) {
        showError(academicLevelSelect, 'Please select an academic level');
        hasErrors = true;
      } else {
        clearError(academicLevelSelect);
      }

      // Validate terms acceptance
      if (!termsAccepted) {
        const errorDiv = document.createElement('small');
        errorDiv.className = 'error-message';
        errorDiv.style.color = 'var(--error)';
        errorDiv.style.display = 'block';
        errorDiv.textContent = 'You must accept the Terms of Service';
        termsCheckbox.parentNode.appendChild(errorDiv);
        hasErrors = true;
      }

      if (hasErrors) return;

      // Assign academic access and redirect
      assignAcademicAccess(email, role, academicLevel);
      
      // Show success message
      alert(`Welcome, ${name}! Your account has been created. Redirecting to dashboard...`);
      
      // Redirect to role-specific dashboard
      window.location.href = `${role}/dashboard.html`;
    });
  }

  // Initialize password toggle on page load
  setupPasswordToggle();

  // ===== LOGOUT HANDLER =====
  const logoutLinks = document.querySelectorAll('[data-logout]');
  logoutLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.clear();
      window.location.href = '../login.html';
    });
  });
});
