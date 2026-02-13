
const express = require("express");
const authController = require("../controllers/authController.js")
const bcrypt = require("bcrypt");
const multer = require("multer");
const cloudinary = require("cloudinary");
const dotenv = require("dotenv");

const router = express.Router();

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const destinationPath = "./images";
        cb(null, destinationPath);

    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname);
    }
});


var upload = multer({
    storage: storage
})

// Signup
router.post("/signup", upload.single("profileImg"), authController.signUp);


// Login
router.post("/login", authController.logIn);


const authRoutes = router;

module.exports = authRoutes;