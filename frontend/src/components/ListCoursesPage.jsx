// frontend/src/components/ListCoursesPage.jsx
import React from 'react';
import CourseCard from './CourseCard';
import { courses as mockCourses } from '../mockData'; // Import mock data
import '../index.css'; // For page layout styles

function ListCoursesPage() {
    // In a real app, you'd fetch courses from an API here
    const courses = mockCourses;

    return (
        <div className="page-container">
            <header className="courses-page-header">
                <h1>Explore Our Courses</h1>
                <p>Find your next learning adventure from our curated collection.</p>
            </header>
            <div className="course-list-grid">
                {courses.length > 0 ? (
                    courses.map(course => (
                        <CourseCard key={course.id} course={course} />
                    ))
                ) : (
                    <p>No courses available at the moment. Check back soon!</p>
                )}
            </div>
        </div>
    );
}

export default ListCoursesPage;