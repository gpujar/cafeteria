'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Bot = mongoose.model('Item'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

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

function HandleShowMenu(result, response) {
	var query = {};
	const {
	date,
	ItemDetails,
	Menu,
	MenuType,
	MenuCategory
	} = result.parameters;

	console.log('HandleShowMenu: Menu Type is '+ MenuType);
	console.log("HandleShowMenu: MenuCategory is "+MenuCategory);
	/* Determine today's day */
	var date_today = new Date();
	var days = ['sunday', 'monday', 'tuesday','wednesday','thursday','friday','saturday'];
	var today = days[date_today.getDay()];
	console.log("Todays day is "+today);
	query.category = MenuCategory.toLowerCase();
	console.log("Query menucategory is "+query.category);

	if (!isEmptyObject(MenuType)) {
    if (MenuType.toLowerCase() == 'veg') {
      query.isVeg = true;
    }
    else {
      query.isVeg = false;
    }
	console.log("Query: isVeg is "+query.isVeg);
	}
	else {
		console.log("MenuType is not mentioned, consider both Veg and NonVeg");
	}

	if(today == 'monday'){
		query.servedOnMonday = true;
	}else if(today == 'tuesday'){
	    query.servedOnTuesday = true;
	}else if(today == 'wednesday'){
	    query.servedOnWednesday = true;
	}else if(today == 'thursday'){
	    query.servedOnThursday = true;
	}else if(today == 'friday'){
	    query.servedOnFriday = true;
	}

	/* Find the menu with the request parsed */
	Bot.find(query,function(err,items){
	if(err){
		response.status(500).send(err);
	}
	else{
		var speech = [];

		if (!isEmptyObject(items)){
			speech += 'Todays menu for '+query.category +': \n';
		    for (var index in items){
			  console.log(''+index+ ' '+items[index].name);
			  speech += items[index].name;
			  speech += '\n';
			}
		}
		else {
			speech += 'Sorry, No items for '+query.category +' today';
		}

		response.json({
		  speech: speech,
		  displayText: speech,
		  source: 'spark'
		});
	}
	});
}

function DescribeMenuItem(result, response) {
  const {
      date,
      ItemDetails,
      MenuItem,
    } = result.parameters;

	var query = {};
	query.name = {$regex: MenuItem, $options: 'i'};

    Bot.find(query,function(err,items){
      if(err){
          response.status(500).send(err);
      }
      else{
        console.log("Item Details: "+items);
       console.log("Item Name: "+items[0].name);
        console.log("Item Description: "+items[0].description);
        console.log("Items Image URL: "+items[0].imageUrl);
        console.log("Items Price "+items[0].price);

        response.json({        
        messages: [{"type":3,"imageUrl": items[0].imageUrl},
                  {"type":0,"speech": "Here are the details of "+items[0].name +": " +items[0].description}
                  ],
        source: 'spark'
      });
      }
    });
}

function OrderMenuItem(result, response) {
var speech = {};
   const {
      date,      
      MenuItem,
      Order
    } = result.parameters;

    var token = Math.floor((Math.random() * 100 ));
    console.log("token generated is "+token);

    speech = 'Your order is confirmed: Your token number '+token;
    speech += '\n Enjoy your food!'
    response.json({
      speech: speech,
      source: 'spark'
    });
}

function isEmptyObject(obj) {
  return !Object.keys(obj).length;
}

exports.read = function(req,res) {
	console.log("Read is called");
	var bot = req.bot ? req.bot.toJSON() : {};
	var botMenu = req.bot ? req.bot : {};
	bot.isCurrentUserOwner = !!(req.user && bot.user && bot.user._id.toString() === req.user._id.toString());

	let {
	status,
	result,
	}= req.body;

	console.log("Read: Action is "+result.action); 
	switch(result.action) {
		case 'show-menu':
				HandleShowMenu(result, res);
		break;
		
		case 'describe-menu':
				DescribeMenuItem(result, res);
		break;
		
		case 'order-menu':
				OrderMenuItem(result, res);
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
 */
exports.count = function (req, res) {
  // convert mongoose document to JSON
  var bot = req.bot ? req.bot.toJSON() : {};
  var botMenu = req.bot ? req.bot : {};
  bot.isCurrentUserOwner = !!(req.user && bot.user && bot.user._id.toString() === req.user._id.toString());
  var request = require("request");
  var options = { method: 'GET',
  url: 'https://devnetapi.cisco.com/sandbox/mse/api/location/v2/clients/count',
  headers:
   { 'postman-token': '9988229e-9ae7-21e7-406d-612f5ad6949d',
     'cache-control': 'no-cache',
     authorization: 'Basic bGVhcm5pbmc6bGVhcm5pbmc=' } };
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    console.log(body);
    var resp = JSON.parse(body);
    console.log('Giri :: '+resp.count);
    console.log('Giri :: '+resp.deviceType);
     res.json({
     //   speech: resp.count,
     //   displayText: resp.count,
        messages: [{"type":3,"imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Youngkitten.JPG/193px-Youngkitten.JPG"},
                  {"type":0,"speech": 'Head Count : '+resp.count}
                  ],
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
