// Forgot Password Module - Handles multi-step password recovery
// Demo mode: Generates random codes for email verification

document.addEventListener('DOMContentLoaded', () => {
  const forgotForm = document.getElementById('forgot-form');
  const verifyForm = document.getElementById('verify-form');
  const resetForm = document.getElementById('reset-form');

  let recoveryState = {
    email: '',
    verificationCode: '',
    isCodeValid: false
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

  const showSuccessMessage = (message) => {
    const alert = document.createElement('div');
    alert.style.cssText = `
      background: var(--success);
      color: white;
      padding: 1rem;
      border-radius: 0.8rem;
      margin-bottom: 1rem;
      animation: slideDown 0.3s ease;
    `;
    alert.textContent = message;
    document.querySelector('.auth-card').insertBefore(alert, document.querySelector('.auth-card').firstChild);
    setTimeout(() => alert.remove(), 3000);
  };

  const showStep = (stepNumber) => {
    // Hide all steps
    document.querySelectorAll('.forgot-step').forEach(step => {
      step.classList.add('hidden');
    });
    // Show the requested step
    const stepElement = document.getElementById(`step-${stepNumber}`);
    if (stepElement) {
      stepElement.classList.remove('hidden');
    }
  };

  // ===== GENERATE VERIFICATION CODE (DEMO MODE) =====
  const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // ===== STEP 1: EMAIL VERIFICATION =====
  if (forgotForm) {
    forgotForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const emailInput = document.getElementById('forgot-email');
      const email = emailInput.value.trim();

      if (!validateEmail(email)) {
        showError(emailInput, 'Please enter a valid email address');
        return;
      }

      clearError(emailInput);

      // Save email and generate code
      recoveryState.email = email;
      recoveryState.verificationCode = generateVerificationCode();

      // Demo mode: Show code in console and to user (for testing)
      console.log(`%cDemo Mode - Verification Code: ${recoveryState.verificationCode}`, 'font-size: 14px; color: green; font-weight: bold;');

      showSuccessMessage(`Verification code sent to ${email}`);
      
      // In production, you would send this code via email
      // For now, show it in a user-friendly way for testing
      setTimeout(() => {
        showStep(2);
      }, 1000);
    });
  }

  // ===== STEP 2: CODE VERIFICATION =====
  if (verifyForm) {
    verifyForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const codeInput = document.getElementById('verify-code');
      const code = codeInput.value.trim();

      if (code.length !== 6) {
        showError(codeInput, 'Code must be 6 digits');
        return;
      }

      if (code !== recoveryState.verificationCode) {
        showError(codeInput, 'Invalid verification code. Try again.');
        return;
      }

      clearError(codeInput);
      recoveryState.isCodeValid = true;

      showSuccessMessage('Code verified successfully!');
      
      setTimeout(() => {
        showStep(3);
      }, 1000);
    });
  }

  // ===== STEP 3: RESET PASSWORD =====
  if (resetForm) {
    resetForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const newPasswordInput = document.getElementById('new-password');
      const confirmPasswordInput = document.getElementById('confirm-new-password');
      const newPassword = newPasswordInput.value;
      const confirmPassword = confirmPasswordInput.value;

      let hasErrors = false;

      // Validate new password
      if (!validatePassword(newPassword)) {
        showError(newPasswordInput, 'Password must be at least 6 characters');
        hasErrors = true;
      } else {
        clearError(newPasswordInput);
      }

      // Validate password match
      if (newPassword !== confirmPassword) {
        showError(confirmPasswordInput, 'Passwords do not match');
        hasErrors = true;
      } else {
        clearError(confirmPasswordInput);
      }

      if (hasErrors) return;

      // In production, you would update the password in the database
      // For now, just proceed to success
      showStep(4);

      // Store recovery info for reference
      localStorage.setItem('hebron-password-reset-email', recoveryState.email);
      localStorage.setItem('hebron-password-reset-time', new Date().toISOString());
    });
  }

  // Initialize password toggle
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

  setupPasswordToggle();

  // Add CSS for animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .error-message {
      animation: slideDown 0.2s ease;
    }
  `;
  document.head.appendChild(style);

  // Log recovery code to console for demo purposes
  console.log('%cHebron Christian School - Password Recovery (Demo Mode)', 'font-size: 16px; font-weight: bold; color: #1e3a8a;');
  console.log('%cWhen you enter an email, a 6-digit verification code will be generated and displayed here.', 'font-size: 12px; color: #64748b;');
});
