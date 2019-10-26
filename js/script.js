'use strict';

const apiKey = "a5c729b3cf224d268a63435072b5f04a0edf7be10062443bb849f39e40824229";
const searchURL = "https://xivapi.com/character/search";

$(document).ready(function() {
    watchForm();
});

function watchForm() {
    $("#search-form").submit(e => {
        event.preventDefault();
    let searchName = $("#name-input").val();
    let searchServer = $("#server-input").val();
    getCharacterInfo(searchName, searchServer);
    });
}

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
    return queryItems.join('&');
}

function displayResults(responseJson) {
    console.log(responseJson);
    $('#results-list').empty();
    for (let i = 0; i < responseJson.Results.length; i++){
        $('#results-list').append(
                            `<li><p>${responseJson.Results[i].Name}</p>
                <p> ${responseJson.Results[i].Server}</p>
            </li>`
        )}; 
    $('#results-list').removeClass('hidden');
};

function getCharacterInfo(query, query2) {
    const params = {
        name: query,
        server: query2,
        private_key: apiKey
    };
  
    const queryString = formatQueryParams(params);
    const url = searchURL + "?" + queryString;
    
    fetch(url, { mode: 'cors' })
    .then(response => response.json())
    .then(responseJson => displayResults(responseJson))
};

function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }