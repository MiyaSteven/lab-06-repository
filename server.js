'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const superagent = require('superagent');

const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());

//Routes
app.get('/location', (req, res) => {
    let city = req.query.data;
    let URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${req.query.data}&key=${process.env.GEOCODE_API_KEY}`;

    superagent.get(URL).then(cityData => {
        // let testLocation = new Location(city, cityData.body.results[0]);
        // let newLocation = {
        //     "search_query": city,
        //     "formatted_query": cityData.body.results[0].formatted_address,
        //     "latitude": cityData.body.results[0].geometry.location.lat,
        //     "longitude": cityData.body.results[0].geometry.location.lng,
        // }
        res.send(new Location(city, cityData.body.results[0]));
    })
});

function Location(city, cityData){

    this.search_query = city;
    this.formatted_query = cityData.formatted_address;
    this.latitude = cityData.geometry.location.lat;
    this.longitude = cityData.geometry.location.lng;
}

app.get('/weather', (req, res) => {
    let weather = req.query.data2;
    let URL2 = `https://maps.googleapis.com/maps/api/geocode/json?address=${req.query.data2}&key=${process.env.GEOCODE_API_KEY}`;

    superagent.get(URL2).then(weatherData => {
        res.send(new Weather(weather, weatherData.body));
    })
});

function Weather(weather, weatherData){
    this.timezone = weather;
    this.daily = weatherData.daily.data[0].summary;
}

// function searchLatToLong(city){
//     const geoData = require('./data/geo.json');

//     const geoDataResults = geoData.results[0];

//     const newLocation = new Location(city, geoDataResults);
//     const newLocation = {
//         "search_query": city,
//         "formatted_query": geoDataResults.formatted_address,
//         "latitude": geoDataResults.geometry.location.lat,
//         "longitude": geoDataResults.geometry.location.lng
//     }

//     return newLocation;
// }

// function searchWeather(weather){
//     const darkSkyData = require('./data/geo.json');

//     const darkSkyResults = darkSkyData.results[0];

//     const newWeather = new Weather(weather, darkSkyResults);

//     return newWeather;
// }

// function Weather(weather, data2){
//     //will add later today
// }

app.get('*', (req, res) => {
    res.status(404).send('Page not found');
})

app.listen(PORT, () => console.log(`listening on port ${PORT}!`))