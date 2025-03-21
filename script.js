// const { JSDOM } = require('jsdom');  //this is a mock browser to the node.js libarary 

// const dom = new JSDOM(`
//     <!DOCTYPE html>
//     <html>
//         <body>
//             <div class="form-panel sign-in">
//                 <button class="sign-in">Sign In</button>
//             </div>
//             <!-- Add other HTML elements here -->
//         </body>
//     </html>
// `);

// const { document } = dom.window;

// // Your existing code
// document.addEventListener('DOMContentLoaded', () => {
//     const signInButton = document.querySelector('.form-panel.sign-in button.sign-in');
//     if (signInButton) {
//         signInButton.addEventListener('click', async (event) => {
//             console.log('Sign In button clicked');
//         });
//     }
// });

// // Trigger DOMContentLoaded event
// dom.window.document.dispatchEvent(new dom.window.Event('DOMContentLoaded'));

//     // TOGGLE BETWEEN SIGN-IN AND SIGN-UP FORMS
//     const toggleBtn = document.querySelector('.toggle-btn');
//     const leftPanel = document.querySelector('.left-panel');
//     const rightPanel = document.querySelector('.right-panel');
//     const signInForm = document.querySelector('.form-panel.sign-in');
//     const signUpForm = document.querySelector('.form-panel.sign-up');

//     if (toggleBtn) {
//         toggleBtn.addEventListener('click', () => {
//             leftPanel.classList.toggle('slide-right');
//             rightPanel.classList.toggle('slide-left');
//             signInForm.classList.toggle('active');
//             signUpForm.classList.toggle('active');

//             if (toggleBtn.textContent === 'Sign Up') {
//                 toggleBtn.textContent = 'Sign In';
//                 leftPanel.querySelector('.left-heading').textContent = 'Welcome to the Page';
//                 leftPanel.querySelector('.left-text').textContent = 'Already have an account?';
//             } else {
//                 toggleBtn.textContent = 'Sign Up';
//                 leftPanel.querySelector('.left-heading').textContent = 'Welcome to Online Education';
//                 leftPanel.querySelector('.left-text').textContent = "Don't have an account?";
//             }
//         });
//     }

//     // SIGN-UP FORM SUBMISSION (SERVER-SIDE HANDLING)
//     const signUpFormButton = document.querySelector('.form-panel.sign-up button.sign-up');
//     if (signUpFormButton) {
//         signUpFormButton.addEventListener('click', async (event) => {
//             const username = document.getElementById('signup-username')?.value;
//             const password = document.getElementById('signup-password')?.value;

//             try {
//                 const response = await fetch('/signup', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({ username, password }),
//                 });

//                 const data = await response.json();
//                 if (response.ok) {
//                     alert('Sign-up successful! Please log in.');
//                     toggleBtn.click(); // Switch to the sign-in form
//                 } else {
//                     alert(data.message || 'Sign-up failed. Please try again.');
//                 }
//             } catch (error) {
//                 console.error('Error during sign-up:', error);
//                 alert('An error occurred. Please try again.');
//             }
//         });
//     }

//     // COURSE ENROLLMENT FUNCTIONALITY
//     const enrolledCourses = document.getElementById('enrolled-courses');
//     const courseCards = document.querySelectorAll('.course-card1, .course-card2, .course-card3, .course-card4, .course-card5, .course-card6');

//     const dialogOverlay = document.getElementById('dialog-overlay');
//     const dialogMessage = document.getElementById('dialog-message');
//     const confirmButton = document.getElementById('dialog-confirm');
//     const cancelButton = document.getElementById('dialog-cancel');

//     let selectedCourse = '';

//     courseCards.forEach(card => {
//         card.addEventListener('click', () => {
//             selectedCourse = card.getAttribute('data-course');
//             dialogMessage.textContent = `Do you want to enroll in "${selectedCourse}"?`;
//             dialogOverlay.classList.add('show');
//         });
//     });

//     confirmButton.addEventListener('click', async () => {
//         const existingCourse = Array.from(enrolledCourses.children).find(
//             (child) => child.getAttribute('data-course') === selectedCourse
//         );

//         if (!existingCourse) {
//             try {
//                 const response = await fetch('/enroll', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({ course: selectedCourse }),
//                 });

//                 const data = await response.json();
//                 if (response.ok) {
//                     if (enrolledCourses.children[0]?.tagName === 'P') {
//                         enrolledCourses.innerHTML = '';
//                     }

//                     const courseCard = document.createElement('div');
//                     courseCard.className = 'enrolled-course-card';
//                     courseCard.setAttribute('data-course', selectedCourse);
//                     courseCard.innerHTML = `
//                         <h4>${selectedCourse}</h4>
//                         <p>Course content and resources will appear here soon.</p>
//                         <button class="unenroll-btn">Unenroll</button>
//                     `;

//                     enrolledCourses.appendChild(courseCard);

