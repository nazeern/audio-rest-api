const express = require('express');

// Create express appliation
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postRoute = require('./api/routes/post');
const downloadRoute = require('./api/routes/download');
const infoRoute = require('./api/routes/info');
const listRoute = require('./api/routes/list');

mongoose.connect('mongodb+srv://nazeern:' 
    + process.env.MONGO_ATLAS_PW + 
    '@audio-project-api.g0gozss.mongodb.net/?retryWrites=true&w=majority'
);

// this handler logs to console and calls next in the background
app.use(morgan('dev'));

// extract request data and make it readable
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/uploads', express.static('uploads'));

// Handling CORS errors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Acces-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        req.header('Acccess-Control-Allow-Methods', 'POST, GET');
        return res.status(200).json({});
    }
    next();
});

// target URLs aimed at /post, postRoute is request handler
app.use('/post', postRoute);
app.use('/download', downloadRoute);
app.use('/info', infoRoute);
app.use('/list', listRoute);

// Anything that reaches here is not caught, and is an error
app.use((req, res, next) => {
    const error = Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;