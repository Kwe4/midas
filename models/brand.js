const express = require('express');
const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
brand_name : {
    type: String
}, 
description : {
    type: String
},
}); 

module.exports = mongoose.model('Brand', brandSchema);