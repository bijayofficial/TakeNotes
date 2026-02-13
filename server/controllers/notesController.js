const express = require("express");
const dotenv = require("dotenv");
const Notes = require("../models/Notes.js");
const multer = require("multer");
const path = require("path");


dotenv.config();

const storage = multer.memoryStorage();
var upload = multer({
    storage: storage
})


const uploadNote = async (req, res) => {
    try {
        const { fileName, fileDescription, tags, file } = req.body;

        console.log('one');

        const uploadedBy = req.body.userId;
        console.log(uploadedBy);
        console.log('two');


        // Save in DB
        const newNote = await Notes.create({
            fileName: fileName,
            fileDescription: fileDescription,
            tags: tags,
            files: file,
            uploadedBy: uploadedBy
        });
        console.log('three');

        await newNote.save();

        console.log('four');

        return res.status(201).json({
            success: true,
            message: "Note uploaded successfully",
            data: newNote,
        });

    } catch (error) {
        console.error("Upload Note Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};


const getNote = async (req, res) => {
    try {

        const { title, tag } = req.query;

        const query = {};

        if (title) {
            query.fileName = {
                $regex: title,
                $options: "i"
            };
        };

        if (tag) {
            query.tag = {
                $regex: tag,
                $options: "i"
            }
        }
        const data = await Notes.find(query);
        res.send({ data: data });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            msg: "Internal server error"
        });
    }
};

const getNoteById = async (req, res) => {
    try {

        const { id } = req.params.id;
        console.log(id);

        const note = await Notes.findById(id)
            .populate("uploadedBy", "userName userEmail");

        if (!note) {
            return res.status(404).json({
                status: false,
                msg: "Note not found"
            });
        }

        return res.status(200).json({
            status: true,
            data: note
        });

    } catch (error) {
        console.log(error);

        if (error.name === "CastError") {
            return res.status(400).json({
                status: false,
                msg: "Invalid note ID"
            });
        }

        return res.status(500).json({
            status: false,
            msg: "Internal server error"
        });
    }
};


module.exports = { uploadNote, getNote, getNoteById };
