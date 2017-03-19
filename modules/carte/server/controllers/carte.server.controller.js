'use strict';

var path = require('path'),
  mongoose = require('mongoose'),
  Item = mongoose.model('Item');

exports.get = function(req,res){
            //var query = req.query;
            var query = {};
            console.log("Giri ::  req.query.day  "+req.query.day)
            // set query for day
            if(req.query.day){
                var day = req.query.day.toLowerCase();
                if(day == 'monday'){
                    query.servedOnMonday = true;
                }else if(day == 'tuesday'){
                    query.servedOnTuesday = true;
                }else if(day == 'wednesday'){
                    query.servedOnWednesday = true;
                }else if(day == 'thursday'){
                    query.servedOnThursday = true;
                }else if(day == 'friday'){
                    query.servedOnFriday = true;
                }
            }

            if(req.query.servedOnMonday)
                query.servedOnMonday = (req.query.servedOnMonday == 'true');

            if(req.query.servedOnTuesday)
                query.servedOnTuesday = (req.query.servedOnTuesday == 'true');

            if(req.query.servedOnWednesday)
                query.servedOnWednesday = (req.query.servedOnWednesday == 'true');

            if(req.query.servedOnThursday)
                query.servedOnThursday = (req.query.servedOnThursday == 'true');

            if(req.query.servedOnFriday)
                query.servedOnFriday = (req.query.servedOnFriday == 'true');

            // Set query for type
            if(req.query.isVeg)
                query.isVeg = (req.query.isVeg == 'true');

            //Set query for category
            if(req.query.category)
                query.category = req.query.category.toLowerCase();

            Item.find(query,function(err,items){
                if(err){
                    res.status(500).send(err);
                }
                else{
                    var returnItems = [];
                    items.forEach(function(element,index,array){
                        var newItem = element.toJSON();
                        newItem.links = {};
                        newItem.links.self = 'http://' + req.headers.host + '/api/items/' + newItem._id;
                        returnItems.push(newItem);
                    });
                    res.json(returnItems);
                }
            });
        };

exports.post = function(req,res){
            var item = new Item(req.body);
            item.save();
            res.status(201);
            res.send(item);
        };

exports.preId = function(req, res, next){
        Item.findById(req.params.itemId,function(err,item){
                if(err) {
                    res.status(500).send(err);
                }
                else if(item) {
                    req.item = item;
                    next();
                }
                else {
                    res.status(404).send('No item found');
                }
            });
    };

exports.getId = function(req,res){
            var returnItem = req.item.toJSON();
            returnItem.links = {};
            returnItem.links.filterByIsVeg = 'http://' + req.headers.host + '/api/items?isVeg =' + returnItem.isVeg;
            res.json(returnItem);
        };

exports.putId = function(req,res){
            req.item.name = req.body.name;
            req.item.description = req.body.description;
            req.item.imageUrl = req.body.imageUrl;
            req.item.price = req.body.price;
            req.item.isVeg = req.body.isVeg;
            req.item.category = req.body.category;
            req.item.servedOnMonday = req.body.servedOnMonday;
            req.item.servedOnTuesday = req.body.servedOnTuesday;
            req.item.servedOnWednesday = req.body.servedOnWednesday;
            req.item.servedOnThursday = req.body.servedOnThursday;
            req.item.servedOnFriday = req.body.servedOnFriday;

            req.item.save(function(err){
                if(err){
                    res.status(500).send(err);
                }
                else {
                    res.json(req.item);
                }
            });
        };

exports.patchId = function(req,res){

            if(req.body._id){
                delete req.body._id;
            }

            for(var p in req.body){
                req.item[p] = req.body[p];
            }

            req.item.save(function(err){
                if(err){
                    res.status(500).send(err);
                }
                else {
                    res.json(req.item);
                }
            });
        };

exports.deleteId = function(req,res){
            req.item.remove(function(err){
                if(err){
                    res.status(500).send(err);
                }
                else {
                    res.status(204).send("Items Removed");
                }
            });
        };

exports.createMenu = function(req,res){
        //  const util = require('util');
       //   console.log(util.inspect(req.body, {depth: null}));
          for(var i=0; i < req.body.length; i++){
            var item = new Item(req.body[i]);
            var category = item.category;
            item.isNew = false;
            item.save();
          }
          res.status(201);
} ;
