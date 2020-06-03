'use strict';

const express = require('express');
const router = express.Router();

const categories = require('../models/categories-mod/categories-model.js');
const products = require('../models/products-mod/products-model.js');




function getModel(req,res,next){
  let model = req.params.model;
  // console.log(model);
  switch (model) {
  case 'categories':
    req.model = categories;
    next();
    return;
  case 'products':
    req.model = products;
    next();
    return;
  default:
    next('invalid model');
    return;
  }
}
router.param('model', getModel);
router.get('/:model',handelGetAll);
router.post('/:model',handelPost);
router.get('/:model/:id',handelGetOne);
router.put('/:model/:id',handelUpdate);
router.delete('/:model/:id',handelDelete);


function handelGetAll(req,res,next){
  // console.log('hi');
  req.model.get()
    .then(results=>{
      let count = results.length;
      res.json({count,results});
    }).catch(next);
}

function handelGetOne(req,res,next){
  let id = req.params.id;
  req.model.get(id)
    .then(record=>{
      res.json(record);
    }).catch(next);
}

function handelPost(req,res,next){
  req.model.create(req.body)
    .then(results=>{
      res.json(results);
    }).catch(next);
}

function handelDelete(req,res,next){
  let id = req.params.id;
  req.model.delete(id)
    .then(record=>{
      res.json(record);
    }).catch(next);
}
function handelUpdate(req,res,next){
  let id = req.params.id;
  req.model.update(id, req.body)
    .then(record=>{
      res.json(record);
    }).catch(next);
}
module.exports = router;