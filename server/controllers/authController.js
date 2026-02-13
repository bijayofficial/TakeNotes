const express = require("express");
const dotenv = require("dotenv");
const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

dotenv.config();

const saltRounds = 10;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

module.exports = cloudinary;


const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});


const signUp = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            userBio,
            userEmail,
            userMobile,
            userName,
            userPassword,
        } = req.body;

        // Validate fields
        if (
            !userEmail ||
            !userName ||
            !userPassword
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required.",
            });
        }

        // console.log('one');

        // Check existing user
        const existingUser = await User.findOne({ userEmail });
        // console.log('two');

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists with this email.",
            });
        }
        // console.log('three');

        // Check file
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Profile image is required.",
            });
        }
        // console.log('four');

        // Upload image to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(
            req.file.path,
            { folder: "/images" }
        );

        console.log('five');

        // Hash password
        const hashedPassword = await bcrypt.hash(userPassword, saltRounds);
        console.log('six');

        // Save user
        const newUser = await User.create({
            firstName,
            lastName,
            userBio,
            userEmail,
            userMobile,
            userName,
            userPassword: hashedPassword,
            profileImg: uploadResult.secure_url,
        });
        console.log('seven');

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            data: {
                user: newUser,
                email: newUser.userEmail,
            },
        });

    } catch (error) {
        console.error("Signup Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};


const logIn = async (req, res) => {
    try {
        const { userEmail, userPassword } = req.body;

        // Validate input
        if (!userEmail || !userPassword) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required."
            });
        }

        // Find user (include password if select: false is used)
        const user = await User.findOne({ userEmail }).select("+userPassword");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User does not exist."
            });
        }

        // Compare password
        const passwordMatch = await bcrypt.compare(
            userPassword,
            user.userPassword
        );

        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid login credentials."
            });
        }

        // Success
        return res.status(200).json({
            success: true,
            message: "User verified successfully.",
            data: {
                id: user._id,
                email: user.userEmail,
                username: user.userName
            }
        });

    } catch (error) {
        console.error("Login Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};


module.exports = { signUp, logIn };
