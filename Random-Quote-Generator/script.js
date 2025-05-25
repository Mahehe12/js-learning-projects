const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// show loading spinner
function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
    // only loader nothing else
}

// Hide Spinner
function removeLoadingSpinner() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// Show new Quote
function newQuote() {
    showLoadingSpinner();
    // Pick a random Quote
    const singleQuote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if author field is blank  and replace it with unkown
    if (!singleQuote.author) {
        authorText.textContent = 'Unkown';
    } else {
        authorText.textContent = singleQuote.author;
    }

    // Check quote length to determine styling
    if (singleQuote.quote.length > 50) {
        quoteText.classList.add('long-quote'); // adding long quote styling
    } else {
        quoteText.classList.remove('long-quote');
    }

    quoteText.textContent = singleQuote.quote;
    removeLoadingSpinner();
}

// Get Quotes from API
async function getQuotes() {
    showLoadingSpinner();
    const apiURL = 'https://dummyjson.com/quotes?limit=1454';
    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        apiQuotes = data.quotes; // ✅ Extract only the quotes array    
        newQuote();
    } catch (error) {
        getQuotes();
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterURL = `https://x.com/intent/post?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterURL, '_blank'); // blank to open twitter windown in a new tab
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On load 
getQuotes();