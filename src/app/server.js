require('dotenv').config({
    path: '.env',
});

const express = require('express');
const cors = require('cors');
const routes = require('./routes');

require('../app');

const app = express();

app.use(cors);
app.use(express.json());
app.use(routes);


app.listen(process.env.PORT || 3333);
