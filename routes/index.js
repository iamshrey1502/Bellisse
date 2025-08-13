const express=require('express');
const router=express.Router();
const isloggedin=require('../middlewares/isloggedin');
const productmodel=require('../models/product-model'); 
const usermodel=require('../models/user-model');

router.get("/",function(req,res){
    let error=req.flash("error");
    let success=req.flash("success");
    res.render("index",{ error,success,loggedin:false });
});

router.get("/shop", isloggedin ,async function(req,res){
    let products=await productmodel.find()
    let success=req.flash("success");//req.flash("success") always returns an array of messages, even if there is only one message
    res.render("shop",{products,success});
});

router.get("/cart", isloggedin ,async function(req,res){
    let user=await usermodel
      .findOne({email:req.user.email})
      .populate("cart");

    const bill=(Number(user.cart[0].totalprice)+50)- Number(user.cart[0].discprice); 
    res.render("cart",{user,bill});
});

router.get("/addtocart/:productid", isloggedin ,async function(req,res){
    let user=await usermodel.findOne({email:req.user.email});
    user.cart.push(req.params.productid);
    await user.save();
    req.flash("success","Added to cart");
    res.redirect("/shop");
});

// router.get("/logout", isloggedin ,function(req,res){
//      let success=req.flash("success");
//      res.render("index",{success,error});\
//     req.flash("success","You are logged out");
//     res.redirect("/");
// });

module.exports=router;