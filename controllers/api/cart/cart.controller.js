const cartRepo = require('../../../lib/cartRepository'),
util = require('util');

class CartController {

constructor(router) {
  
  router.post('/', this.getCartItems.bind(this));
  router.put('/add', this.addToCart.bind(this));
  router.put('/delete', this.removeFromCart.bind(this));
}

getCartItems(req, res) {
    console.log('*** getCartItems');
    const user = req.body.user;
    // console.log('user', user);
    cartRepo.getCartItems(user, (err, data) => {
        if (err) {
            console.log('*** getCartItems error: ' + util.inspect(err));
            res.json(null);
        } else {
            console.log('*** getCartItems ok');
            res.json(data[0].cartItems);
        }
    });
  }
  addToCart(req, res) {
    // itemType: string, itemUrl: string, item: string, size: string, price: number, quantity: number, user: string
    console.log('*** addToCart');
    const user = req.body.user;
    const cartItem = req.body.cartItem;
    
    // console.log('user: ', user);
    // console.log('item: ', cartItem);
    cartRepo.addToCart(user, cartItem, (err) => {
        if (err) {
            console.log('*** addToCart error: ' + util.inspect(err));
            res.json(null);
        } else {
            console.log('*** addToCart ok');
            res.json({});
        }
    });
  }
  removeFromCart(req, res) {
    // itemType: string, itemUrl: string, item: string, size: string, price: number, quantity: number, user: string
    console.log('*** removeFromCart');
    const user = req.body.user;
    const cartItem = req.body.cartItem;
    
    // console.log('user: ', user);
    // console.log('item: ', cartItem);
    cartRepo.removeFromCart(user, cartItem, (err) => {
        if (err) {
            console.log('*** removeFromCart error: ' + util.inspect(err));
            res.json(null);
        } else {
            console.log('*** removeFromCart ok');
            res.json({});
        }
    });
  }

}


module.exports = CartController;