const express = require("express");
const dotenv = require("dotenv");
const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const NotesController = require('../controllers/notesController.js')
const  router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const destinationPath = "./files";
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


// Routers

router.post('/upload', upload.single("files"), NotesController.uploadNote);
router.get('/getFiles', NotesController.getNote);
router.get('/upload/:id', NotesController.getNoteById);


const fileRoutes = router;

module.exports = fileRoutes;