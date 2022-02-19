// API
const API_ENDPOINT = 'https://yesno.wtf/api';
const ballSelector = document.querySelector('#ball');
const buttonSelector = document.querySelector('#button');
const inputSelector = document.querySelector('#input');
const answerSelector = document.querySelector('#answer');
const errorSelector = document.querySelector('#error');
let isInProgress = false;

/**
 * STEPS:
 *
 * 1. Create a fetchAnswer function and call the API
 * 2. Output the API's response
 * 3. Attach fetchAnswer to an event listener
 * 4. Clear output after 3 seconds
 * 5. Optional: add loading/error states
 *
 */

const setIsInProgress = value => {
    isInProgress = value;
};

const showError = () => {
    errorSelector.innerHTML = 'Please enter question';
    setTimeout(() => {
        errorSelector.innerHTML = '';
    }, 1000);
};

const setDisableState = disableButtonValue => {
    if (disableButtonValue) {
        buttonSelector.setAttribute('disabled', 'disabled');
    } else {
        buttonSelector.removeAttribute('disabled');
    }
};

const cleanResponse = () => {
    setTimeout(() => {
        inputSelector.value = '';
        answerSelector.innerHTML = '';
        setIsInProgress(false);
        setDisableState(false);
    }, 3000);
};

const showAnswer = answer => {
    setTimeout(() => {
        answerSelector.innerHTML = `<p>${answer}</p>`;
        ballSelector.classList.remove('shake__ball');
    }, 1000);

    cleanResponse();
};

const getAnswer = () => {
    if (isInProgress) return;
    if (!inputSelector.value) return showError();
    getData();
};

const handleKeyEnter = e => {
    if (e.keyCode === 13) {
        getAnswer();
    }
};

buttonSelector.addEventListener('click', getAnswer);

const getData = () => {
    setIsInProgress(true);
    setDisableState(true);
    ballSelector.classList.add('shake__ball');

    fetch(API_ENDPOINT)
        .then(response => response.json()) //promisse
        .then(data => showAnswer(data.answer)); //data
};
