const mongoose=require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/bellisse").then(function(){
    console.log("Connection established");
}).catch(function(err){
    console.log(err);
});

module.exports=mongoose.connection;