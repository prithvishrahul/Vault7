const express=require('express');
const morgan = require('morgan');
const bodyParser=require('body-parser');
const mongoose =require('mongoose');
const cors=require('cors');
require('dotenv').config();

const app=express();
mongoose.connect(process.env.Dev_Db)
.then(()=>console.log("DB Connected"))
.catch(err=>{
    console.log(err);
})
app.use(morgan('dev'));
app.use(bodyParser.json({limit: '200mb',extended: true}));
app.use(bodyParser.urlencoded({limit:'200mb',extended:true}));
app.use(cors({origin:"*"}));
app.post('/storing-credential',(req,res)=>{
    console.log("req in storing credentiial route: ",req.body);
    res.send("hello");
})
const port=process.env.PORT ||8001;
app.listen(port,()=>{
    console.log("Server running succesfully at port: "+port);
})


