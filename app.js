const productRouter = require('./routers/product');
const express = require('express');
const mongoose = require('mongoose');
const errors = require('http-errors');
const db = require('./config');
const app = express();

// app settings
app.use(express.json());


app.use('/api/products', productRouter);

app.use((req, res, next) => {
  return next(new errors.NotFound('the enpoint you tried to access does not exist'));
});

app.use((error,req, res, next) => {
  return res.status(error.status || 500).json({ message: (error.message || 'something is not right') });
});

app.listen(process.env.PORT);
module.exports = { app, db };
