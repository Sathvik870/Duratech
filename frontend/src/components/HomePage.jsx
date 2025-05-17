// frontend/src/components/HomePage.jsx
import React from 'react';

function HomePage() {
    const userName = localStorage.getItem('userName') || "User"; // Fallback
    return (
        <div className="home-container"> {/* Use the new class */}
            <h2>Welcome to the LMS Dashboard, {userName}!</h2>
            <p>You have successfully logged in. This is your personalized space where you can access courses, track progress, and manage your learning.</p>
            <p>Explore the platform and start your learning journey!</p>
        </div>
    );
}

export default HomePage;