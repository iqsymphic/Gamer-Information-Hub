'use strict';

const apiKey = "8be7a1c31c364b8eabac2a37abfe7f2652e34de0561a461880b7af3967ecbcf6";
const searchURL = "https://xivapi.com/character/search";

$(document).ready(function() {
    watchForm();
});

function watchForm() {
    $("#search-form").submit(e => {
        event.preventDefault();
    let searchTerm = $("#state-input").val();
    getCharacterInfo(searchTerm);
    });
}

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
    return queryItems.join('&');
}

function displayResults(responseJson) {
    $('#results-list').empty();
    for (let i = 0; i < responseJson.Results.length; i++){
        $('#results-list').append(
                            `<li><h3>${responseJson.Results[i].Name}</h3>
                        <p>${responseJson.Results[i].Lang}</p>
                <p> ${responseJson.Results[i].Server}</p>
            </li>`
        )}; 
    $('#results-list').removeClass('hidden');
};

function getCharacterInfo(query) {
    const params = {
        name: query,
        private_key: apiKey
    };
  
    const queryString = formatQueryParams(params);
    const url = searchURL + "?" + queryString;
    
    fetch(url, { mode: 'cors' })
    .then(response => response.json())
    .then(responseJson => displayResults(responseJson))
};
