process.on('deprecation', (deprecation) => {
  console.log('DEPRECATION WARNING CAUGHT:');
  console.log('Name:', deprecation.name);
  console.log('Message:', deprecation.message);
  console.log('Stack:', deprecation.stack);
});



const express=require('express');
const app=express();
const cookieparser=require('cookie-parser');
const path=require('path');
const expsession=require('express-session');
const flash=require('connect-flash');


const db=require("./config/mongoose-connection");


const ownersrouter=require('./routes/ownersrouter');
const productsrouter=require('./routes/productsrouter');
const usersrouter=require('./routes/usersrouter');
const indexrouter=require('./routes/index');


require('dotenv').config();


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieparser());
app.use(
    expsession({
        resave:false,
        saveUninitialized:false,
        secret: process.env.EXPRESS_SESSION_SECRET,
    })
);

app.use(flash());
app.use(express.static(path.join(__dirname,'public')));
app.set("view engine","ejs");

app.use("/",indexrouter);
app.use("/owners",ownersrouter);
app.use("/products",productsrouter);
app.use("/users",usersrouter);
// app.use("/",index);

// app.get("/",function(req,res){
//     res.send("Hello World");
// });
app.get("/", (req, res) => {
    let error = req.flash("error");
    res.render("index", { error });
});

app.listen(3000);