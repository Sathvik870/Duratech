// frontend/src/components/AssessmentPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { assessments as mockAssessments, courses as mockCourses } from '../mockData';
import '../index.css'; // For assessment styles

function AssessmentPage() {
    const { courseId, assessmentId } = useParams(); // We might use assessmentId more directly
    const navigate = useNavigate();

    const [assessment, setAssessment] = useState(null);
    const [courseTitle, setCourseTitle] = useState('');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [score, setScore] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        // In a real app, fetch assessment by ID
        const foundAssessment = mockAssessments[assessmentId];
        const foundCourse = mockCourses.find(c => c.id === courseId);

        if (foundAssessment && foundCourse) {
            setAssessment(foundAssessment);
            setCourseTitle(foundCourse.title);
            // Initialize selectedAnswers
            const initialAnswers = {};
            foundAssessment.questions.forEach(q => initialAnswers[q.id] = null);
            setSelectedAnswers(initialAnswers);
        } else {
            // Handle assessment not found
            console.error("Assessment or course not found!");
            navigate(`/course/${courseId}`); // Or a dedicated error page
        }
    }, [assessmentId, courseId, navigate]);

    const handleAnswerSelect = (questionId, optionIndex) => {
        if (submitted) return; // Don't allow changes after submission
        setSelectedAnswers(prev => ({
            ...prev,
            [questionId]: optionIndex
        }));
    };

    const handleSubmit = () => {
        if (!assessment) return;
        let correctAnswers = 0;
        assessment.questions.forEach(q => {
            if (selectedAnswers[q.id] === q.correctAnswer) {
                correctAnswers++;
            }
        });
        setScore((correctAnswers / assessment.questions.length) * 100);
        setSubmitted(true);
    };

    const handleRetake = () => {
        setCurrentQuestionIndex(0);
        const initialAnswers = {};
        assessment.questions.forEach(q => initialAnswers[q.id] = null);
        setSelectedAnswers(initialAnswers);
        setScore(null);
        setSubmitted(false);
    }

    if (!assessment) {
        return <div className="page-container text-center">Loading assessment...</div>;
    }

    const currentQuestion = assessment.questions[currentQuestionIndex];

    if (submitted) {
        return (
            <div className="assessment-container results-container">
                <h2>Assessment Results for {assessment.title}</h2>
                <h3>Your Score: {score !== null ? score.toFixed(2) : 'N/A'}%</h3>
                <p>You answered {score !== null ? (score/100 * assessment.questions.length) : 0} out of {assessment.questions.length} questions correctly.</p>
                <div className="assessment-summary">
                    <h4>Review Your Answers:</h4>
                    {assessment.questions.map((q, index) => (
                        <div key={q.id} className={`summary-question ${selectedAnswers[q.id] === q.correctAnswer ? 'correct' : 'incorrect'}`}>
                            <p><strong>Q{index + 1}: {q.text}</strong></p>
                            <p>Your answer: {q.options[selectedAnswers[q.id]] || "Not answered"}</p>
                            {selectedAnswers[q.id] !== q.correctAnswer && (
                                <p>Correct answer: {q.options[q.correctAnswer]}</p>
                            )}
                        </div>
                    ))}
                </div>
                <div className="assessment-actions">
                    <button onClick={handleRetake} className="button-primary">Retake Assessment</button>
                    <Link to={`/course/${courseId}`} className="button-secondary">Back to Course</Link>
                </div>
            </div>
        );
    }


    return (
        <div className="assessment-container">
            <Link to={`/course/${courseId}`} className="back-to-course-link">← Back to {courseTitle}</Link>
            <h2>{assessment.title}</h2>
            <div className="progress-bar-container">
                 <div
                    className="progress-bar"
                    style={{ width: `${((currentQuestionIndex + 1) / assessment.questions.length) * 100}%` }}
                ></div>
            </div>
            <p>Question {currentQuestionIndex + 1} of {assessment.questions.length}</p>

            {currentQuestion && (
                <div className="question-block">
                    <h3>{currentQuestion.text}</h3>
                    <ul className="options-list">
                        {currentQuestion.options.map((option, index) => (
                            <li key={index}
                                className={`option-item ${selectedAnswers[currentQuestion.id] === index ? 'selected' : ''}`}
                                onClick={() => handleAnswerSelect(currentQuestion.id, index)}>
                                {String.fromCharCode(65 + index)}. {option} {/* A. B. C. ... */}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="assessment-navigation">
                <button
                    onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                    disabled={currentQuestionIndex === 0}
                    className="button-secondary"
                >
                    Previous
                </button>
                {currentQuestionIndex < assessment.questions.length - 1 ? (
                    <button
                        onClick={() => setCurrentQuestionIndex(prev => Math.min(assessment.questions.length - 1, prev + 1))}
                        className="button-primary"
                    >
                        Next
                    </button>
                ) : (
                    <button onClick={handleSubmit} className="button-primary button-submit">
                        Submit Assessment
                    </button>
                )}
            </div>
        </div>
    );
}

export default AssessmentPage;