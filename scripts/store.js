'use strict';

/* global $ */

const store = (function() {
  
  
  const addItem = function(item) {
    this.items.push(item);
    //console.log(item);
  };

  const findById = function(id) {
    return this.items.find(item => item.id === id);
  };

  const findAndUpdateExpand = function(id, trueData, falseData) {
    const item = this.findById(id);
    if (item.expanded === true) {
      Object.assign(item, falseData);
    }
    else {Object.assign(item, trueData);}
    // console.log('item', item);
    // console.log('new data', trueData);

  };

  const findAndDelete = function(id) {
    this.items = this.items.filter(item => item.id !== id);
  };
  
  const setError = function(err) {
    this.error = err;
    //console.log(this.error);
  };

  const setSearchRating = function(rating) {
    this.searchRating = rating;
  };
  
  return {
    items: [],
    error: null,
    searchRating: '',
    addItem,
    findAndDelete,
    setError,
    findById,
    findAndUpdateExpand,
    setSearchRating,



  };
}());