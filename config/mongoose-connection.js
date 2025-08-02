const mongoose=require('mongoose');
const config=require('config');
const dbgr=require('debug')("development:mongoose");
//`${config.get("MONGODB_URI")}/bellisse`

mongoose.connect(`${config.get("MONGODB_URI")}/bellisse`)//works on the basis of whats your enivorment varibale is
.then(function(){
    dbgr("Connection established");
})
.catch(function(err){
    dbgr(err);
});

module.exports=mongoose.connection;