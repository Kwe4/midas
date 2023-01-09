const express = require('express');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
name : {
    type: String
}, 
email : {
    type: String
},
role : {
    type: String,
    enum: ['admin', 'accountant', 'super-admin'] 
},

password: {
    type: String,
    required: true
},

date : {
    type: Date,
    default: Date.now
}

}); 

module.exports = mongoose.model('User', userSchema);