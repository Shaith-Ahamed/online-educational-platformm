document.addEventListener('DOMContentLoaded', async () => {
    const profileDetails = document.querySelector('.profile-details ul');

    try {
       
        const response = await fetch('/get-profile');
        const data = await response.json();

        if (response.ok) {
        
            profileDetails.innerHTML = `
                <li><strong>Name:</strong> ${data.username}</li>
                <li><strong>Email:</strong> ${data.email}</li>
                
                <li><strong>Enrolled Courses:</strong> ${data.enrolledCourses.length}</li>
            `;

            
            if (data.enrolledCourses.length > 0) {
                profileDetails.innerHTML += `<li><strong>Courses:</strong> ${data.enrolledCourses.join(", ")}</li>`;
            }
        } else {
            alert("Failed to load profile. Please log in.");
        
        }
    } catch (error) {
        console.error("❌ Error fetching profile:", error);
        alert("An error occurred while loading the profile.");
    }
});
