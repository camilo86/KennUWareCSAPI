const productRouter = require('./routers/product');
const express = require('express');
const mongoose = require('mongoose');
const db = require('./config');
const app = express();

// app settings
app.use(express.json());


app.use('/api/products', productRouter);

app.listen(process.env.PORT);

module.exports = { app, db };
