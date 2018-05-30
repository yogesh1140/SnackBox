var mongoose = require('mongoose'),
Schema =  mongoose.Schema;
const availableSizesSchema =new Schema({
    size: {type: String},
    price: {type: Number}
})

const snackSchema = new Schema({
    id: {type: Number},
    name: {type: String},
    imageUrl: {type: String},
    availableSizes: [availableSizesSchema]
})

const snackListSchema = new Schema({
    snacksType: {type: String},
    imageUrl: {type: String},
    snacks: [snackSchema]
    }, 
    { 
        collection: 'snacksList' , 
        versionKey: false
    })






module.exports = mongoose.model('snacksList', snackListSchema)