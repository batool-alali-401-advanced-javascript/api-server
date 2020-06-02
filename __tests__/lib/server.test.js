'use strict';
const { server } = require('../../lib/server.js');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);

describe('Store API', () => {
  it('can post() a Category', () => {
    let obj = {
      'name': 'hat',
      'display_name': 'hat',
      'description': 'heads cloth',
      '_id': 1,
    };
    return mockRequest
      .post('/api/v1/categories')
      .send(obj)
      .then((data) => {
        const record = data.body; 
        Object.keys(obj).forEach((key) => {
          expect(record[key]).toEqual(obj[key]);
        });
      });
  });
  it('can get() a Category', () => {
    const  obj = {
      'name': 'hat',
      'display_name': 'hat',
      'description': 'heads cloth',
      '_id': 1,
    };
    return mockRequest
      .post('/api/v1/categories')
      .send(obj)
      .then((data) => {
        return mockRequest.get('/api/v1/categories').then((result) => {
          Object.keys(obj).forEach((key) => {
            expect(result.body[0][key]).toEqual(obj[key]);
          });
        });
      });
  });
  it('can post() a Product', () => {
    let obj = {
      'category': 'hats',
      'name': 'cascade',
      'display_name': 'cascade',
      'description': 'colored cascade',
      '_id': 1,
    };
    return mockRequest
      .post('/api/v1/products')
      .send(obj)
      .then((data) => {
        const record = data.body; 
        Object.keys(obj).forEach((key) => {
          expect(record[key]).toEqual(obj[key]);
        });
      });
  });
  it('can get() a product', () => {
    let obj = {
      'category': 'hats',
      'name': 'cascade',
      'display_name': 'cascade',
      'description': 'colored cascade',
      '_id': 1,
    };
    return mockRequest
      .post('/api/v1/products')
      .send(obj)
      .then((data) => {
        return mockRequest.get('/api/v1/products').then((result) => {
          Object.keys(obj).forEach((key) => {
            expect(result.body[0][key]).toEqual(obj[key]);
          });
        });
      });
  });

});