import {managePokedexEntry} from '../entry.js'
import fixture from "../../__tests__/pokedex.fixture";
import blastoiseSingle from "../../../cypress/fixtures/blastoise_single.json"
import blastoiseSpecies from "../../../cypress/fixtures/blastoise_species.json"
import flygonSingle from "../../../cypress/fixtures/flygon_single.json"
import flygonSpecies from "../../../cypress/fixtures/flygon_species.json"
import zeraoraSingle from "../../../cypress/fixtures/zeraora_single.json"
import zeraoraSpecies from "../../../cypress/fixtures/zeraora_species.json"

test("Manage creation of a pokedex entry", () => {
    document.body.innerHTML = fixture;
    Element.prototype.scrollIntoView = jest.fn();

    managePokedexEntry(blastoiseSingle, blastoiseSpecies);
    managePokedexEntry(flygonSingle, flygonSpecies);
    managePokedexEntry(zeraoraSingle, zeraoraSpecies);

    expect(Element.prototype.scrollIntoView).toHaveBeenCalled;

});


