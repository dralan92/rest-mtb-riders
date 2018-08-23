const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.post('/signup', (req, res, next)=>{
    const user = new user({
        _id: new mongoose.Types.ObjectId(),
        email:req.body.email,
       
    })
});


module.exports = router;