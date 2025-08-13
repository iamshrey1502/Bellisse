const mongoose=require('mongoose');



const productschema=mongoose.Schema({
    name:String,
    totalprice:Number,
    discprice:{
        type:Number,
        default:0,
    },
    image:Buffer,
    bgcolor:String,
    panelcolor:String,
    textcolor:String,

});

module.exports=mongoose.model("product",productschema);