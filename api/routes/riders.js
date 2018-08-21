const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Rider = require('../models/rider');

router.get('/:riderId',(req,res,next)=>{
    const id = req.params.riderId;
    Rider.findById(id)
    .exec()
    .then(doc=>{
        console.log(doc);
        res.status(200).json(doc);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({error:err});
    });
    
});
//post
router.post('/',(req,res,next)=>{
    const rider = new Rider({
        _id: new mongoose.Types.ObjectId(),
        username: req.body.username,
        password: req.body.password,
        zip: req.body.zip,
        address: req.body.address,

        gender: req.body.gender,
        email: req.body.email,
        dateOfBirth: req.body.dateOfBirth,
        phone: req.body.phone

    });
    rider.save()
    .then( result=>{
        console.log(result);
        res.status(201).json({
            message: "Handling post request to /riders",
            createdRider: rider
        });
    })
    .catch( err=>{
        console.log(err);
    });
    
});


module.exports = router;