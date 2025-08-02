const mongoose=require('mongoose');


const userschema=mongoose.Schema({
    fullname:{
        type:String,
        minlength:3,
        trim:true,
    },
    email:String,
    password:String,
    cart:{
        type:Array,
        default:[],
    },
    orders:{
        type:Array,
        default:[],
    },
    contact:Number,
    picture:String,
});

module.exports=mongoose.model("user",userschema);