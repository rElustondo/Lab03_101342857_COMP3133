const express = require('express');
const restaurantModel = require('../models/Restaurants');
const app = express();

//http://localhost:3000/restaurants
app.get('/restaurants',async (req,res)=>{
    try {
        const restaurants = await restaurantModel.find({});
        console.log(restaurants)
        res.status(200).send(restaurants);
      } catch (err) {
        res.status(500).send(err);
      }
})

// http://localhost:3000/restaurants/cuisine/Japanese
// http://localhost:3000/restaurants/cuisine/Bakery
// http://localhost:3000/restaurants/cuisine/Italian

app.get('/restaurants/cuisine/:cuisine',async (req,res)=>{
    try {
        const restaurants = await restaurantModel.find({cuisine:req.params.cuisine});
        console.log(restaurants)
        res.status(200).send(restaurants);
      } catch (err) {
        res.status(500).send(err);
      }
})
module.exports = app