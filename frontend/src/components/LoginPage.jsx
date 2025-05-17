// frontend/src/components/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';
// import './LoginPage.css'; // Uncomment if you have specific styles for this page

function LoginPage({ onLoginSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // VVVV Ensure these state declarations are present and correct VVVV
    const [error, setError] = useState('');         // For displaying login errors
    const [loading, setLoading] = useState(false);  // For disabling button during API call
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // VVVV Use the setter functions for state VVVV
        setError('');       // Clear previous errors
        setLoading(true);   // Set loading to true
        console.log("LOGIN: Form submitted. Email:", email);

        if (!email.trim() || !password.trim()) {
            setError('Email and password are required.'); // Set error message
            setLoading(false);                            // Reset loading state
            console.log("LOGIN: Email or password missing.");
            return;
        }

        try {
            console.log("LOGIN: Calling authService.login with data:", { email, password });
            const response = await authService.login({ email, password });
            console.log("LOGIN: authService.login response received:", response);

            if (response && response.data && response.data.token && response.data.fullName) {
                console.log("LOGIN: Response data looks good. Token:", response.data.token, "FullName:", response.data.fullName);
                localStorage.setItem('userToken', response.data.token);
                localStorage.setItem('userName', response.data.fullName);
                console.log("LOGIN: Token and userName stored. Calling onLoginSuccess...");

                if (typeof onLoginSuccess === 'function') {
                    onLoginSuccess();
                    console.log("LOGIN: onLoginSuccess CALLED.");
                } else {
                    console.error("LOGIN: onLoginSuccess is not a function!", onLoginSuccess);
                }
                
                console.log("LOGIN: Navigating to /courses...");
                navigate('/courses');

            } else {
                console.error("LOGIN: Invalid response structure from API. Response data:", response?.data);
                // VVVV Use setError to display the error VVVV
                setError(response?.data?.message || 'Login successful but response data is malformed.');
            }
        } catch (err) {
            console.error("LOGIN: Error during login API call or subsequent processing:", err);
            let errorMessage = 'An unexpected error occurred. Please try again.';
            if (err.response) {
                console.error("LOGIN: Error response data:", err.response.data);
                console.error("LOGIN: Error response status:", err.response.status);
                errorMessage = err.response.data?.message || `Login failed. Server responded with status: ${err.response.status}`;
            } else if (err.request) {
                console.error("LOGIN: No response received, request made:", err.request);
                errorMessage = 'No response from server. Check network or server status.';
            } else {
                console.error("LOGIN: Error setting up the request:", err.message);
                errorMessage = 'Error in login request setup: ' + err.message;
            }
            // VVVV Use setError to display the caught error VVVV
            setError(errorMessage);
        } finally {
            setLoading(false); // Ensure loading is set to false in all cases
            console.log("LOGIN: setLoading(false) in finally block.");
        }
    };

    return (
        <div className="auth-container">
            <h2>User Login</h2>
            {/* VVVV This line uses the 'error' state variable VVVV */}
            {error && <p className="message error-message">{error}</p>}
            <form onSubmit={handleSubmit} className="auth-form">
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="e.g., yourname@example.com"
                        autoComplete="email"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Enter your password"
                        autoComplete="current-password"
                    />
                </div>
                {/* VVVV This line uses the 'loading' state variable VVVV */}
                <button type="submit" className="auth-button" disabled={loading}>
                    {loading ? 'Logging In...' : 'Login'}
                </button>
            </form>
            <p className="form-switch-link">
                Don't have an account? <Link to="/signup">Create one</Link>
            </p>
        </div>
    );
}

export default LoginPage;