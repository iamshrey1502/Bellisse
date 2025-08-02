const express=require('express');
const router=express.Router();
const usermodel=require('../models/user-model');

router.get("/",function(req,res){
    res.send("hey");

})

router.post("/register",async function(req,res){
    // res.send("hey");
    try{
        let{fullname, email, password}=req.body;//MongoDB is schemaless basically if you user wont give any of the field in the form it will still create user, you can use joy-based validation
        let user=await usermodel.create({
        fullname,
        email,
        password,
    });
    res.send(user);
    }
    catch(err){
        res.send(err.message);
    }

})

module.exports=router;