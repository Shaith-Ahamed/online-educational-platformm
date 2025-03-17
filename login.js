document.addEventListener('DOMContentLoaded', () => {
    // LOGIN FUNCTIONALITY
    const signInButton = document.querySelector('.form-panel.sign-in button.sign-in');
    if (signInButton) {
        signInButton.addEventListener('click', async (event) => {

            const username = document.getElementById('username')?.value;
            const password = document.getElementById('password')?.value;



            try {
                const response = await fetch('/dashboard', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password }),
                });
    
                const data = await response.json();
                console.log("Server Response:", data); 
                if (response.ok) {
                    localStorage.setItem('UserId', data.userId); 
                    console.log("Retrieved userId:", data.userId);
                    window.location.href = './dashboard.html'; 
                } else {
                    alert(data.message || 'Invalid username or password.'); 
                }
            }
             catch (error) {
                console.error('❌ Error during login:', error);
             
            }

       
        });




    }


    // TOGGLE BETWEEN SIGN-IN AND SIGN-UP FORMS
    const toggleBtn = document.querySelector('.toggle-btn');
    const leftPanel = document.querySelector('.left-panel');
    const rightPanel = document.querySelector('.right-panel');
    const signInForm = document.querySelector('.form-panel.sign-in');
    const signUpForm = document.querySelector('.form-panel.sign-up');

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            leftPanel.classList.toggle('slide-right');
            rightPanel.classList.toggle('slide-left');
            signInForm.classList.toggle('active');
            signUpForm.classList.toggle('active');

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
    }


    // SIGN-UP FORM SUBMISSION
    const signUpFormButton = document.querySelector('.form-panel.sign-up button.sign-up');
    if (signUpFormButton) {
        signUpFormButton.addEventListener('click', async (event) => {
            const username = document.getElementById('signup-username')?.value;
            const password = document.getElementById('signup-password')?.value;

            try {
                const response = await fetch('/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password }),
                });

                const data = await response.json();
                if (response.ok) {
                    alert('Sign-up successful! Please log in.');
                    toggleBtn.click(); // Switch to the sign-in form
                } else {
                    alert(data.message || 'Sign-up failed. Please try again.');
                }
            } catch (error) {
                console.error('Error during sign-up:', error);
                alert('An error occurred. Please try again.');
            }
        });
    }
});