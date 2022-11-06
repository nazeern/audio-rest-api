const express = require('express');

// Package to handle different routes and endpoints and HTTP verbs
const router = express.Router();

const mongoose = require('mongoose');

const Project = require('../models/project')

router.get('/', (req, res, next) => {
    Project.findOne()
        .where('name').equals(req.query.name)
        .select('audioFile')
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
                res.status(200).json({
                    project: doc,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/' + doc.audioFile
                    }
                });
            } else {
                res.status(404).json({
                    message: 'Match not found'
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        });
});

// export router with configs so it can be used in other files
module.exports = router;