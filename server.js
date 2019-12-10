'use strict';

const express = require('express')
require('dotenv').config();
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());

app.get('/location', (req, res) => {
    let city = req.query.data;

    let locationObj = searchLatToLong(city);

    res.send(locationObj);
})

function searchLatToLong(city){
    const geoData = require('./data/geo.json');

    const geoDataResults = geoData.results[0];

    const locationObj = new Location(city, geoDataResults);

    return locationObj;
}

function Location(city, geoDataResults){
    this.search_query = city;
    this.formatted_query = geoDataResults.formatted_address;
    this.latitude = geoDataResults.geometry.location.lat;
    this.longitude = geoDataResults.location.lng;
}

app.get('*', (req, res) => {
    res.status(404).send('Page not found');
})

app.listen(PORT, () => console.log(`listening on port ${PORT}!`))