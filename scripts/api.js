'use strict';

/* global $ */

const api = (function() {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/filipp';

  const getBookmarks = function(callback) {
    $.getJSON(`${BASE_URL}/bookmarks`, callback);
  };

  const createItem = function(title, url, desc, rating, callback, handleError) {
    const newItem = JSON.stringify({
      'title': title,
      'url': url,
      'desc': desc,
      'rating': rating,
    });
    $.ajax({
      'url': `${BASE_URL}/bookmarks`,
      'method': 'POST',
      'contentType': 'application/json',
      'data': newItem,
      'success': callback,
      'error': handleError,
    });
  };



  return {
    getBookmarks, createItem,
  };
}());