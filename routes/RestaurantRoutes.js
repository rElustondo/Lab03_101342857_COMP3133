const express = require('express');
const restaurantModel = require('../models/Restaurants');
const app = express();

//http://localhost:3000/restaurants
// http://localhost:3000/restaurants?sortBy=ASC
// http://localhost:3000/restaurants?sortBy=DESC

app.get('/restaurants',async (req,res)=>{
    if(req.query.sortBy){
        const sortBy = req.query.sortBy
        let intValue
        if(sortBy == "ASC"){
            intValue = 1
        }
        else if (sortBy == "DESC"){
            intValue = -1
        }
        const restaurants = await restaurantModel.find({}).sort({'name': intValue});
        try {
            if(restaurants.length != 0){
            res.send(restaurants);
            }else{
            res.send(JSON.stringify({status:false, message: "No data found"}))
            }
        } catch (err) {
            res.status(500).send(err);
        }           
    }
    else{
        try {
            const restaurants = await restaurantModel.find({});
            res.status(200).send(restaurants);
          } catch (err) {
            res.status(500).send(err);
          }
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

//http://localhost:3000/restaurants/Delicatessen

app.get('/restaurants/:cuisine',async (req,res)=>{
    try {
        const restaurants = await restaurantModel.find({})
        .where('cuisine').equals(req.params.cuisine)
        .where('city').ne('Brooklyn');
        
        console.log(restaurants)
        res.status(200).send(restaurants);
      } catch (err) {
        res.status(500).send(err);
      }
})

module.exports = app