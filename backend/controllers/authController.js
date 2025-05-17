// backend/controllers/authController.js
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

export const registerUser = async (req, res) => {
    const {
        fullName,
        dob,
        currentYearOfStudy,
        institutionName,
        fatherName,
        mobileNumber,
        email,
        password,
    } = req.body;

    try {
        const userExists = await User.findOne({ $or: [{ email }, { mobileNumber }] });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists with this email or mobile number' });
        }

        const user = await User.create({
            fullName,
            dob,
            currentYearOfStudy,
            institutionName,
            fatherName,
            mobileNumber,
            email,
            password, // Will be hashed by pre-save hook
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                message: 'User registered successfully!',
                token: generateToken(user._id) // Optional: send token on registration
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({ message: 'Server error during registration', error: error.message });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password' });
    }

    try {
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                message: 'Login successful!',
                token: generateToken(user._id)
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Server error during login', error: error.message });
    }
};