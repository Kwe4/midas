const express = require('express');
const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
title: {
    type: String
}, 
value : {
    type: Number
},
description : {
    type: String
},
lastupdated: {
    type: Date,
    default: Date.now
}

}); 

module.exports = mongoose.model('Asset', assetSchema);