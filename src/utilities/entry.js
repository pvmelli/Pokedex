import {
    showPokedexEntry,
    clearPokedexEntry,
    fillPokedexEntry,
    scrollToPokedexEntry
} from '../ui/entry.js';

import {clearLoadingPopup} from '../ui/general.js';


export function managePokedexEntry(pokemondata){
    showPokedexEntry();
    clearPokedexEntry();
    fillPokedexEntry(pokemondata);
    scrollToPokedexEntry();

    clearLoadingPopup();
};

