const express = require('express');
const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
name : {
    type: String
}, 
salary : {
    type: Number
},
role : {
    type: String 
},
bank: {
    type: String 
},

date : {
    type: Date,
    default: Date.now 
} }); 

module.exports = mongoose.model('Staff', staffSchema);