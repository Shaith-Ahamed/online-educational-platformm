const { JSDOM } = require('jsdom');

// Mock the DOM
const dom = new JSDOM(`
    <!DOCTYPE html>
    <html>
        <body>
            <div id="enrolled-courses">
                <p>No courses enrolled yet.</p>
            </div>
            <div class="course-card1" data-course="Course 1">Course 1</div>
            <div class="course-card2" data-course="Course 2">Course 2</div>
            <div id="dialog-overlay">
                <div id="dialog-message"></div>
                <button id="dialog-confirm">Confirm</button>
                <button id="dialog-cancel">Cancel</button>
            </div>
            <div class="welcome">
                <h1 id="dynamic-heading">Welcome</h1>
                <p id="dynamic-content">Start learning today.</p>
            </div>
        </body>
    </html>
`);

const { document } = dom.window;

// Your existing code
document.addEventListener('DOMContentLoaded', () => {
    // COURSE ENROLLMENT FUNCTIONALITY
    const enrolledCourses = document.getElementById('enrolled-courses');
    const courseCards = document.querySelectorAll('.course-card1, .course-card2');

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

    if (confirmButton) {
        confirmButton.addEventListener('click', async () => {
            const existingCourse = Array.from(enrolledCourses.children).find(
                (child) => child.getAttribute('data-course') === selectedCourse
            );

            if (!existingCourse) {
                try {
                    const response = await fetch('/enroll', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ course: selectedCourse }),
                    });

                    const data = await response.json();
                    if (response.ok) {
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
                        unenrollButton.addEventListener('click', async () => {
                            try {
                                const response = await fetch('/unenroll', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({ course: selectedCourse }),
                                });

                                if (response.ok) {
                                    courseCard.remove();
                                    if (enrolledCourses.children.length === 0) {
                                        enrolledCourses.innerHTML = '<p>No courses enrolled yet.</p>';
                                    }
                                }
                            } catch (error) {
                                console.error('Error during unenrollment:', error);
                            }
                        });

                        console.log(`You have successfully enrolled in "${selectedCourse}".`);
                    } else {
                        console.log(data.message || 'Enrollment failed. Please try again.');
                    }
                } catch (error) {
                    console.error('Error during enrollment:', error);
                    console.log('An error occurred. Please try again.');
                }
            } else {
                console.log(`You are already enrolled in "${selectedCourse}".`);
            }

            dialogOverlay.classList.remove('show');
        });
    }

    if (cancelButton) {
        cancelButton.addEventListener('click', () => {
            dialogOverlay.classList.remove('show');
        });
    }

    if (dialogOverlay) {
        dialogOverlay.addEventListener('click', (event) => {
            if (event.target === dialogOverlay) {
                dialogOverlay.classList.remove('show');
            }
        });
    }

    // DYNAMIC WELCOME SECTION
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
        welcomeDiv.style.opacity = 0;
        headingElement.style.opacity = 0;
        contentElement.style.opacity = 0;

        setTimeout(() => {
            welcomeDiv.style.backgroundImage = `url(${data[index].image})`;
            headingElement.innerText = data[index].heading;
            contentElement.innerText = data[index].content;

            welcomeDiv.style.opacity = 1;
            headingElement.style.opacity = 1;
            contentElement.style.opacity = 1;

            index = (index + 1) % data.length;
        }, 1000);
    }

    setInterval(changeContent, 8000);
});

// Trigger DOMContentLoaded event
dom.window.document.dispatchEvent(new dom.window.Event('DOMContentLoaded'));