//                     const unenrollButton = courseCard.querySelector('.unenroll-btn');
//                     unenrollButton.addEventListener('click', async () => {
//                         try {
//                             const response = await fetch('/unenroll', {
//                                 method: 'POST',
//                                 headers: {
//                                     'Content-Type': 'application/json',
//                                 },
//                                 body: JSON.stringify({ course: selectedCourse }),
//                             });

//                             if (response.ok) {
//                                 courseCard.remove();
//                                 if (enrolledCourses.children.length === 0) {
//                                     enrolledCourses.innerHTML = '<p>No courses enrolled yet.</p>';
//                                 }
//                             }
//                         } catch (error) {
//                             console.error('Error during unenrollment:', error);
//                         }
//                     });

//                     alert(`You have successfully enrolled in "${selectedCourse}".`);
//                 } else {
//                     alert(data.message || 'Enrollment failed. Please try again.');
//                 }
//             } catch (error) {
//                 console.error('Error during enrollment:', error);
//                 alert('An error occurred. Please try again.');
//             }
//         } else {
//             alert(`You are already enrolled in "${selectedCourse}".`);
//         }

//         dialogOverlay.classList.remove('show');
//     });

//     cancelButton.addEventListener('click', () => {
//         dialogOverlay.classList.remove('show');
//     });

//     dialogOverlay.addEventListener('click', (event) => {
//         if (event.target === dialogOverlay) {
//             dialogOverlay.classList.remove('show');
//         }
//     });


// // DYNAMIC WELCOME SECTION
// const data = [
//     { 
//         image: "iamge4.webp", 
//         heading: "Empower Your Future", 
//         content: "Gain industry-ready skills and take the next step in your career. Start learning today." 
//     },
//     { 
//         image: "iamge5.jpg", 
//         heading: "Shape the Future with Technology", 
//         content: "Stay ahead in the digital era. Learn cutting-edge skills and innovate with confidence." 
//     }
// ];

// let index = 0;
// const welcomeDiv = document.querySelector(".welcome");
// const headingElement = document.getElementById("dynamic-heading");
// const contentElement = document.getElementById("dynamic-content");

// function changeContent() {
//     welcomeDiv.style.opacity = 0;
//     headingElement.style.opacity = 0;
//     contentElement.style.opacity = 0;

//     setTimeout(() => {
//         welcomeDiv.style.backgroundImage = `url(${data[index].image})`;
//         headingElement.innerText = data[index].heading;
//         contentElement.innerText = data[index].content;

//         welcomeDiv.style.opacity = 1;
//         headingElement.style.opacity = 1;
//         contentElement.style.opacity = 1;

//         index = (index + 1) % data.length;
//     }, 1000);
// }

// setInterval(changeContent, 8000);




//server.js





// const express = require("express");
// const sqlite3 = require("sqlite3").verbose();
// const path = require("path");

// const app = express();

// const db = new sqlite3.Database('C:\\Users\\shait\\OneDrive\\Desktop\\user_data_base\\user_data.db');


// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());


// app.use(express.static(path.join(__dirname, "Online-Education-Platform")));

// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "Online-Education-Platform", "login.html"));
// });



// app.post("/dashboard", (req, res) => {
//     const { username, password } = req.body;

   
//     db.get("SELECT * FROM users WHERE username = ? AND password = ?", [username, password], (err, row) => {
//         if (err || !row) {
//             return res.status(400).send("Invalid credentials");
//         }
//         res.sendFile(path.join(__dirname, "Online-Education-Platform", "dashboard.html"));
//     });
// });




// // Handle registration form submission (POST request)
// app.post("/", (req, res) => {
//     const { username, email, password } = req.body;
//     console.log("Received Data:", req.body); // This is for checking the form data
    
//     if (!username || !email || !password) {
//         return res.status(400).send("All fields are required");
//     }

    

//     const stmt = db.prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
//     stmt.run(username, email, password, function (err) {
//         if (err) {
//             console.error("Database Error:", err.message);
//             return res.status(500).send("Error inserting user into database");
//         }
//         res.redirect("/");
//     });
//     stmt.finalize();
// });




// //COURSE ENTROLLEMENT 

// app.post('/enroll', async (req, res) => {
//     const { userId, courseName } = req.body;

//     try {
//         // Fetch the user's current enrolled courses
//         const query = 'SELECT enrolled_courses FROM users WHERE id = ?';
//         const [results] = await db.query(query, [userId]);

//         let enrolledCourses = results[0].enrolled_courses || '';

//         // Append the new course
//         if (enrolledCourses) {
//             enrolledCourses += `,${courseName}`;
//         } else {
//             enrolledCourses = courseName;
//         }

//         // Update the user's enrolled courses
//         const updateQuery = 'UPDATE users SET enrolled_courses = ? WHERE id = ?';
//         await db.query(updateQuery, [enrolledCourses, userId]);

//         res.status(200).json({ message: 'Enrollment successful' });
//     } catch (error) {
//         console.error('Error during enrollment:', error);
//         res.status(500).json({ message: 'An error occurred. Please try again.' });
//     }
// });





// Start the server
// app.listen(3005, () => {
//     console.log("Server is running on http://localhost:3005");
// });
