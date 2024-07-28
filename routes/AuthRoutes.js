const express = require('express');
const users = require('../schema/User');
const bcrypt = require('bcrypt');
const { jwtSecret } = require('../config/config');
const saltRounds = 10;
const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');

const router = express.Router();

router.get('', (req, res) => {
    return res.json({ message: 'auth' });
});


router.post('/register', async (req, res) => {
    try {
        const user = req.body;

        if (!user) {
            return res.status(400).json({ message: 'Request body cannot be empty' });
        }

        const { username, email, password, phoneNumber, termsCondition, firstName, lastName } = user;

        if (!termsCondition) {
            return res.status(400).json({ message: 'You must accept the terms and conditions to proceed' });
        }

        // Check if username already exists
        const existingUserByUsername = await users.findOne({ username });
        if (existingUserByUsername) {
            return res.status(400).json({ message: 'The username is already in use. Please choose a different username.' });
        }

        // Check if email already exists
        const existingUserByEmail = await users.findOne({ email });
        if (existingUserByEmail) {
            return res.status(400).json({ message: 'The email address is already registered. Please use a different email.' });
        }

        // Validate email format
        if (!email.includes('@')) {
            return res.status(400).json({ message: 'Please provide a valid email address.' });
        }

        // Hash the password
        const hashPassword = await bcrypt.hash(password, saltRounds);

        // Create and save new user
        const newUser = new users({
            username,
            firstName,
            lastName,
            email,
            phoneNumber,
            password: hashPassword,
            role: 'USER',
            termsCondition
        });

        const savedUser = await newUser.save();
        return res.status(201).json({ message: 'Registration successful. Your account has been created.', userId: savedUser._id });

    } catch (err) {
        return res.status(500).json({ message: 'An error occurred while processing your request. Please try again later.', error: err.message });
    }
});



router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find the user by username
        const user = await users.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: 'No account found with this username. Please check your username and try again.' });
        }

        // Check if the provided password matches the stored password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(400).json({ message: 'Incorrect password. Please try again.' });
        }

        // Generate a JWT token
        const expiresIn = '520h';
        const fullName = `${user.firstName} ${user.lastName}`;
        const token = jwt.sign({ userId: user._id, name: fullName, username: user.username, role: user.role }, jwtSecret, { expiresIn });

        return res.status(200).json({ message: `Welcome back, ${fullName}!`, token });

    } catch (err) {
        return res.status(500).json({ message: 'An error occurred while processing your request. Please try again later.', error: err.message });
    }
});


module.exports = router;