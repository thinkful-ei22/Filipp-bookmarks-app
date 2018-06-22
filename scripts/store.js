'use strict';

/* global $ */

const store = (function() {
  
  //let error = null;
  
  const addItem = function(item) {
    this.items.push(item);
    console.log(item);
  };

  const findAndDelete = function(id) {
    this.items = this.items.filter(item => item.id !== id);
  };
  
  const setError = function(err) {
    this.error = err;
    //console.log(this.error);
  };
  
  return {
    items: [],
    error: null,
    addItem,
    findAndDelete,
    setError,

  };
}());