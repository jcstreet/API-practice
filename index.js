'use strict';

function displayResults(responseJson) {
    // Clear out old results and error message
    $('#results').empty();
    $('#js-error').empty();

    for (let i = 0; i < responseJson.docs.length; i++) {
        $('#results').append(`<p>${responseJson.docs[i].title}</p>`);
    }

    $('#results').removeClass('hidden');
    $('#js-error').addClass('hidden');

    console.log(responseJson.docs[0].title);
}

function getBooks(auth) {
    const url = `http://openlibrary.org/search.json?author=${auth}`;
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error (response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            $('#js-error').text(`Something went wrong: ${err.message}`);
            $('#js-error').removeClass('hidden');
        })
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const author = $('.js-author').val();
        getBooks(author);
    })
}

$(watchForm);