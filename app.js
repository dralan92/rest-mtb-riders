const express = require('express');
const app = express();
const morgan = require('morgan');

const riderRoutes = require('./api/routes/riders');

app.use(morgan('dev'));

app.use('/riders', riderRoutes);

app.use((req,res,next)=>{
    const error = new Error('Not Found');
    error.status =404;
    next(error);
});

app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message,
            code: error.status
        }
    });
});

module.exports = app;