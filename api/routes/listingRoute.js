const express = require('express');
const { verifyToken } = require('../utils/verifyUser.js');
const {createListing, deleteListing, updateListing, getListing, getListings}=require('../controllers/listingController.js');

const route = express.Router();

route.post('/create', verifyToken, createListing);
route.delete('/delete/:id', verifyToken, deleteListing);
route.post('/update/:id', verifyToken, updateListing);
route.get('/get/:id', getListing);
route.get('/get', getListings);

module.exports = route;