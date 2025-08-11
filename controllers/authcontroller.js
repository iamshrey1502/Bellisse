const usermodel=require('../models/user-model');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const {generatetoken}=require('../utils/generatetoken');
const productmodel=require('../models/product-model.js')


module.exports.registeruser= async function(req,res){
    // res.send("hey");
    try{
        let{fullname, email, password}=req.body;//MongoDB is schemaless basically if you user wont give any of the field in the form it will still create user, you can use joy-based validation
        let user= await usermodel.findOne({email:email});
        if(user){
            req.flash("error","You already have an account, Please login");
            return res.redirect("/")
        }

        bcrypt.genSalt(10,function(err,salt){
            bcrypt.hash(password,salt,async function(err,hash){
                if(err){
                    return res.send(err.message);
                }
                else{
                    // res.send(hash);
                    let user=await usermodel.create({
                        fullname,
                        email,
                        password:hash,
                    });
                    // res.send(user);
                    
                    let token=generatetoken(user);
                    res.cookie("token",token);
                    
                    req.flash("success","User created sucessfully");
                    res.redirect("/shop");
                }
            });
        });
        
    
    }
    catch(err){
        res.send(err.message);
    }
};

module.exports.loginuser=async function(req,res){
    let { email, password } = req.body;

    let user=await usermodel.findOne({email:email});
    // let products=await productmodel.find();
    if(!user){
        req.flash("error","Something went wrong");
        return res.redirect("/");
    }
    else{
        bcrypt.compare(password,user.password,function(err,result){
            // res.send(result);
            if(result){
                let token=generatetoken(user);
                res.cookie("token",token);
                req.flash("success","You are loggedin!");// setting message in this route and making it visible in redirected route
                res.redirect("/shop");
            }
            else{
                req.flash("error","Email or Password incorrect");
                res.redirect("/");
            }
        })
    }
};

module.exports.logout=async function(req,res){
    res.cookie("token","");
    // req.flash("success","You are logged out");
    // res.redirect("/");

};