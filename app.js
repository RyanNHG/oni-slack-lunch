var express = require('express');
var app = express();

var restaurants = ['Jimmy Johns', 'Monks', 'Boars Head', 'Chipotle'];

var getRandomRestaurant = function(){

  if(restaurants.length == 0)
    return 'No restaurants available...';

  var index = parseInt(Math.random() * restaurants.length)
  return restaurants[index];

};

app.post('/', function(req, res){

  var query = req.query;
  var restaurant = query.restaurant;
  
  if(!restaurant)
    res.status(400).json('Give me a restaurant to add!');
  else
  {
    restaurants.push(restaurant);
    res.status(201).json('Added thing!');
  }

});

app.delete('/', function(req, res){
  var query = req.query;
  var restaurant = query.restaurant;
  if(!restaurant)
      res.status(400).json('Give me a restaurant to remove!');
  else
  {
    var index = restaurants.indexOf(restaurant);
    if(index == -1)
      res.status(400).json('Couldn\'t find "' + restaurant + '"');
    else
    {
      restaurants.splice(index,1);
      res.status(201).json('Removed thing!');
    }
  }

});

app.get('/', function(req, res){
  console.log(restaurants);
  res.status(200).json(getRandomRestaurant());
});

app.listen(process.env.PORT || 8080, function(){
  console.log('app ready!');
});
