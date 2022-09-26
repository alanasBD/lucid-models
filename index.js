const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 5000;


mongoose
.connect('mongodb://localhost:27017/tools')
.then(()=>{
    console.log("Connected");
})

app.get("/",(req,res)=>{
   res.send("Anas");
})




app.listen(PORT,()=>{
    console.log("Server is running...");
})