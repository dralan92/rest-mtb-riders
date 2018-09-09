const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Rider = require('../models/rider');
const multer = require('multer');



const upload = multer({ dest: 'uploads/'});


router.get('/',(req,res,next)=>{
    
    Rider.find()
    .select('_id username password zip address gender email dateOfBirth phone')
    .exec()
    .then(docs=>{
        const response = {
            count: docs.length,
            riders: docs.map(doc=>{
                return{
                    id:doc._id,
                    username: doc.username,
                    password: doc.password,
                    zip:doc.zip,
                    address:doc.address,

                    gender:doc.gender,
                    email:doc.email,
                    dateOfBirth:doc.dateOfBirth,
                    phone:doc.phone
                   
                }
            })


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
router.post('/',upload.single('riderImage'),(req,res,next)=>{
    Rider.find({username:req.body.username})
    .exec()
    .then(doc=>{
        //console.log(doc.length + 'riders');
        if(doc.length >= 1){
            //console.log('username already exists');
            res.status(409).json({
                message:"Username already exists"
            });
        }else{
           // console.log('user name is NEW');

            console.log(req.file);
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
                    createdRider: {
                        _id: new mongoose.Types.ObjectId(),
                    username: result.username,
                    password: result.password,
                    zip: result.zip,
                    address: result.address,
        
                    gender: result.gender,
                    email: result.email,
                    dateOfBirth: result.dateOfBirth,
                    phone: result.phone,
                    
                    }
                }); 
            })
            .catch( err=>{
                console.log(err);
            });
        }
    });
   

   
    
});

router.patch('/:riderId',(req,res,next)=>{
    
    const id = req.params.riderId;
   
    const updateOps = {};

    /*for(const key of Object.keys(req.body)){
        console.log(key);
        value = req.body[key];
        console.log(value);
        updateOps[key] = value;
       
    }
    console.log(updateOps);
    for(const ops of req.body){
       
        updateOps[ops.propName] = ops.value;
        console.log(ops.propName);
        console.log(ops.value);
    }*/
   /*
                                    username:req.body.username,
                                    password:req.body.password,
                                    zip:req.body.zip,
                                    address:req.body.address,
                                
                                    gender:req.body.gender,
                                    email:req.body.email,
                                    dateOfBirth:req.body.dateOfBirth,
                                    phone:req.body.phone

   */
    Rider.update({_id:id}, { $set:{username:req.body.username,
        password:req.body.password,
        zip:req.body.zip,
        address:req.body.address,
    
        gender:req.body.gender,
        email:req.body.email,
        dateOfBirth:req.body.dateOfBirth,
        phone:req.body.phone}
                                
                            })
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