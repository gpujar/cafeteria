'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

  var itemModel = new Schema({
    name: {
        type: String, trim: true
    },
    description: {
        type: String, default: 'Item Description'
    },
    imageUrl: {
        type: String, trim: true
    },
    price: {
        type: Number
    },
    isVeg: {
        type: Boolean, default: true
    },
    category: {
        type: String, enum: ['breakfast','lunch','snacks'], default: 'lunch', trim: true
    },
    servedOnMonday: {
        type: Boolean, default: false
    },
    servedOnTuesday: {
        type: Boolean, default: false
    },
    servedOnWednesday: {
        type: Boolean, default: false
    },
    servedOnThursday: {
        type: Boolean, default: false
    },
    servedOnFriday: {
        type: Boolean, default: false
    }
});

module.exports = mongoose.model('Item', itemModel);
