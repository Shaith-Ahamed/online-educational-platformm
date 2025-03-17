document.addEventListener('DOMContentLoaded', async () => {
    const enrolledCourses = document.getElementById('enrolled-courses');
    const courseCards = document.querySelectorAll('.course-card1, .course-card2, .course-card3, .course-card4, .course-card5, .course-card6');

    const dialogOverlay = document.getElementById('dialog-overlay');
    const dialogMessage = document.getElementById('dialog-message');
    const confirmButton = document.getElementById('dialog-confirm');
    const cancelButton = document.getElementById('dialog-cancel');

    let selectedCourse = '';

    // Function to Load Previously Enrolled Courses
    async function loadEnrolledCourses() {
        try {
            const response = await fetch('/get-enrolled-courses');
            const data = await response.json();

            if (response.ok) {
                enrolledCourses.innerHTML = ''; // Clear existing list

                data.enrolledCourses.forEach(courseName => {
                    addEnrolledCourseToUI(courseName); //Add course to UI
                });
            } else {
                console.log(`Error loading courses: ${data.message}`);
            }
        } catch (error) {
            console.error('Error fetching enrolled courses:', error);
        }
    }

    // ✅ 2️⃣ Function to Add Enrolled Course to UI
    function addEnrolledCourseToUI(courseName) {
        const courseCard = document.createElement('div');
        courseCard.className = 'enrolled-course-card';
        courseCard.setAttribute('data-course', courseName);
        courseCard.innerHTML = `
            <h4>${courseName}</h4>
            <p>Course content and resources will appear here soon.</p>
            <button class="unenroll-btn">Unenroll</button>
        `;

        enrolledCourses.appendChild(courseCard);

        // ✅ Handle Unenrollment
        courseCard.querySelector('.unenroll-btn').addEventListener('click', async () => {
            try {
                const unenrollResponse = await fetch('/unenroll', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ courseName }),
                });

                if (unenrollResponse.ok) {
                    courseCard.remove();
                    if (enrolledCourses.children.length === 0) {
                        enrolledCourses.innerHTML = '<p>No courses enrolled yet.</p>';
                    }
                }
            } catch (error) {
                console.error('Error during unenrollment:', error);
            }
        });
    }

    // ✅ 3️⃣ Load Previously Enrolled Courses on Page Load
    await loadEnrolledCourses();

    // ✅ 4️⃣ Handle New Course Enrollment
    courseCards.forEach(card => {
        card.addEventListener('click', () => {
            selectedCourse = card.getAttribute('data-course');
            dialogMessage.textContent = `Do you want to enroll in "${selectedCourse}"?`;
            dialogOverlay.classList.add('show');
        });
    });

    if (confirmButton) {
        confirmButton.addEventListener('click', async () => {
            try {
                const response = await fetch('/enroll', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ courseName: selectedCourse }),
                });

                const data = await response.json();
                if (response.ok) {
                    console.log(`✅ Successfully enrolled in "${selectedCourse}".`);

                    // ✅ Add newly enrolled course to UI
                    addEnrolledCourseToUI(selectedCourse);
                } else {
                    console.log(`❌ Enrollment failed: ${data.message}`);
                }
            } catch (error) {
                console.error('❌ Error during enrollment:', error);
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

            image: "iamge5.jpg", 
            heading: "Shape the Future with Technology", 
            content: "Stay ahead in the digital era. Learn cutting-edge skills and innovate with confidence." 
             
        },
        { 
            image: "iamge4.webp", 
            heading: "Empower Your Future", 
            content: "Gain industry-ready skills and take the next step in your career. Start learning today."


            
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