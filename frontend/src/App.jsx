// frontend/src/App.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, Navigate, NavLink, useNavigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import ListCoursesPage from './components/ListCoursesPage';
import ViewCourseDetailsPage from './components/ViewCourseDetailsPage';
import AssessmentPage from './components/AssessmentPage';
import './index.css';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('userToken'));
    const [currentUserName, setCurrentUserName] = useState(localStorage.getItem('userName'));
    const navigateHook = useNavigate();

    useEffect(() => {
        const handleStorageChange = (event) => {
            if (event.key === 'userToken') {
                console.log("APP.JSX: Storage event for userToken. Updating isAuthenticated.");
                setIsAuthenticated(!!localStorage.getItem('userToken'));
            }
            if (event.key === 'userName') {
                console.log("APP.JSX: Storage event for userName. Updating currentUserName.");
                setCurrentUserName(localStorage.getItem('userName'));
            }
        };
        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const handleLoginSuccess = () => {
        console.log("APP.JSX: handleLoginSuccess triggered (BEFORE setIsAuthenticated). Current isAuthenticated:", isAuthenticated); // LOG A
        setIsAuthenticated(true);
        setCurrentUserName(localStorage.getItem('userName'));
        console.log("APP.JSX: handleLoginSuccess (AFTER setIsAuthenticated). New isAuthenticated should reflect on next render."); // LOG B
    };

    const handleSignupSuccess = () => {
        console.log("APP.JSX: handleSignupSuccess triggered.");
        navigateHook('/login');
    };

    const handleLogout = () => {
        console.log("APP.JSX: handleLogout triggered.");
        localStorage.removeItem('userToken');
        localStorage.removeItem('userName');
        setIsAuthenticated(false);
        setCurrentUserName(null);
        navigateHook('/login');
    };

    const initialRedirectPath = isAuthenticated ? "/courses" : "/login";
    console.log("APP.JSX: Rendering. isAuthenticated:", isAuthenticated, "CurrentUserName:", currentUserName, "Initial Path:", initialRedirectPath); // LOG C

    return (
        <>
            <nav>
                <Link to={isAuthenticated ? "/courses" : "/login"} className="nav-brand">LMS Platform</Link>
                <div className="nav-links">
                    {isAuthenticated && (
                         <NavLink to="/courses" className={({isActive}) => isActive ? "active" : ""}>Courses</NavLink>
                    )}
                    {!isAuthenticated && (
                        <>
                            <NavLink to="/login" className={({isActive}) => isActive ? "active" : ""}>Login</NavLink>
                            <NavLink to="/signup" className={({isActive}) => isActive ? "active" : ""}>Sign Up</NavLink>
                        </>
                    )}
                </div>
                {isAuthenticated && currentUserName && (
                    <div className="user-info">
                        <span>Welcome, {currentUserName}!</span>
                        <button onClick={handleLogout} className="logout-button">Logout</button>
                    </div>
                )}
            </nav>
            <div className="main-content">
                <Routes>
                    <Route
                        path="/login"
                        element={!isAuthenticated ? <LoginPage onLoginSuccess={handleLoginSuccess} /> : <Navigate to="/courses" replace />}
                    />
                    <Route
                        path="/signup"
                        element={!isAuthenticated ? <SignupPage onSignupSuccess={handleSignupSuccess} /> : <Navigate to="/courses" replace />}
                    />
                    <Route
                        path="/courses"
                        element={isAuthenticated ? <ListCoursesPage /> : <Navigate to="/login" replace />}
                    />
                    <Route
                        path="/course/:courseId"
                        element={isAuthenticated ? <ViewCourseDetailsPage /> : <Navigate to="/login" replace />}
                    />
                    <Route
                        path="/course/:courseId/assessment/:assessmentId"
                        element={isAuthenticated ? <AssessmentPage /> : <Navigate to="/login" replace />}
                    />
                    <Route path="/" element={<Navigate to={initialRedirectPath} replace />} />
                    <Route path="*" element={<Navigate to={initialRedirectPath} replace />} />
                </Routes>
            </div>
        </>
    );
}

export default App;