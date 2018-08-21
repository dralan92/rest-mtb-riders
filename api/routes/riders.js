const express = require('express');
const router = express.Router();

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message: "Handling get request to /riders"
    });
});
//post
router.post('/',(req,res,next)=>{
    const rider = {
        username: req.body.username,
        password: req.body.password,
        zip: req.body.zip,
        address: req.body.address,

        gender: req.body.gender,
        email: req.body.email,
        dateOfBirth: req.body.dateOfBirth,
        phone: req.body.phone

    }
    res.status(201).json({
        message: "Handling post request to /riders",
        createdRider: rider
    });
});


module.exports = router;