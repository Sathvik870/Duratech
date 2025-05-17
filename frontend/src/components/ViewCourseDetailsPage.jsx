// frontend/src/components/ViewCourseDetailsPage.jsx
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { courses as mockCourses } from '../mockData';
import '../index.css'; // For detailed page styles

function ViewCourseDetailsPage() {
    const { courseId } = useParams();
    const navigate = useNavigate();
    // In a real app, fetch course by ID from API
    const course = mockCourses.find(c => c.id === courseId);

    if (!course) {
        return (
            <div className="page-container text-center">
                <h2>Course Not Found</h2>
                <p>Sorry, the course you are looking for does not exist.</p>
                <Link to="/courses" className="button-primary">Back to Courses</Link>
            </div>
        );
    }

    const handleTakeAssessment = () => {
        if (course.assessmentId) {
            navigate(`/course/${course.id}/assessment/${course.assessmentId}`);
        } else {
            alert("No assessment available for this course yet.");
        }
    };

    return (
        <div className="course-details-container">
            <div className="course-details-header" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${course.thumbnail || 'https://placehold.co/1200x400?text=Course+Banner'})` }}>
                <h1>{course.title}</h1>
                <p className="course-instructor">Created by {course.instructor}</p>
                <div className="course-meta">
                    <span>Level: {course.level}</span>
                    <span>Duration: {course.duration}</span>
                    <span>Rating: ⭐ {course.rating}</span>
                </div>
            </div>

            <div className="course-details-body">
                <div className="course-main-content">
                    <h2>Course Description</h2>
                    <p>{course.description_long}</p>

                    <h2>What you'll learn</h2>
                    <ul className="learn-list">
                        {course.what_you_will_learn?.map((item, index) => (
                            <li key={index}>✓ {item}</li>
                        ))}
                    </ul>

                    <h2>Course Content</h2>
                    {course.modules?.map((module, index) => (
                        <div key={index} className="course-module">
                            <h3>{module.title}</h3>
                            <ul>
                                {module.lessons.map((lesson, i) => (
                                    <li key={i}>{lesson}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <aside className="course-sidebar">
                    <img src={course.thumbnail || 'https://placehold.co/480x270?text=Course+Image'} alt={course.title} className="sidebar-thumbnail" />
                    <p className="course-price-sidebar">{course.price}</p>
                    <button className="button-primary full-width">Enroll Now (Mock)</button>
                    {course.assessmentId && (
                        <button onClick={handleTakeAssessment} className="button-secondary full-width">
                            Take Assessment
                        </button>
                    )}
                    {/* Add more sidebar content like instructor bio, etc. */}
                </aside>
            </div>
            <div style={{textAlign: 'center', marginTop: '2rem'}}>
                 <Link to="/courses" className="button-link">← Back to All Courses</Link>
            </div>
        </div>
    );
}

export default ViewCourseDetailsPage;