'use strict';

const express = require('express')
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 3001;

// app.get('/', (req, res) => res.send('Hello World!'))
// app.get('/bananas', (req, res) => {
//     res.send('I like me some bananas');
//     //res.render('I like me some bananas');
// })
app.get('*', (req, res) => {
    res.status(404).send('Page not found');
})

app.listen(PORT, () => console.log(`listening on port ${PORT}!`))