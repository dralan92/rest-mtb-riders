const express = require('express');
const app = express();
const morgan = require('morgan');

const riderRoutes = require('./api/routes/riders');

app.use(morgan('dev'));

app.use('/riders', riderRoutes);


module.exports = app;