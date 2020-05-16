import {showInputError} from '../ui/searchbar.js';
import {activateLoadingPopup} from '../ui/general.js';
import {fetchPokemonDataWithName} from './general.js';
import {managePokedexEntry} from './entry.js';

function validateInput(inputName) {
     
    if(inputName.length === 0){
        return 'This field cannot be empty';
    };

    const onlyNumbersRegex = /^[0-9]*$/;
    if(onlyNumbersRegex.test(inputName)){
        return 'This field cannot contain numbers';
    };

    return 'success';

};

function fetchInput() {
    const rawInput = document.querySelector('#pokemon-field').value.trim().toLowerCase();

    const inputValidationResult = validateInput(rawInput);

    if (inputValidationResult === 'success'){
        return rawInput;
    } else {
        showInputError(inputValidationResult)
        return 'error';
    };
};

export function manageSearch() {
    const validatedInput = fetchInput();

    if (validatedInput === 'error'){
        return ''
    } else {
        activateLoadingPopup();
        fetchPokemonDataWithName(validatedInput)
        .then(data => {
            data ? managePokedexEntry(data) : false;
        });
    };
};

