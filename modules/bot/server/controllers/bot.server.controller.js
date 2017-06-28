'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Bot = mongoose.model('Item'),
  request = require('request'),
  express = require('express'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  sparkMsgUrl = 'https://api.ciscospark.com/v1/messages',
  sparkRoomsUrl = 'https://api.ciscospark.com/v1/rooms',
  imageFile = 'https://s23.postimg.org/w3sambdfv/04_Norththali.png',
  botAccessToken = 'NWM2NWNkMjUtZjg0MC00NDZiLTkzNmMtN2QzZDAzYWU1NWU4MDVlNTUzZDktZTFj',
  auth = 'Bearer ' + botAccessToken;

/**
 * Create an article
 */
exports.create = function (req, res) {
  var bot = new Bot(req.body);
  bot.user = req.user;
  bot.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(bot);
    }
  });
};

function showMenu(result, response) {
  var query = {};
  var speech = [];
  const {
    date,
    Day,
    Menu,
    MenuType,
    MenuCategory
  } = result.parameters;

  console.log('showMenu: Menu Type is ' + MenuType);
  console.log('showMenu: MenuCategory is ' + MenuCategory);
  console.log('showMenu: Day mentioned is ' + Day);

  query.category = MenuCategory.toLowerCase();
  console.log('Query menucategory is ' + query.category);

  if (!isEmptyObject(MenuType)) {
    if (MenuType.toLowerCase() == 'veg') {
      query.isVeg = true;
    }
    else {
      query.isVeg = false;
    }
    console.log('Query: isVeg is ' + query.isVeg);
  } else {
    console.log('MenuType is not mentioned, consider both Veg and NonVeg');
  }

  var day;
  if (isEmptyObject(Day)) {
    /* Determine today's day */
    var date_today = new Date();
    var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    var today = days[date_today.getDay()];
    console.log('Todays day is ' + today);
    day = today;
  } else {
    day = Day;
  }

  if (day == 'monday') {
    query.servedOnMonday = true;
  } else if (day == 'tuesday') {
    query.servedOnTuesday = true;
  } else if (day == 'wednesday') {
    query.servedOnWednesday = true;
  } else if (day == 'thursday') {
    query.servedOnThursday = true;
  } else if (day == 'friday') {
    query.servedOnFriday = true;
  }

  if (day == 'saturday' || day == 'sunday') {
    speech += 'Hey, its a weekend! Its time to relax at home and not be in office :). We do not ' +
      'have anything for you today,sorry.'
    response.json({
      speech: speech,
      displayText: speech,
      source: 'spark'
    });
  } else {
    /* Find the menu with the request parsed */
    Bot.find(query, function (err, items) {
      if (err) {
        response.status(500).send(err);
      } else {
        if (!isEmptyObject(items)) {
          speech += ' Menu for ' + query.category + ' on ' + day + ': \n';
          for (var index in items) {
            console.log('' + index + ' ' + items[index].name);
            speech += items[index].name;
            speech += '\n';
          }
        } else {
          speech += 'Sorry, No items for ' + query.category + ' today';
        }
        response.json({
          speech: speech,
          displayText: speech,
          source: 'spark'
        });
      }
    });
  }
}

function describeMenuItem(result, response) {
  const {
    date,
    ItemDetails,
    MenuItem,
  } = result.parameters;

  var query = {};
  // var itemName = '/'+MenuItem + '/';
  query.name = {$regex: MenuItem, $options: 'i'};
  //query.name = new RegExp('^' + MenuItem + '$',"i");

  Bot.find(query, function (err, items) {
    if (err) {
      response.status(500).send(err);
    }
    else {
      console.log("Item Details: " + items);
      console.log("Item Name: " + items[0].name);
      console.log("Item Description: " + items[0].description);
      console.log("Items Image URL: " + items[0].imageUrl);
      console.log("Items Price " + items[0].price);
      console.log("Items is Veg? " + items[0].isVeg);

      var dishType = {};
      if (items[0].isVeg == true) {
        dishType = 'Veg';
      }
      else {
        dishType = 'Non Veg';
      }

      response.json({
        messages: [{"type": 3, "imageUrl": items[0].imageUrl},
          {
            "type": 0, "speech": "Here are the details of " + items[0].name + ": \n " + items[0].description
          + "\n" + " Price: " + items[0].price + " , Dish Type:  " + dishType
          }
        ],
        source: 'spark'
      });
    }
  });
}

function orderMenuItem(result, response) {
  var speech = {};
  const {
    date,
    MenuItem,
    Order
  } = result.parameters;

  var token = Math.floor((Math.random() * 100 ));
  console.log("token generated is " + token);

  speech = 'Your order is confirmed: Your token number ' + token;
  speech += '\n Enjoy your food!'
  response.json({
    speech: speech,
    source: 'spark'
  });
}

