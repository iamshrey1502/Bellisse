const express=require('express');
const router=express.Router();
const upload=require('../config/multer-config.js');
const productmodel=require('../models/product-model.js');


router.post("/create",upload.single("image"),async function(req,res){
    // res.send("hey");
    try{
        let  { name,
    totalprice,
    discprice,
    bgcolor,
    panelcolor,
    textcolor}=req.body;

    let product=await productmodel.create({
        image:req.file.buffer,
        name,
        totalprice,
        discprice,
        bgcolor,
        panelcolor,
        textcolor,
    });
    req.flash("success", "Product Created Sucessfully");
    res.redirect("/owners/admin");
    }
    catch(err){
        res.send(err.message);
    }

    

})

module.exports=router;