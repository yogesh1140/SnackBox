const ordersRepo = require('../../../lib/ordersRepository'),
util = require('util');

class OrdersController {

constructor(router) {
    
  router.delete('/:orderId', this.deleteOrder.bind(this));
  router.get('/:user', this.getOrders.bind(this));
  router.post('/', this.placeOrder.bind(this));
  router.put('/', this.updateOrder.bind(this));
//   router.put('/add', this.addToCart.bind(this));
//   router.put('/delete', this.removeFromCart.bind(this));
}
getOrders(req, res) {
    console.log('*** getOrders');
    const user = req.params.user;
    // console.log('user', user);
    ordersRepo.getOrders(user, (err, data) => {
        if (err) {
            console.log('*** getOrders error: ' + util.inspect(err));
            res.json(null);
        } else {
            console.log('*** getOrders ok');
            res.json(data);
        }
    });
  }
  placeOrder(req, res){
    console.log('*** placeOrder');
    const user = req.body.user;
    const items = req.body.items;
    // console.log('user', user);
    ordersRepo.placeOrder(items, user, (err, data) => {
        if (err) {
            console.log('*** placeOrder error: ' + util.inspect(err));
            res.json(null);
        } else {
            console.log('*** placeOrder ok');
            res.json(data);
        }
       
    });
  }
  deleteOrder(req, res) {
    console.log('*** deleteOrder');
    const user = req.params.orderId;
    // console.log('user', user);
    ordersRepo.deleteOrder(user, (err) => {
        if (err) {
            console.log('*** deleteOrder error: ' + util.inspect(err));
            
        } else {
            console.log('*** deleteOrder ok');
            // res.json(data[0].items);
        }
        res.json(null);
    });
  }
  updateOrder(req, res) {
    console.log('*** updateOrder');
    const orderId = req.body.orderId;
    const items = req.body.items;
    // console.log('user', user);
    ordersRepo.updateOrder(orderId, items, (err) => {
        if (err) {
            console.log('*** updateOrder error: ' + util.inspect(err));
            
        } else {
            console.log('*** updateOrder ok');
            // res.json(data[0].items);
        }
        res.json(null);
    });
  }
}
module.exports = OrdersController;