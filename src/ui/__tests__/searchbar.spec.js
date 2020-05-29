import { initialize } from "../../pokedex.js";
import {manageSearch} from '../searchbar.js'
import fixture from "../../__tests__/pokedex.fixture";

test("Manage use of search bar", () => {
    document.body.innerHTML = fixture;
  
    initialize()

    const SEARCHBAR = document.querySelector('#pokemon-field');
    SEARCHBAR.value = '23525'

    manageSearch();

    expect(document.querySelector('#pokemon-field').getAttribute('class'))
    .toEqual(expect.stringContaining('is-error'));
    expect(document.querySelector('#invalid-search').getAttribute('class'))
    .toEqual(expect.not.stringContaining('not-display'));
    expect(document.querySelector('#invalid-search').innerText)
    .toEqual(expect.stringContaining('This field cannot contain numbers'));

    SEARCHBAR.value = '   '

    manageSearch();

    expect(document.querySelector('#pokemon-field').getAttribute('class'))
    .toEqual(expect.stringContaining('is-error'));
    expect(document.querySelector('#invalid-search').getAttribute('class'))
    .toEqual(expect.not.stringContaining('not-display'));
    expect(document.querySelector('#invalid-search').innerText)
    .toEqual(expect.stringContaining('This field cannot be empty'));

    SEARCHBAR.value = 'blastoise'

    manageSearch();

    expect(document.querySelector('#pokemon-field').getAttribute('class'))
    .toEqual(expect.not.stringContaining('is-error'));
    expect(document.querySelector('#invalid-search').getAttribute('class'))
    .toEqual(expect.stringContaining('not-display'));
    expect(document.querySelector('#loading-modal').getAttribute("class"))
    .toEqual(expect.not.stringContaining("not-display"));
});



