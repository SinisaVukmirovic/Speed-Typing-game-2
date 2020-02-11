const apiUrl = 'http://api.quotable.io/random';
const quoteElem = document.querySelector('#quote');
const inputElem = document.querySelector('#input');
const timerElem = document.querySelector('#timer');

// adding eventlistener on every input
inputElem.addEventListener('input', () => {
    const arrayQuote = quoteElem.querySelectorAll('span');

    // same as with quote,
    // splitting typed words into individual characters
    const arrayValue = inputElem.value.split('');
    let correct = true;

    arrayQuote.forEach((charSpan, index) => {
        const character = arrayValue[index];

        // checking if character is typed or not (based on its index)
        if (character == null) {
            charSpan.classList.remove('js-correct');
            charSpan.classList.remove('js-incorrect');
            
            correct = false;
        }
        // checking if characters match
        else if (character === charSpan.innerText) {
            charSpan.classList.add('js-correct');
            charSpan.classList.remove('js-incorrect');
        }
        else {
            charSpan.classList.remove('js-correct');
            charSpan.classList.add('js-incorrect');

            correct = false;
        }
    });

    // if (correct) renderNewQuote();
    if (correct) {
        quoteElem.innerHTML = `
            <h2 class="js-info">Correct!</h2>
            <h3 class="js-info">Get Ready! New quote comming!</h3>
        `;
        setTimeout(() => {
            renderNewQuote();
        }, 2000);
    }
});

function getRandomQuote() {
    return fetch(apiUrl)
    .then(response => response.json())
    .then(data => data.content);
}

async function renderNewQuote() {
    const quote = await getRandomQuote();
    quoteElem.innerHTML = '';

    // splitting words into individual elements/letters
    // so that we can color the ccorrect/incorrect typed out letters
    quote.split('').forEach(char => {
        const charSpan = document.createElement('span');
        charSpan.innerText = char;

        quoteElem.appendChild(charSpan);
    });

    inputElem.value = null;
}

// TO DO TIMER FUNCTIONALITY

renderNewQuote();