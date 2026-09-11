const express = require("express");
const {  test, updateUser, deleteUser,getUserListings,getUser } =require("../controllers/userController.js");
const { verifyToken } =require ('../utils/verifyUser.js');




const route =express.Router();

route.get('/test', test);
route.post('/update/:id', verifyToken, updateUser)
route.delete('/delete/:id', verifyToken, deleteUser)
route.get('/listings/:id', verifyToken, getUserListings)
route.get('/:id', verifyToken, getUser)

module.exports = route;