import {
    loadPokemonDataFromLocalStorage,
    savePokemonDataToLocalStorage
} from '../storage/storage.js';

import{
    showInputError
} from '../ui/searchbar.js';

import {
    makeNavButtonsVisible,
    clearLoadingPopup
} from '../ui/general.js';

import {loadPokemonDataFromApi} from '../api/pokeapi.js';

export async function fetchPokemonDataWithName(pokemonName) {
    try {
        let pokemonData = loadPokemonDataFromLocalStorage(pokemonName);
        if (pokemonData === null){
            throw error;
        } else {
            makeNavButtonsVisible();
            return pokemonData;
        }
    } catch (e) {
        try {
            let data = await loadPokemonDataFromApi (pokemonName);
            savePokemonDataToLocalStorage (pokemonName, data);
            makeNavButtonsVisible();
            return data;
    
        }catch (error){
            clearLoadingPopup();
            showInputError('The name entered is invalid');
            return null;
        }
    }

};

