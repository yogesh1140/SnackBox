 const snacksRepo = require('../../../lib/snacksRepository'),
// statesRepo = require('../../../lib/statesRepository'),
util = require('util');

class SnacksController {

constructor(router) {
  
  router.get('/', this.getMenu.bind(this));
  router.get('/:snacksType', this.getSnacks.bind(this));
}

init(req, res){
    // console.log('init')
    res.send('api works')
}
getMenu(req, res) {
  console.log('*** getMenu');
  snacksRepo.getMenu((err, data) => {
      if (err) {
          console.log('*** getMenu error: ' + util.inspect(err));
          res.json(null);
      } else {
          console.log('*** getMenu ok');
          res.json(data.snacksMenu);
      }
  });
}
getSnacks(req, res) {
    console.log('*** getSnacks');
    const snacksType = req.params.snacksType;
    console.log(snacksType);
    snacksRepo.getSnacks(snacksType, (err, data) => {
        if (err) {
            console.log('*** getSnacks error: ' + util.inspect(err));
            res.json(null);
        } else {
            console.log('*** getSnacks ok');
            // console.log(data.snacks[0])
            res.json(data.snacks[0]);
        }
    });
  }
}

module.exports = SnacksController;