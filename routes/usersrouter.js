const express=require('express');
const router=express.Router();
const usermodel=require('../models/user-model');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');


const {generatetoken}=require('../utils/generatetoken');
const {registeruser,loginuser,logout}=require('../controllers/authcontroller');



// router.get("/",function(req,res){
//     res.send("hey");

// })

router.post("/register",registeruser);

router.post("/login",loginuser);

router.get("/logout",logout);

module.exports=router;