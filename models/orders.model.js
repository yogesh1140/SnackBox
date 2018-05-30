var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var OrderItemSchema = new Schema({
    itemType: {type: String}, 
    itemName: {type: String},
    size: {type: String},
    price: {type: Number},
    quantity: {type: Number},
});
var OrdersSchema = new Schema({
    id: {type: Number},
    items: [OrderItemSchema],
    orderDate: {type: Date},
    status: {type: String},
    user: {type: String}
}, { 
    collection: 'orders' , 
    versionKey: false
});



module.exports = mongoose.model('orders', OrdersSchema);


