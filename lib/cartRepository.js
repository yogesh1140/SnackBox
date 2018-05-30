var mongoose = require('mongoose')
var cartModel = require('../models/cart.model') 
class CartRepository {
    
    getCartItems(user, callback) {
        console.log('*** CartRepository.getCartItems');

        cartModel.find({'user': user},{'cartItems':1, '_id':0}, (err, cart) => {
                if (err) { 
                    console.log(`*** CartRepository.getCartItems error: ${err}`); 
                    return callback(err); 
                }
            // console.log('cart',cart)
                callback(null,  cart );
            });

    
    }

    removeFromCart(user, cartItem, callback) { 
        console.log('*** CartRepository.removeFrom');
        // console.log('item: ',cartItem)
        if(cartItem.itemType !== "ALL"){
        cartModel.update( 
            { user: user },
            { $pull: { cartItems : {
                        itemType:  cartItem.itemType,
                        size: cartItem.size,
                        itemName: cartItem.itemName 
                        } 
                } 
            },
            { safe: true },(err) => {
                if (err) { 
                    console.log(`*** CartRepository.addToCart error: ${err}`); 
                    return callback(err); 
                }
                callback(null)
            });
        }
        else{
            cartModel.update( 
                { user: user },
                { cartItems : 
                    [] 
                },
                { safe: true },(err) => {
                    if (err) { 
                        console.log(`*** CartRepository.addToCart error: ${err}`); 
                        return callback(err); 
                    }
                    callback(null)
                });
        }
    }
    addToCart(user, cartItem, callback) {
        console.log('*** CartRepository.addToCart');
        // Alternative
        // cartModel.findOneAndUpdate({ user: user },
        //     {$push: {cartItems: cartItem}},
        // {safe: true , new : false},
        // function(err, model) {
        //     if (err) { 
        //                     console.log(`*** CartRepository.addToCart error: ${err}`); 
        //                     return callback(err); 
        //                 }
        //                 callback(null);
        // })

        // console.log(cartItem)

        
cartModel.aggregate(
    { $match : {
        user:user,
        'cartItems.itemType': cartItem.itemType,
        'cartItems.size': cartItem.size,
        'cartItems.itemName': cartItem.itemName
    }},
    { $unwind : "$cartItems" },
    { $match : {
        'cartItems.itemType': cartItem.itemType,
        'cartItems.size': cartItem.size,
        'cartItems.itemName': cartItem.itemName
    }}
  

        // cartModel.find({
        //     user:user,
        //     'cartItems.itemType': cartItem.itemType,
        //     'cartItems.size': cartItem.size,
        //     'cartItems.itemName': cartItem.itemName
        // },{'_id':0, 'cartItems.$':1}
        , (err, item) => {
            if (err) { 
                console.log(`*** CartRepository.getCartItems error: ${err}`); 
                return callback(err); 
            }
             console.log('search: ',item)
            if(!item[0]){
               // console.log('not found')
                cartModel.update( { user: user }, 
                    { $push: { 
                        cartItems: cartItem 
                    } 
                },(err) => {
                    if (err) { 
                        console.log(`*** CartRepository.addToCart error: ${err}`); 
                        return callback(err); 
                    }
                    callback(null);
                })
            }
            else{
                // console.log('found',item[0].cartItems[0].quantity)
                // console.log('found')
                cartModel.update(
                    {
                      user:user,
                      cartItems: { $elemMatch: { itemType: cartItem.itemType , itemName: cartItem.itemName, size: cartItem.size  } }
                    },
                    { $set: { "cartItems.$.quantity" : parseInt(item[0].cartItems.quantity) + parseInt( cartItem.quantity)      }
                    },(err) => {
                        if (err) { 
                            console.log(`*** CartRepository.addToCart error: ${err}`); 
                            return callback(err); 
                        }
                        callback(null);
                    }
                 )
            }

            
           
        })
        
     }
}
module.exports = new CartRepository()