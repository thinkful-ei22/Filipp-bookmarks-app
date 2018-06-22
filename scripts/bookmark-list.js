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

    if (item.expanded === true) {
      return `
    <li class="js-item-element" data-item-id="${item.id}">
     <h4>${item.title}</h4>
        <p>${item.desc}</p>
        <a class="webpage-link" href="${item.url}" target="_blank">Visit Site</a>
        ${itemRating}
        <div class="bookmark-item-controls">
            <button class="bookmark-item-show js-bookmark-item-show">
             <span class="button-label">More Info</span>
            </button>
            <button class="bookmark-item-delete js-bookmark-item-delete">
             <span class="button-label">Delete</span>
            </button>
        </div>
    </li>`;
    }
    
    else {
      return `
        <li class="js-item-element" data-item-id="${item.id}">
         <h4>${item.title}</h4>
            ${itemRating}
            <div class="bookmark-item-controls">
                <button class="bookmark-item-show js-bookmark-item-show">
                 <span class="button-label">More Info</span>
                </button>
                <button class="bookmark-item-delete js-bookmark-item-delete">
                 <span class="button-label">Delete</span>
                </button>
            </div>
        </li>`;
    }
  }
  
  
  function generateBookmarkItemsString(bookmarkList) {
    const items = bookmarkList.map((item) => generateItemElement(item));
    return items.join('');
  }

  
  
  function render() {
    let items = store.items;
    //console.log('render running');


    if (store.error){
      $('.js-alert-placeholder').html(`<div class="alert">
      <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
      ${store.error}</div>`);
      console.log(`Error: ${store.error}`);
    }

    if (store.searchRating) {
      //console.log(`showing ratings only ${store.searchRating} or greater`);
      items = store.items.filter(item => item.rating >= store.searchRating);
    }

    const bookmarkListItemsString = generateBookmarkItemsString(items);
    $('.js-bookmark-list').html(bookmarkListItemsString);


  }

  function handleNewBookmarkSubmit() {
    $('#js-bookmark-list-form').submit(function (event) {
      event.preventDefault();
      const newBookmarkTitle = $('.js-bookmark-list-entry').val();
      let newBookmarkLink = $('.js-bookmark-link-entry').val();
      if (newBookmarkLink === '') {
        console.log('Link field is empty.');
      }
      else {
        newBookmarkLink = `https://${newBookmarkLink}`;
      }
      const newBookmarkDesc = $('.js-bookmark-list-desc').val();
      const newBookmarkRating = $('.js-bookmark-raiting-list').val();
      $('.js-bookmark-list-entry').val('');
      $('.js-bookmark-link-entry').val('');
      $('.js-bookmark-list-desc').val('');
      $('.js-bookmark-raiting-list').val('');

      
      
      //const newBookmarkLink = `https://${bookmarkLink}`;

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
        store.setError(null);
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

  function handleMoreInfoButtonClicked() {
    $('.js-bookmark-list').on('click', '.js-bookmark-item-show', event => {
      //console.log('more info button clicked');
      const id = getBookmarkIdFromElement(event.currentTarget);
      store.findAndUpdateExpand(id, {expanded: true}, {expanded: false});
      render();

    });

  }

  function handleRatingFilterSelected() {
    $('.js-filter-list').on('change', event => {
      //console.log('filter has been changed');
      const rating = $(event.currentTarget).val();
      //console.log(rating);
      store.setSearchRating(rating);
      render();
    });
  }

  
  
  
  function bindEventListeners() {
    handleNewBookmarkSubmit();
    handleDeleteBookmarkClicked();
    handleMoreInfoButtonClicked();
    handleRatingFilterSelected();

  }
  
  
  return {
    render: render,
    bindEventListeners: bindEventListeners,
  };
}());