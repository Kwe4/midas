const express = require('express');
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({

title : {
    type: String
}, 
brand : {
    type: String
},

type : {
    type: String 
},

amount : {
    type: Number,
}, 

notes: {
  type: String
},

date : {
    type: Date,
    default: Date.now
}
}); 



module.exports = mongoose.model('Transaction', transactionSchema);















