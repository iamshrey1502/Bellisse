const express=require('express');
const router=express.Router();
const isloggedin=require('../middlewares/isloggedin');
const productmodel=require('../models/product-model'); 

router.get("/",function(req,res){
    let error=req.flash("error");
    let success=req.flash("success");
    res.render("index",{ error,success });
});

router.get("/shop", isloggedin ,async function(req,res){
    let products=await productmodel.find()
    let success=req.flash("success");//req.flash("success") always returns an array of messages, even if there is only one message
    res.render("shop",{products,success});
});

// router.post("/shop", isloggedin ,async function(req,res){
//     let success=req.flash("success");
//     res.render("shop",{success});
// });

router.get("/logout", isloggedin ,function(req,res){
    // let success=req.flash("success");
    // res.render("index",{success,error});\
    req.flash("success","You are logged out");
    res.redirect("/");
});

module.exports=router;