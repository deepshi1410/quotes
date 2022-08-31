
const project = 'Quotes-Generator';
// this variable will be container for quotes data
var quoteData;

// this array is to store colours so that every time user clicks on new quote button, random colour wil be chosen in background
var colours = [
  '#d7a0f3',
  'purple',
  'violet',
  'fuchsia',
  'turquoise',
  'blue',
  'yellow',
  '#FDA7A7',
  '#E387FA',
  '#95E4C2',
  '#8EBA66',
  '#9b59b6',
  '#FB6964',
  '#cc6600'
];

// variables decalred for storing current quote and author
let currentQuote = '';
let currentAuthor = '';

// url to fetch quotes data from 
const url = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

// function to write ajax call
function getQuotes() {
  return $.ajax({
    headers: {
      Accept: 'application/json'
    },
    url: url,
    success: function (data) {
      if (typeof data === 'string') {
        quoteData = JSON.parse(data);
        // console.log(quoteData);
      }
    }
  })
}

// function to return a quote randomly
function getRandomQuote() {
  return quoteData.quotes[
    Math.floor(Math.random() * quoteData.quotes.length)
  ];
}

// function to get a quote and set in quotes box in html
function getQuote() {
  let randomQuote = getRandomQuote();
  currentQuote = randomQuote.quote;
  currentAuthor = randomQuote.author;
  // console.log(currentQuote);
  // console.log(currentAuthor);

  $('.quote-text').animate({ opacity: 0 }, 600, function () {
    $(this).animate({ opacity: 1 }, 300);
    $('#text').text(randomQuote.quote);
  });
  $('.quotes-author').animate({ opacity: 0 }, 600, () => {
    $(this).animate({ opacity: 1 }, 300, () => {
      $('#author').text(randomQuote.author);
    })
  })
  let color = Math.floor(Math.random() * colours.length)
  $('html body').animate({
    backgroundColor: colours[color],
    color: colours[color]
  }, 900)
}

$(document).ready(function () {
  getQuotes().then(() => {
    getQuote();
  });
  // getQuotes();
  $('#new-quote').on('click', getQuote);
});




