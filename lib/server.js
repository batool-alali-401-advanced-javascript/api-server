'use strict';
require('dotenv').config();

const express = require('express');
const app=express();

const time = require('../middleware/timestamp.js');
const logReq = require('../middleware/logger.js');
const E404 = require('../middleware/404.js');
const E500 = require('../middleware/500.js');


app.use(express.json());
app.use(time);
app.use(logReq);

//Categories..............................................................

let dbCategories = [];

app.get('/api/v1/categories',time, (req, res) => {
  let count = dbCategories.length;
  let results = dbCategories;
  res.json({ count, results });
});

app.get('/api/v1/categories/:id',time, (req, res) => {
  let id = req.params.id;
  let record = dbCategories.filter(record => record.id == id);
  res.json(record);
}); 

app.post('/api/v1/categories',time, (req, res) => {
  let { name } = req.body;
  let record = { name };
  record.id = dbCategories.length + 1;
  dbCategories.push(record);
  res.json(record);
}); 

app.put('/api/v1/categories/:id',time, (req, res) => {
  let newId = req.params.id;
  let { name, id } = req.body;
  let recordUpdate = { name, id };
  dbCategories = dbCategories.map((record) => (record.id == newId) ? recordUpdate : record);
  res.json(recordUpdate);
}); 

app.delete('/api/v1/categories/:id',time, (req, res) => {
  let idDelete = req.params.id;
  dbCategories = dbCategories.filter(record => record.id != idDelete);
  res.json({ message: 'Deleted' });
});

//products..................................................................
let dbProducts=[];

app.get('/api/v1/products',time,(req, res ) => {
  let count = dbProducts.length;
  let results = dbProducts;
  res.json({ count, results });
}); 

app.get('/api/v1/products/:id',time, (req, res ) => {
  let id = req.params.id;
  let record = dbProducts.filter(record => record.id === parseInt(id));
  res.json(record);
}); 

app.post('/api/v1/products',time, (req, res ) => {
  let { name } = req.body;
  let record = { name };
  record.id = dbProducts.length + 1;
  dbProducts.push(record);
  res.json(record);
});

app.put('/api/v1/products/:id',time, (req, res ) => {
  let idUpdate = req.params.id;
  let { name, id } = req.body;
  let recordUpdate = { name, id };
  dbProducts = dbProducts.map((record) => (record.id === parseInt(idUpdate)) ? recordUpdate : record);
  res.json(recordUpdate);
});

app.delete('/api/v1/products/:id', time,(req, res ) => {
  let idDelete = req.params.id;
  dbProducts = dbProducts.filter(record => record.id !== parseInt(idDelete));
  res.json({ message: ' Item Deleted' });
});

app.use(E404);
app.use(E500);


module.exports = {
  server: app,
  start: port => {
    let PORT = port || process.env.PORT || 3000;
    app.listen(PORT, () => console.log(` listening from port ${PORT}`));
  },
};