function isEmptyObject(obj) {
  return !Object.keys(obj).length;
}

exports.read = function (req, res) {
  console.log("Read is called");
  var bot = req.bot ? req.bot.toJSON() : {};
  var botMenu = req.bot ? req.bot : {};
  bot.isCurrentUserOwner = !!(req.user && bot.user && bot.user._id.toString() === req.user._id.toString());

  let {
    status,
    result,
  }= req.body;

  //console.log("Read: Action is "+result.action);
  switch (result.action) {
    case 'show-menu':
      showMenu(result, res);
      break;

    case 'describe-menu':
      describeMenuItem(result, res);
      break;

    case 'order-menu':
      orderMenuItem(result, res);
      break;

    case 'check-crowd':
      count(result, res);
      break;

    default:
      console.log("No action defined for this request");
      break;
  }
}


/**
 * Update an article
 */
exports.update = function (req, res) {
  var bot = req.bot;

  bot.title = req.body.title;
  bot.content = req.body.content;

  bot.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(bot);
    }
  });
};


/**
 * Traffic count
 *
 */
function count(result, res) {
  var request = require("request");
  var options = {
    method: 'GET',
    url: 'https://devnetapi.cisco.com/sandbox/mse/api/location/v2/clients/count',
    headers: {
      'postman-token': '9988229e-9ae7-21e7-406d-612f5ad6949d',
      'cache-control': 'no-cache',
      authorization: 'Basic bGVhcm5pbmc6bGVhcm5pbmc='
    }
  };
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    console.log(body);
    var resp = JSON.parse(body);
    var speech = {};
    console.log('HeadCount :: ' + resp.count);
    console.log('DeviceType :: ' + resp.deviceType);
    speech = "Head count right now in Cafeteria is " + resp.count;
    res.json({
      speech: speech,
      source: 'spark'
    });
  });

};

/**
 * Delete an article
 */
exports.delete = function (req, res) {
  var bot = req.bot;

  bot.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(bot);
    }
  });
};

/**
 * List of Articles
 */
exports.list = function (req, res) {
  Bot.find().sort('-created').populate('user', 'displayName').exec(function (err, bot) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(bot);
    }
  });
};

/**
 * bot middleware
 */
exports.botByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'bot is invalid'
    });
  }

  Bot.findById(id).populate('user', 'displayName').exec(function (err, bot) {
    if (err) {
      return next(err);
    } else if (!bot) {
      return res.status(404).send({
        message: 'No bot with that identifier has been found'
      });
    }
    req.bot = bot;
    next();
  });
};

exports.notify = function (req, res) {
  var notification = req.notification;
  console.log("response day :: " + req.body.day);
  console.log("response category :: " + req.body.category);
  //type = notification.type;
  notifyMenu(req, res);
};

function notifyMenu(req, res) {
  console.log('Notify menu...........  ');
  var query = {};
  query.name = {$regex: req.body.day + ' ' + req.body.category, $options: 'i'};
  Bot.find(query, function (err, items) {
    var message = 'Testing from web app ';
    if (err) {
      response.status(500).send(err);
    }
    else {
      console.log("Item Details: " + items);
      console.log("Item Name: " + items[0].name);
      console.log("Items Image URL: " + items[0].imageUrl);
      message = items[0].description;
      imageFile = items[0].imageUrl;

      request({
        url: sparkRoomsUrl,
        method: 'GET',
        headers: {'Authorization': auth, 'Content-Type': 'application/json'}
      }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          var rooms = JSON.parse(body);
          var numOfRooms = rooms.items.length;
          if (numOfRooms > 10) {
            numOfRooms = 10;
          }
          console.log(message);
          for (var i = 0; i < numOfRooms; i++) {
            var room = rooms.items[i];
            console.log('Name :: ' + room.title);
            request({
              url: sparkMsgUrl,
              method: 'POST',
              headers: {'Authorization': auth, 'Content-Type': 'application/json'},
              form: {'roomId': room.id, 'text': message, 'files': imageFile}
            }, function (error, response, body) {
              console.log('Call back.........response.statusCode ' + response.statusCode)
              if (!error && response.statusCode == 200) {
                // Print out the response body
                var bodyParse = JSON.parse(body);
                console.log(JSON.stringify(bodyParse, null, 4));
              } else if (error) {
                console.log('Error: ' + error);
              }
            });
          }
        } else if (error) {
          console.log('Error: ' + error);
        }
      });
      res.json({});

    }
  });


}
