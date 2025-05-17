// frontend/src/components/SignupPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';

function SignupPage() {
    const [formData, setFormData] = useState({
        fullName: '', dob: '', currentYearOfStudy: '', institutionName: '',
        fatherName: '', mobileNumber: '', email: '', password: '', confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        for (const key in formData) {
            if (formData[key].trim() === '' && key !== 'confirmPassword') { // confirmPassword is not sent
                setError(`Please fill in the ${key.replace(/([A-Z])/g, ' $1').toLowerCase()} field.`);
                setLoading(false);
                return;
            }
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match.');
            setLoading(false);
            return;
        }
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long.');
            setLoading(false);
            return;
        }
        if (!/^\d{10}$/.test(formData.mobileNumber)) {
            setError('Mobile number must be 10 digits.');
            setLoading(false);
            return;
        }

        const { confirmPassword, ...dataToSubmit } = formData;

        try {
            const response = await authService.register(dataToSubmit);
            setSuccess(response.data.message + ' Redirecting to login...');
            setFormData({
                fullName: '', dob: '', currentYearOfStudy: '', institutionName: '',
                fatherName: '', mobileNumber: '', email: '', password: '', confirmPassword: ''
            });
            setTimeout(() => navigate('/login'), 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Signup failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <h2>Create Your Account</h2>
            {error && <p className="message error-message">{error}</p>}
            {success && <p className="message success-message">{success}</p>}
            <form onSubmit={handleSubmit} className="auth-form">
                <div className="form-group">
                    <label htmlFor="fullName">Full Name</label>
                    <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required placeholder="e.g., Jane Smith" />
                </div>
                <div className="form-group">
                    <label htmlFor="dob">Date of Birth</label>
                    <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="currentYearOfStudy">Current Year of Study</label>
                    <input type="text" id="currentYearOfStudy" name="currentYearOfStudy" value={formData.currentYearOfStudy} onChange={handleChange} required placeholder="e.g., 3rd Year B.Tech, Class 12" />
                </div>
                <div className="form-group">
                    <label htmlFor="institutionName">Name of Institution</label>
                    <input type="text" id="institutionName" name="institutionName" value={formData.institutionName} onChange={handleChange} required placeholder="e.g., Grand University" />
                </div>
                <div className="form-group">
                    <label htmlFor="fatherName">Father's Name</label>
                    <input type="text" id="fatherName" name="fatherName" value={formData.fatherName} onChange={handleChange} required placeholder="e.g., Michael Smith" />
                </div>
                <div className="form-group">
                    <label htmlFor="mobileNumber">Mobile Number (10 digits)</label>
                    <input type="tel" id="mobileNumber" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} required pattern="[0-9]{10}" title="Mobile number should be 10 digits" placeholder="e.g., 9876543210" />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required placeholder="e.g., jane.smith@example.com" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password (min. 6 characters)</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required minLength="6" placeholder="Choose a strong password" />
                </div>
                 <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required placeholder="Re-type your password" />
                </div>
                <button type="submit" className="auth-button" disabled={loading}>
                    {loading ? 'Creating Account...' : 'Sign Up'}
                </button>
            </form>
            <p className="form-switch-link">
                Already have an account? <Link to="/login">Login here</Link>
            </p>
        </div>
    );
}

export default SignupPage;