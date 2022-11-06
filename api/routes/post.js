const express = require('express');
const project = require('../models/project');
const mongoose = require('mongoose');
const multer = require('multer');
const { getAudioDurationInSeconds } = require('get-audio-duration');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {

}

const upload = multer({ storage: storage })

// Package to handle different routes and endpoints and HTTP verbs
const router = express.Router();

const Project = require('../models/project')

router.post('/', upload.single('audioFile'), (req, res, next) => {
    console.log(req.file);
    getAudioDurationInSeconds(req.file.path).then((duration) => {
        duration = Math.round(duration);
        const project = new Project({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            duration: duration,
            audioFile: req.file.path
        });
        project.save()
            .then(result => {
                console.log(result);
                res.status(201).json({
                    message: 'Posted audio project successfully.',
                    createdProject: {
                        name: result.name,
                        duration: result.duration,
                        audioFile: result.audioFile,
                        _id: result._id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/info/' + result._id
                        }
                    }
                })
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                })
            });
        
    });
});

// export router with configs so it can be used in other files
module.exports = router;