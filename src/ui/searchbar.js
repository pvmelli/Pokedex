export function showInputError(error){
    const $inputField = document.querySelector('#pokemon-field');
    $inputField.classList.add('is-error');

    const $errorContainer = document.querySelector('#invalid-search');
    $errorContainer.classList.remove('not-display');
    $errorContainer.innerText = error;
};

export function clearInputError () {
    const $inputField = document.querySelector('#pokemon-field');
    $inputField.classList.remove('is-error');

    const $errorContainer = document.querySelector('#invalid-search');
    $errorContainer.classList.add('not-display');

};

