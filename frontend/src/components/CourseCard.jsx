// frontend/src/components/CourseCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css'; // Assuming you have card styles there

function CourseCard({ course }) {
    return (
        <div className="course-card">
            <Link to={`/course/${course.id}`} className="course-card-link">
                <img src={course.thumbnail || 'https://placehold.co/480x270?text=Course+Image'} alt={course.title} className="course-card-thumbnail" />
                <div className="course-card-content">
                    <h3 className="course-card-title">{course.title}</h3>
                    <p className="course-card-instructor">By: {course.instructor}</p>
                    <p className="course-card-description">{course.description_short}</p>
                    <div className="course-card-footer">
                        <span className="course-card-price">{course.price}</span>
                        <span className="course-card-rating">⭐ {course.rating} ({/* Add review count if available */})</span>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default CourseCard;