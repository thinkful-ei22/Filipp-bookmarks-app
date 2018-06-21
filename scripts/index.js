'use strict';

/* global $, bookmarkList, api, store */

$(document).ready(function() {
  bookmarkList.bindEventListeners();
  bookmarkList.render();

  api.getBookmarks((items) => {
    
    items.forEach((item) => store.addItem(item));
    
    //need to create the render function
    bookmarkList.render();
  });




});