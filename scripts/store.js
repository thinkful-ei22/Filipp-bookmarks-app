'use strict';

/* global $ */

const store = (function() {
  

  const addItem = function(item) {
    this.items.push(item);
  };

  
  
  return {
    items: [],
    addItem,

  };
}());