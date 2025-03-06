

document.addEventListener('DOMContentLoaded', () => {
    // LOGIN FUNCTIONALITY
    const signInButton = document.querySelector('.form-panel.sign-in button.sign-in');
    if (signInButton) {
        signInButton.addEventListener('click', (event) => {
            event.preventDefault(); 

           
            const username = document.getElementById('username')?.value;
            const password = document.getElementById('password')?.value;

            if (username === 's' && password === 'p') {
                window.location.href = './dashboard.html';
            } else {
                alert('Invalid username or password.');
            }
        });
    }


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


    const signUpFormButton = document.querySelector('.form-panel.sign-up button.sign-up');
    if (signUpFormButton) {
        signUpFormButton.addEventListener('click', (event) => {
            event.preventDefault(); 
            event.stopPropagation();  
        });
    }




    const enrolledCourses = document.getElementById('enrolled-courses');
    const courseCards = document.querySelectorAll('.course-card1, .course-card2, .course-card3, .course-card4, .course-card5, .course-card6');

    const dialogOverlay = document.getElementById('dialog-overlay');
    const dialogMessage = document.getElementById('dialog-message');
    const confirmButton = document.getElementById('dialog-confirm');
    const cancelButton = document.getElementById('dialog-cancel');

    let selectedCourse = '';

    courseCards.forEach(card => {
        card.addEventListener('click', () => {
            selectedCourse = card.getAttribute('data-course');
            dialogMessage.textContent = `Do you want to enroll in "${selectedCourse}"?`;
            dialogOverlay.classList.add('show');
        });
    });

    confirmButton.addEventListener('click', () => {
        const existingCourse = Array.from(enrolledCourses.children).find(
            (child) => child.getAttribute('data-course') === selectedCourse
        );

        if (!existingCourse) {
            if (enrolledCourses.children[0]?.tagName === 'P') {
                enrolledCourses.innerHTML = '';
            }

            const courseCard = document.createElement('div');
            courseCard.className = 'enrolled-course-card';
            courseCard.setAttribute('data-course', selectedCourse);
            courseCard.innerHTML = `
                <h4>${selectedCourse}</h4>
                <p>Course content and resources will appear here soon.</p>
                <button class="unenroll-btn">Unenroll</button>
            `;

            enrolledCourses.appendChild(courseCard);

            const unenrollButton = courseCard.querySelector('.unenroll-btn');
            unenrollButton.addEventListener('click', () => {
                courseCard.remove();
                if (enrolledCourses.children.length === 0) {
                    enrolledCourses.innerHTML = '<p>No courses enrolled yet.</p>';
                }
            });

            alert(`You have successfully enrolled in "${selectedCourse}".`);
        } else {
            alert(`You are already enrolled in "${selectedCourse}".`);
        }

        dialogOverlay.classList.remove('show');
    });

    cancelButton.addEventListener('click', () => {
        dialogOverlay.classList.remove('show');
    });

    dialogOverlay.addEventListener('click', (event) => {
        if (event.target === dialogOverlay) {
            dialogOverlay.classList.remove('show');
        }
    });
});




// Welcome image and text transformation
const data = [
    { 
        image: "iamge4.webp", 
        heading: "Empower Your Future", 
        content: "Gain industry-ready skills and take the next step in your career. Start learning today." 
    },
    { 
        image: "iamge5.jpg", 
        heading: "Shape the Future with Technology", 
        content: "Stay ahead in the digital era. Learn cutting-edge skills and innovate with confidence." 
    }
];

let index = 0;
const welcomeDiv = document.querySelector(".welcome");
const headingElement = document.getElementById("dynamic-heading");
const contentElement = document.getElementById("dynamic-content");

function changeContent() {
    // Start fade-out
    welcomeDiv.style.opacity = 0;
    headingElement.style.opacity = 0;
    contentElement.style.opacity = 0;

    // Wait for fade-out animation to complete (1s)
    setTimeout(() => {
        // Change background image
        welcomeDiv.style.backgroundImage = `url(${data[index].image})`;

        // Change text content
        headingElement.innerText = data[index].heading;
        contentElement.innerText = data[index].content;

        // Start fade-in
        welcomeDiv.style.opacity = 1;
        headingElement.style.opacity = 1;
        contentElement.style.opacity = 1;

        // Move to the next content in the list
        index = (index + 1) % data.length;
    }, 1000); // Matches the transition duration in CSS
}

// Change content every 5 seconds
setInterval(changeContent, 8000);
