import {activateLoadingPopup} from '../ui/general.js';
import {fetchPokemonDataWithName} from './general.js';
import {managePokedexEntry} from './entry.js';


export function manageListClick(event) {
    const clickedPokemon = event.target.id;

    activateLoadingPopup();
    fetchPokemonDataWithName(clickedPokemon)
    .then(data => {
        data ? managePokedexEntry(data) : false;
    });
};

