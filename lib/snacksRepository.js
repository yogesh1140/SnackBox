var mongoose = require('mongoose')
var snacksListModel = require('../models/snacksList.model') 
class SnacksRepository {
    
        // get snacks menu
        getMenu(callback) {
            console.log('*** SnacksRepository.getMenu');
            snacksListModel.count((err, menuCount) => {
                var count = menuCount;
                console.log(`Menu count: ${count}`);
    
                snacksListModel.find({},{ _id:0}, (err, menu) => {
                    if (err) { 
                        console.log(`*** SnacksRepository.getMenu error: ${err}`); 
                        return callback(err); 
                    }
                    callback(null, {
                        count: count,
                        snacksMenu: menu
                    });
                });
    
            });
        }

        // gets snacks for given snackstype
        getSnacks(snacksType, callback) {
            console.log('*** SnacksRepository.getSnacks');
                snacksListModel.find({'snacksType': snacksType},{'snacks':1, _id:1}, (err, snacks) => {
                    if (err) { 
                        console.log(`*** SnacksRepository.getSnacks error: ${err}`); 
                        return callback(err); 
                    }
                    callback(null, {
                        snacks: snacks.map((sn) => {
                            // console.log(sn.snacks)
                            return sn.snacks
                        })
                    });
                });
        }
    }
    
module.exports = new SnacksRepository();