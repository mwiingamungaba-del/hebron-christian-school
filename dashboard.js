document.addEventListener('DOMContentLoaded', () => {
  const role = localStorage.getItem('hebron-role') || 'student';
  const roleLabel = document.querySelector('[data-role]');
  if (roleLabel) {
    roleLabel.textContent = role.charAt(0).toUpperCase() + role.slice(1);
  }

  const academicLevel = localStorage.getItem('hebron-academic-level') || 'Primary School';
  const gradeOrForm = localStorage.getItem('hebron-grade-form') || 'Grade 5';
  const assignedSubjects = JSON.parse(localStorage.getItem('hebron-assigned-subjects') || '[]');

  const studentLevel = document.getElementById('student-level');
  const studentClass = document.getElementById('student-class');
  const studentSubjects = document.getElementById('student-subjects');
  const teacherSubjects = document.getElementById('teacher-subjects');

  const curriculum = {
    'Grade 1': ['Mathematics', 'English Language', 'Phonics', 'Handwriting', 'Integrated Science', 'Environmental Science', 'Social Studies', 'CTS', 'Religious Education', 'Expressive Arts', 'Physical Education'],
    'Grade 2': ['Mathematics', 'English Language', 'Phonics', 'Handwriting', 'Integrated Science', 'Environmental Science', 'Social Studies', 'CTS', 'Religious Education', 'Expressive Arts', 'Physical Education'],
    'Grade 3': ['Mathematics', 'English Language', 'Phonics', 'Handwriting', 'Integrated Science', 'Environmental Science', 'Social Studies', 'CTS', 'Religious Education', 'Expressive Arts', 'Physical Education'],
    'Grade 4': ['Mathematics', 'English Language', 'Integrated Science', 'Environmental Science', 'Social Studies', 'CTS', 'Religious Education', 'ICT / Computer Studies', 'Expressive Arts', 'Physical Education'],
    'Grade 5': ['Mathematics', 'English Language', 'Integrated Science', 'Environmental Science', 'Social Studies', 'CTS', 'Religious Education', 'ICT / Computer Studies', 'Expressive Arts', 'Physical Education'],
    'Grade 6': ['Mathematics', 'English Language', 'Integrated Science', 'Environmental Science', 'Social Studies', 'CTS', 'Religious Education', 'ICT / Computer Studies', 'Expressive Arts', 'Physical Education'],
    'Grade 7': ['Mathematics', 'English Language', 'Integrated Science', 'Social Studies', 'CTS', 'Religious Education', 'ICT / Computer Studies', 'Expressive Arts', 'Physical Education'],
    'Form 1': ['Mathematics', 'English Language', 'Biology', 'Chemistry', 'Physics', 'Geography', 'History', 'Civic Education', 'Commerce', 'Computer Studies / ICT', 'Religious Education', 'Agriculture', 'Business Studies', 'Physical Education'],
    'Form 2': ['Mathematics', 'English Language', 'Biology', 'Chemistry', 'Physics', 'Geography', 'History', 'Civic Education', 'Commerce', 'Computer Studies / ICT', 'Religious Education', 'Agriculture', 'Business Studies', 'Physical Education'],
    'Form 3': ['Mathematics', 'English Language', 'Biology', 'Chemistry', 'Physics', 'Geography', 'History', 'Civic Education', 'Commerce', 'Accounts', 'Computer Studies / ICT', 'Religious Education', 'Agriculture', 'Business Studies', 'Physical Education'],
    'Form 4': ['Mathematics', 'English Language', 'Biology', 'Chemistry', 'Physics', 'Geography', 'History', 'Civic Education', 'Commerce', 'Accounts', 'Computer Studies / ICT', 'Religious Education', 'Agriculture', 'Business Studies', 'Physical Education']
  };

  if (studentLevel) { studentLevel.textContent = academicLevel; }
  if (studentClass) { studentClass.textContent = gradeOrForm; }
  if (studentSubjects) {
    const subjects = curriculum[gradeOrForm] || ['No subjects assigned yet'];
    studentSubjects.innerHTML = subjects.map((subject) => `<li>${subject}</li>`).join('');
  }
  if (teacherSubjects) {
    const subjects = assignedSubjects.length ? assignedSubjects : ['No assigned subjects yet'];
    teacherSubjects.innerHTML = subjects.map((subject) => `<li>${subject}</li>`).join('');
  }

  const logoutLink = document.querySelector('[data-logout]');
  if (logoutLink) {
    logoutLink.addEventListener('click', (event) => {
      event.preventDefault();
      localStorage.removeItem('hebron-role');
      localStorage.removeItem('hebron-academic-level');
      localStorage.removeItem('hebron-grade-form');
      localStorage.removeItem('hebron-assigned-subjects');
      window.location.href = '../login.html';
    });
  }
});
