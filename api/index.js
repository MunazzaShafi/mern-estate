const express =require("express");
const mongoose = require("mongoose");
const dotenv= require("dotenv");
const userRoute = require("./routes/authRoute.js");
const authRoute =require( "./routes/authRoute.js");

dotenv.config();
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("connected to MongoDB")
}).catch((err)=>{
    console.log(err)
});

 const app= express();
 app.use(express.json());

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);

 app.listen(3000 ,()=>{
    console.log("Server is running on port :3000")
 })

