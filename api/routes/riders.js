const express = require('express');
const router = express.Router();

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message: "Handling get request to /riders"
    });
});

router.post('/',(req,res,next)=>{
    res.status(200).json({
        message: "Handling post request to /riders"
    });
});


module.exports = router;