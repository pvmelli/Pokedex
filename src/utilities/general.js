import {managePageClick} from './pagination.js';

import {manageSearch} from './searchbar.js';

import {manageListClick} from './list.js';

import {
    loadPokemonDataFromLocalStorage,
    savePokemonDataToLocalStorage
} from '../storage/storage.js';

import{
    clearInputError,
    showInputError
} from '../ui/searchbar.js';

import {
    makeNavButtonsVisible,
    clearLoadingPopup
} from '../ui/general.js';

import {loadPokemonDataFromApi} from '../services/pokeapi.js';

export function assignInitialEventListeners() {
    const $pagination = document.querySelector('[id="pagination"]');
    $pagination.addEventListener('click',managePageClick);

    const $searchButton = document.querySelector('[id="search-button"]');
    $searchButton.addEventListener('click',manageSearch);

    const $lists = document.querySelector('[id="pokemon-list"]');
    $lists.addEventListener('click',manageListClick);

    const $navSearchButton = document.querySelector('[id="nav-search-button"]');
    const $searchTitle = document.querySelector('[id="search-title"]');
    $navSearchButton.addEventListener('click', () => {$searchTitle.scrollIntoView()});

    const $navListButton = document.querySelector('[id="nav-list-button"]');
    $navListButton.addEventListener('click', () => {$pagination.scrollIntoView()});

    const $navTopButton = document.querySelector('[id="nav-top-button"]');
    $navTopButton.addEventListener('click', () => {document.documentElement.scrollTop = 0});
};

export function calculateOffset(selectedPage) {
    const limit = 10;
    const offset = (selectedPage - 1) * limit;
    
    return offset;
};

export async function fetchPokemonDataWithName(pokemonName) {
    try {
        let pokemonData = loadPokemonDataFromLocalStorage(pokemonName);
        if (pokemonData === null){
            throw error;
        } else {
            clearInputError();
            makeNavButtonsVisible();
            return pokemonData;
        }
    } catch (e) {
        try {
            let data = await loadPokemonDataFromApi (pokemonName);
            savePokemonDataToLocalStorage (pokemonName, data);
            clearInputError();
            makeNavButtonsVisible();
            return data;
    
        }catch (error){
            clearLoadingPopup();
            showInputError('The name entered is invalid');
            return null;
        }
    }

};

