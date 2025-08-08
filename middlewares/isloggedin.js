const express=require('express');
const jwt=require('jsonwebtoken');
const usermodel=require('../models/user-model');

module.exports=async function(req,res,next){
    if(!req.cookies.token){
        req.flash("error","you need to login first!");
        return res.redirect("/");
    }

    try{
        let decoded=jwt.verify(req.cookies.token,process.env.JWT_KEY);
        let user=await usermodel.findOne({email:decoded.email}).select("-password");//set("-password") exlcudes password field from user data
        req.user=user;
        next();

    }
    catch(err){
        req.flash("error","Soemthing went Wrong");
        res.redirect("/");

    }

}
