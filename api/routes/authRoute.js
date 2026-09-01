const express = require("express");
const { signup } = require("../controllers/authController.js");

const route = express.Router();

route.post("/signup",signup );

module.exports = route;