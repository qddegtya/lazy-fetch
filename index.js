/**
 * LazyFetch.js
 * Created by archer on 16/01/05.
 * Copyright (c) 2016年 archer. All rights reserved.
 *
 * Auto collect models for fetch api.
 *
 * Usage:
 *
 * Step 1 - Collect models.
 *
 * var models = LazyFetch.url('http://api.xxx.com/v1')
 *          .headers({
 *            'Accept': 'application/json',
 *            'Content-Type': 'application/json',
 *          })
 *          .add('getTopicList', 'GET', '/topic')
 *          .add('searchTopic', 'GET', '/topic/search');
 *
 * Step 2 - Use models.
 *
 * models.getSecCars()
 *   .then((r) => { return r.json(); })
 *   .then((res) => { console.log(res); });
 *
 */
'use strict';

var LazyFetch = function(opts) {
  this._options = opts || {};
};

LazyFetch.factory = function(opts) {
  // Ignore 'new XX()'
  // Each url returns the instance of LazyFetch
  if(opts.baseUrl === undefined) {
    throw new Error('baseUrl must be defined.');
  }
  return new LazyFetch(opts);
};

LazyFetch.prototype = {
  constructor: LazyFetch,
  _parseQuery: function(query) {
    var _querys = [];
    for(var k in query) {
      _querys.push(k + '=' + query[k]);
    }
    return _querys;
  },
  headers(headers) {
    this._headers = headers;
    return this;
  },
  add(mn, mt, url) {
    switch(mt) {
    case 'GET':
      Object.defineProperty(this, mn, {
        value: function(pl) {
          return fetch(
            (this._options.baseUrl || '') + url + '?' + this._parseQuery(pl || {}).join('&'),
            {
              method: mt,
              headers: this._headers
            }
          );
        },
        enumerable: true,
        configurable: true
      });
      break;
    case 'POST':
      Object.defineProperty(this, mn, {
        value: function(pl) {
          return fetch(
            (this._options.baseUrl || '') + url,
            {
              method: mt,
              headers: this._headers,
              body: pl ? JSON.stringify(pl) : JSON.stringify({})
            }
          );
        },
        enumerable: true,
        configurable: true
      });
    }
    return this;
  }
};

module.exports = LazyFetch;
