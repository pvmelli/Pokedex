import { initialize } from "../../pokedex.js";
import {manageSearch, validateInput, showInputError, clearInputError, rawInput} from '../searchbar.js'
import fixture from "../../__tests__/pokedex.fixture";

test("Manage use of search bar", () => {
    document.body.innerHTML = fixture;
  
    initialize()

    manageSearch();

});

test("Manage input validation", () => {
    document.body.innerHTML = fixture;

    initialize()

    expect(validateInput('Blastoise')).toEqual(expect.stringContaining("success"))

    expect(validateInput('23525')).toEqual(expect.stringContaining("This field cannot contain numbers"))

    expect(validateInput('')).toEqual(expect.stringContaining("This field cannot be empty"))
});

test("Input errors can be displayed and cleared", () => {
    document.body.innerHTML = fixture;

    initialize()

    showInputError('This is an error')

    expect(document.querySelector("#pokemon-field").getAttribute("class"))
    .toEqual(expect.stringContaining("is-error"));

    expect(document.querySelector("#invalid-search").getAttribute("class"))
    .toEqual(expect.not.stringContaining("not-display"));

    expect(document.querySelector("#invalid-search").innerText)
    .toEqual(expect.stringContaining("This is an error"));

    clearInputError()

    expect(document.querySelector("#pokemon-field").getAttribute("class"))
    .toEqual(expect.not.stringContaining("is-error"));

    expect(document.querySelector("#invalid-search").getAttribute("class"))
    .toEqual(expect.stringContaining("not-display"));

    expect(document.querySelector("#invalid-search").innerText)
    .toEqual(expect.stringContaining(""));

});

/* export function manageSearch() {
    const validatedInput = fetchInput();

    if (validatedInput === 'error'){
        return ''
    } else {
        activateLoadingPopup();
        fetchPokemonDataWithName(validatedInput)
        .then(data => {
            data ? managePokedexEntry(data[0], data[1]) : false;
        });
    };
};

export function clearInputError () {
    const $inputField = document.querySelector('#pokemon-field');
    $inputField.classList.remove('is-error');

    const $errorContainer = document.querySelector('#invalid-search');
    $errorContainer.classList.add('not-display');

};
 */



