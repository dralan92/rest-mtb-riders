const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');



const riderRoutes = require('./api/routes/riders');


const dbUSER = "dralan";
const dbPASS = "dralan";
mongoose.connect('mongodb+srv://'+dbUSER + ':' +dbPASS+ '@dralan-a7yib.mongodb.net/test?retryWrites=true',
{ useNewUrlParser: true });

console.log(mongoose.connection.readyState);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: false

}));

app.use(bodyParser.json());

/*app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    
    if( req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', '*');
        return res.status(200).json({});
    }
});*/

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