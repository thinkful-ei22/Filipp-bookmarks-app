'use strict';

/* global $, store */

const bookmarkList = (function() {
  

  function generateItemElement(item) {
    //here we insert the html code that we want to go on screen
  }
  
  
  function generateBookmarkItemsString(bookmarkList) {
    const items = bookmarkList.map((item) => generateItemElement(item));
    return items.join('');
  }

  
  
  //function render() {
    let items = store.items;
        
    console.log('render ran');

    const bookmarkListItemsString = generateBookmarkItemsString(items);
    $('.js-bookmark-list').html(bookmarkListItemsString);
  }



  
  
  
  function bindEventListeners() {

  }
  
  
  return {
    render: render,
    bindEventListeners: bindEventListeners,
  };
}());