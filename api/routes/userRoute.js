const express = require("express");
const {  test, updateUser, deleteUser } =require("../controllers/userController.js");
const { verifyToken } =require ('../utils/verifyUser.js');




const route =express.Router();

route.get('/test', test);
route.post('/update/:id', verifyToken, updateUser)
route.delete('/delete/:id', verifyToken, deleteUser)

module.exports = route;