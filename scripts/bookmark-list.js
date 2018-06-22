'use strict';

/* global $, store, api */

const bookmarkList = (function() {
  

  function generateItemElement(item) {
    
    const rating = item.rating;

    let itemRating = '';
    for (let i = 1; i < 6; i++) {
      if (i <= rating) {
        itemRating+='<span class="fa fa-star checked"></span>';
      }
      else {
        itemRating+='<span class="fa fa-star"></span>';
      }
    }
    //console.log(itemRating);
    

    return `
    <li class="js-item-element" data-item-id="${item.id}">
     <h4>${item.title}</h4>
        <p>${item.desc}</p>
        ${itemRating}
        <a href="${item.url}" target="_blank">Visit Site</a>
        <div class="bookmark-item-controls">
            <button class="bookmark-item-delete js-bookmark-item-delete">
             <span class="button-label">Delete</span>
            </button>
        </div>
    </li>`;
  }
  
  
  function generateBookmarkItemsString(bookmarkList) {
    const items = bookmarkList.map((item) => generateItemElement(item));
    return items.join('');
  }

  
  
  function render() {
    let items = store.items;
    //console.log('render running');

    const bookmarkListItemsString = generateBookmarkItemsString(items);
    $('.js-bookmark-list').html(bookmarkListItemsString);

    if (store.error){
      //console.log(store.error);
      $('.js-alert-placeholder').html(`<div class="alert">
      <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
      ${store.error}</div>`);
    }


  }

  function handleNewBookmarkSubmit() {
    $('#js-bookmark-list-form').submit(function (event) {
      event.preventDefault();
      const newBookmarkTitle = $('.js-bookmark-list-entry').val();
      const bookmarkLink = $('.js-bookmark-link-entry').val();
      const newBookmarkDesc = $('.js-bookmark-list-desc').val();
      const newBookmarkRating = $('.js-bookmark-raiting-list').val();
      $('.js-bookmark-list-entry').val('');
      $('.js-bookmark-link-entry').val('');
      $('.js-bookmark-list-desc').val('');
      $('.js-bookmark-raiting-list').val('');

      const newBookmarkLink = `https://${bookmarkLink}`;

      //console.log(`The submited values are ${newBookmarkTitle}, ${newBookmarkLink}, ${newBookmarkDesc}, and ${newBookmarkRating}`);
      
      api.createItem(newBookmarkTitle, newBookmarkLink, newBookmarkDesc, newBookmarkRating, function(newItem) {
        //console.log(newItem);
        store.addItem(newItem);
        render();
      }, function(err) {
        const errorMessage = err.responseJSON.message;
        //console.log(errorMessage);
        store.setError(errorMessage);
        render();
      }); 


    });
  }

  function getBookmarkIdFromElement(item) {
    return $(item)
      .closest('.js-item-element')
      .data('item-id');
  }
  
  function handleDeleteBookmarkClicked() {
    $('.js-bookmark-list').on('click', '.js-bookmark-item-delete', event => {
      //console.log('delete clicked');
      const id = getBookmarkIdFromElement(event.currentTarget);
      api.deleteItem(id, () => {
        store.findAndDelete(id);
        render();
      });
    });
  }

  //on change event listener for the filter. Using filter method, then recall render.

  
  
  
  function bindEventListeners() {
    handleNewBookmarkSubmit();
    handleDeleteBookmarkClicked();

  }
  
  
  return {
    render: render,
    bindEventListeners: bindEventListeners,
  };
}());