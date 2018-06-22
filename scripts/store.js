'use strict';

/* global $ */

const store = (function() {
  

  const addItem = function(item) {
    this.items.push(item);
    //console.log(item);
  };

  const findAndDelete = function(id) {
    this.items = this.items.filter(item => item.id !== id);
  };
  
  return {
    items: [],
    addItem,
    findAndDelete,

  };
}());