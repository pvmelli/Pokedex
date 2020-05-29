import { initialize } from "../../pokedex.js";
import {manageListClick, createPokemonList} from '../list.js'
import fixture from "../../__tests__/pokedex.fixture";
import firstPage from "../../../cypress/fixtures/page_01.json";

test("Manage creation of a pokemon page list", () => {
    document.body.innerHTML = fixture;
  
    initialize() 

    createPokemonList(firstPage)

    const POKEMONS_FIRST_PAGE = ['bulbasaur', 'ivysaur', 'venusaur', 'charmander', 'charmeleon', 'charizard',
    'squirtle', 'wartortle', 'blastoise', 'caterpie'];

    POKEMONS_FIRST_PAGE.forEach(pokemon => {
        expect(document.querySelector(`#${pokemon}`).getAttribute("class"))
        .toEqual(expect.stringContaining("list-group-item"));
    });
});

test("Manage click on a list item", () => {
    initialize() 

    const EVENT_MOCK = {target: {id: "bulbasaur"}};

    manageListClick(EVENT_MOCK)

    expect(document.querySelector(`#loading-modal`).getAttribute("class"))
        .toEqual(expect.not.stringContaining("not-display"));
});


