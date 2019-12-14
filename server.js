'use strict';

const express = require('express');
//sets up express library for server
require('dotenv').config();

const cors = require('cors');
const superagent = require('superagent');

const app = express();
//talking about express library
const PORT = process.env.PORT || 3001;
app.use(cors());
//use cors as policemen
// const pg = require('pg');
// const client = new pg.Client(process.env.DATABASE_URL);
// client.on('error', err => console.error(err));

// client.connect()
//     .then(() => {
//     app.listen(PORT, () => console.log(`listening on port ${PORT}!`))
// }

// app.get('/adds', (req, res) => {
//     let firstName = req.query.first;
//     let lastName = req.query.last;

//     client
// })

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
})

function Location(city, cityData){
    this.search_query = city;
    this.formatted_query = cityData.formatted_address;
    this.latitude = cityData.geometry.location.lat;
    this.longitude = cityData.geometry.location.lng;
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
// }

// app.get('/weather', (req, res) => {

//     // /weather?search_query=sydney&latitude=-33.61823&longitude=18.39123&

//     let URL2 = `https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/${req.query.data.latitude},${req.query.data.longitude} `;
// });


//     superagent.get(URL2).then( weatherData => {
//         let responseArray = [];

    
//         // res.send(new Weather(weather, weatherData.body));
//         // console.log('SUMMARY', summary);
//         // console.log('TIME',time)
        
        
//             // let testResponse = [
//     //     {
//     //       "forecast": "Partly cloudy until afternoon.",
//     //       "time": "Mon Jan 01 2001"
//     //     },
//     //     {
//     //       "forecast": "Mostly cloudy in the morning.",
//     //       "time": "Tue Jan 02 2001"
//     //     },
//     // ]
    
//     res.send(responseArray);

//     })
// });

// function Weather(data){
   
//     this.summary = data.summary;
//     this.time = data.time; 

// }

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
});

app.listen(PORT,  () => {
    console.log('APP IS RUNNNING ON PORT ', PORT);
});

// function errorHandler(error, request, response){
//     response.status(500).send('Internal Error');
// }

// app.use(errorHandler)
