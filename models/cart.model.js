var mongoose = require('mongoose'),
     Schema = mongoose.Schema;

var CartItemsSchema = new Schema({
    itemType: {type: String},
    itemUrl: {type: String},
    size: {type: String},
    itemName: {type: String},
    price: {type: String},
    quantity: {type: Number}
});


var CartSchema = new Schema({
    user: String,
    cartItems: [CartItemsSchema]
} ,{ 
    collection: 'cart', 
    versionKey: false
});


module.exports = mongoose.model('cart', CartSchema);