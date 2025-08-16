const mongoose=require('mongoose');
const config=require('config');
const dbgr=require('debug')("development:mongoose");
//`${config.get("MONGODB_URI")}/bellisse`

mongoose.connect(config.get(process.env.MONGODB_URI))
.then(function () {
    dbgr("✅ Connection established to Atlas");
})
.catch(function (err) {
    dbgr("❌ Connection error:", err);
});

module.exports=mongoose.connection;