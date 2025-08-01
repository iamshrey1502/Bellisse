const express=require('express');
const app=express();
const cookieparser=require('cookie-parser');
const path=require('path');
const db=require("./config/mongoose-connection");
const ownersrouter=require('./routes/ownersrouter');
const productsrouter=require('./routes/productsrouter');
const usersrouter=require('./routes/usersrouter');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.set("view engine","ejs");

app.use("/owners",ownersrouter);
app.use("/products",productsrouter);
app.use("/users",usersrouter);

app.get("/",function(req,res){
    res.send("Hello World");
});

app.listen(3000);