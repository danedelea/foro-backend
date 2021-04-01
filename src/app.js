const express = require('express');
const morgan = require('morgan');
const cors = require("cors");
const config = require('./keys.js');
const path = require('path');

const app = express();

app.set('port', config.PORT);

app.use(cors({ origin: config.SERVER }));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/server/cards", require('./routes/cards.routes'));
app.use("/server/auth", require('./routes/auth.routes'));

app.use(express.static('public'));

module.exports = app;