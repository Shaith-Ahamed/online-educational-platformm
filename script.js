// Select necessary elements
const toggleBtn = document.querySelector('.toggle-btn'); // Toggle button in the left panel
const leftPanel = document.querySelector('.left-panel');
const rightPanel = document.querySelector('.right-panel');
const signInForm = document.querySelector('.form-panel.sign-in');
const signUpForm = document.querySelector('.form-panel.sign-up');

// Toggle functionality (for the toggle button only)
toggleBtn.addEventListener('click', () => {
    // Toggle classes for sliding effect
    leftPanel.classList.toggle('slide-right');
    rightPanel.classList.toggle('slide-left');

    // Toggle form visibility
    signInForm.classList.toggle('active');
    signUpForm.classList.toggle('active');

    // Update toggle button text and panel content
    if (toggleBtn.textContent === 'Sign Up') {
        toggleBtn.textContent = 'Sign In';
        leftPanel.querySelector('.left-heading').textContent = 'Welcome to the Page';
        leftPanel.querySelector('.left-text').textContent = 'Already have an account?';
    } else {
        toggleBtn.textContent = 'Sign Up';
        leftPanel.querySelector('.left-heading').textContent = 'Welcome to Online Education';
        leftPanel.querySelector('.left-text').textContent = "Don't have an account?";
    }
});

// Redirect to dashboard on successful login
const signInButton = document.querySelector('.form-panel.sign-in button.sign-in');
signInButton.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent form submission for now

    // Example: Replace this with actual authentication logic
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 's' && password === 'p') {
        // Redirect to the student dashboard
        window.location.href = './stdnt_dashbd.html';
    } else {
        alert('Invalid username or password.');
    }
});

// Prevent toggling when clicking the "Sign Up" button inside the form
const signUpFormButton = document.querySelector('.form-panel.sign-up button.sign-up');
signUpFormButton.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent form submission if necessary
    event.stopPropagation(); // Stop the event from propagating to parent elements
});
