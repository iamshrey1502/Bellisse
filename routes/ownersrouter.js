const express=require('express');
const router=express.Router();
const ownermodel=require('../models/owner-model')
//first check
if(process.env.NODE_ENV === "development"){//Basically performing enivorment based routing
    router.post("/create",async function(req,res){
        let owners=await ownermodel.find();
        //second check
        if(owners.length > 0){
            res.status(503).send("You dont have a permission to create a new owner.");
        }
        let{fullname,email,password}=req.body;

        let createdowner=await ownermodel.create({
            fullname,
            email,
            password,
        });
        res.status(201).send(createdowner);  
    });
}

router.get("/admin",function(req,res){
    let success=req.flash("success");
    res.render("createproducts",{success});

})
// console.log(process.env.NODE_ENV);



module.exports=router;