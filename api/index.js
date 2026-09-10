const express =require("express");
const mongoose = require("mongoose");
const dotenv= require("dotenv");
const userRoute = require("./routes/userRoute.js");
const authRoute =require( "./routes/authRoute.js");
const CookieParser = require("cookie-parser");

dotenv.config();
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("connected to MongoDB")
}).catch((err)=>{
    console.log(err)
});

 const app= express();
 app.use(express.json());

 app.use(CookieParser());

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);

 app.listen(3000 ,()=>{
    console.log("Server is running on port :3000")
 })

//middlewares
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    }
    );
});