const express = require('express');
const app = express();

const riderRoutes = require('./api/routes/riders');

app.use('/riders', riderRoutes);


module.exports = app;