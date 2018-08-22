const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Rider = require('../models/rider');



router.get('/',(req,res,next)=>{
    
    Rider.find()
    .select('_id username password zip address gender email dateOfBirth phone')
    .exec()
    .then(docs=>{
        const response = {
            count: docs.length,
            products: docs


        };
        console.log(docs);
        res.status(200).json(response);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
    
});

router.get('/:riderId',(req,res,next)=>{
    const id = req.params.riderId;
    Rider.findById(id)
    .exec()
    .then(doc=>{
        console.log(doc);
        if(doc){
            res.status(200).json(doc);
        }else{
            res.status(404).json({
                message: "No valid Entry"
            });
        }
       
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

router.patch('/:riderId',(req,res,next)=>{
    const id = req.params.riderId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
        console.log(ops.propName);
        console.log(ops.value);
    }
    Rider.update({_id:id}, { $set:updateOps})
    .exec()
    .then(result=>{
        console.log(result);
        res.status(200).json(result); 
       
        
       
        })
    .catch(err=>{
        console.log(err);
        res.status(500).json({error:err});
    });
    
});

router.delete('/:riderId',(req,res,next)=>{
    const id = req.params.riderId;
    Rider.remove({_id:id})
    .exec()
    .then(result=>{
        
        res.status(200).json(result); 
       
        
       
        })
    .catch(err=>{
        console.log(err);
        res.status(500).json({error:err});
    });
    
});

module.exports = router;