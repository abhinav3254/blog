const express = require('express');
const users = require('../models/User');
const upload = require("../middleware/uploadMiddleware");
const router = express.Router();

router.get('/', (req, res) => {
    return res.json({ mesaage: 'user route working!!' });
});


/**
 * route for get profile of logged in user
 */
router.get('/profile', async (req, res) => {
    try {
        const userId = req.user.userId;

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized access. Please log in to view your profile.' });
        }
       
        const profile = await users.findById(userId);

        if (profile) {
            const refinedProfile = {
                _id: profile._id,
                username: profile.username,
                firstName: profile.firstName,
                lastName: profile.lastName,
                email: profile.email,
                phoneNumber: profile.phoneNumber,
                profilePicture: profile.profilePicture,
                gender: profile.gender,
                dateOfBirth: profile.dateOfBirth,
                city: profile.city,
                country: profile.country,
                bio: profile.bio,
            };

            return res.status(200).json(refinedProfile);
        } else {
            return res.status(404).json({ message: 'Profile not found. Please check your details and try again.' });
        }

    } catch (err) {
        return res.status(500).json({ message: 'An internal server error occurred while fetching the profile. Please try again later.', error: err.message });
    }
});


router.put('/profile/update', upload.single("profilePicture"),async (req, res) => {
    try {
        const userId = req.user.userId;

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized access. Please log in to update your profile.' });
        }

        const { firstName, lastName, email, phoneNumber, profilePicture, gender, dateOfBirth, city, country ,bio} = req.body;

        // Find the user by ID
        const user = await users.findById(userId);
        let imageUrl = req.file ? req.file.path : null;
        if (imageUrl) {
          imageUrl = imageUrl.replace(/\\/g, "\\");
        }
        if (!user) {
            return res.status(404).json({ message: 'User not found. Please check the user ID and try again.' });
        }

        // Update user fields
        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;
        if (email) {
            // Validate email format if provided
            if (!email.includes('@')) {
                return res.status(400).json({ message: 'Please provide a valid email address.' });
            }
            user.email = email;
        }
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (imageUrl) user.profilePicture = imageUrl;
        if (gender) user.gender = gender;
        if (dateOfBirth) user.dateOfBirth = dateOfBirth;
        if (city) user.city = city;
        if (country) user.country = country;
        if (bio) user.bio = bio;
        // Save the updated user
        await user.save();

        return res.status(200).json({ message: 'Profile updated successfully.' });

    } catch (err) {
        return res.status(500).json({ message: 'An internal server error occurred while updating the profile. Please try again later.', error: err.message });
    }
});



module.exports = router;