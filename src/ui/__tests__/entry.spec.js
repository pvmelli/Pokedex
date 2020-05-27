import { initialize } from "../../pokedex.js";
import {createPokemonList} from '../list.js'
import {managePokedexEntry} from '../entry.js'
import fixture from "../../__tests__/pokedex.fixture";
import firstPage from "../../../cypress/fixtures/page_01.json";
import blastoiseSingle from "../../../cypress/fixtures/blastoise_single.json"
import blastoiseSpecies from "../../../cypress/fixtures/blastoise_species.json"

test("Manage creation of a pokedex entry", () => {
    document.body.innerHTML = fixture;
    Element.prototype.scrollIntoView = jest.fn();
  
    initialize() 

    createPokemonList(firstPage)

    managePokedexEntry(blastoiseSingle, blastoiseSpecies);

    setTimeout(()=> {
        expect(document.querySelector(`#pokemon-name`))
        .toEqual(expect.stringContaining("BLASTOISE"));

        expect(document.querySelector(`img .sprite`).getAttribute("src"))
        .toEqual(expect.stringContaining("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png"));

        expect(document.querySelectorAll('#characteristics .btn-group'))
        .toHaveLength(5);

        expect(document.querySelectorAll('#abilities .btn-group'))
        .toHaveLength(2);

        expect(document.querySelectorAll('#stats table'))
        .toHaveLength(6);

    }, 20000)

  });


