import 'whatwg-fetch'

const API = {
  url: 'https://sheets.googleapis.com/v4/spreadsheets',
  key: 'AIzaSyBWCHtr1MZnTJr74whmSOiTWYVRIABEZHE',
  spreadsheet: '1M7kSTLxNxGpviRZujVd9YESWhBUalWFO10M8D9V0Alk'
}

const gsxURL = function (query) {
  return API.url + '/' + API.spreadsheet + '/values/' + query + '?key=' + API.key
}

function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function parseData (data) {
  return data.values
}

// fetch all items
export function fetchItems (range) {
  return fetch(gsxURL('Measures!' + range))
    .then(checkStatus)
    .then(response => response.json())
    .then(parseData)
}

// fetch all goals
export function fetchGoals (range) {
  return fetch(gsxURL('Goals!' + range))
    .then(checkStatus)
    .then(response => response.json())
    .then(parseData)
}
