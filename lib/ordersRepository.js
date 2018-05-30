var mongoose = require('mongoose')
var ordersModel = require('../models/orders.model') 
class OrdersRepository {
    
    getOrders(user, callback) {
        console.log('*** OrdersRepository.getOrders');
        ordersModel.find({'user': user},{
            '_id':0,
            'id':1,
            'items':1,
            'orderDate':1,
            'status':1
        }, (err, orders) => {
                if (err) { 
                    console.log(`*** OrdersRepository.getOrders error: ${err}`); 
                    return callback(err); 
                }
                callback(null,  orders );
            });

    
    }
    deleteOrder(orderId, callback) {
        ordersModel.findOneAndRemove({'id': orderId}, (err) => {
            if(err){
                console.log(`*** OrdersRepository.getOrders error: ${err}`)
                return callback(err); 
            }
            callback(null);
        })
    }
    placeOrder(items, user, callback) {
        var date = new Date()
        var nextId = 1
       // console.log(items)
        ordersModel.findOne({},{id:1,_id:0}).sort({id : -1}).limit(1).exec(function(err, maxResult){
            if (err) {return err;}
            if(maxResult)
            nextId = maxResult.id + 1
            const order = {id: nextId, items: items, orderDate: date.toLocaleDateString("en-in", {year: "numeric", month: "short",day: "numeric"}).replace("/\s/g",'-'), status:'In Progress', user: user}
            ordersModel.create(order, (err, order) => {
                    if(err){
                        console.log(`*** OrdersRepository.placeOrder error: ${err}`)
                        return callback(err); 
                    }
                    callback(null, order.id);

                })
            }); 
    }
    updateOrder(orderId, items, callback) {
        ordersModel.update( { id: orderId }, 
            {'$set': {
                items: items,
                }
            },(err) => {
                if (err) { 
                    console.log(`*** OrdersRepository.updateOrder error: ${err}`); 
                    return callback(err); 
                }
                callback(null);
            })
    }
}
module.exports = new OrdersRepository()