'use strict';

/* global $ */

const store = (function() {
  

  const addItem = function(item) {
    this.items.push(item);
    console.log(item);
  };

  
  
  return {
    items: [],
    addItem,

  };
}());