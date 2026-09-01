const express = require("express");
const { test } = require("../controllers/userController.js");


const route =express.Router();

route.get("/test",test);

module.exports = route;