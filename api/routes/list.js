const express = require('express');

// Package to handle different routes and endpoints and HTTP verbs
const router = express.Router();

const mongoose = require('mongoose');

const Project = require('../models/project')

router.get('/', (req, res, next) => {
    Project.find()
        .where('duration').lte(req.query.maxduration || Infinity) 
        .select('name duration _id audioFile')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                projects: docs.map(doc => {
                    return {
                        name: doc.name,
                        duration: doc.duration,
                        _id: doc._id,
                        audioFile: doc.audioFile,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/info/' + doc._id
                        }
                    }
                })
            }
            res.status(200).json(response)
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