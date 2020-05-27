import {activateLoadingPopup} from '../ui/general.js';
import {fetchPokemonDataWithName} from '../services/pokemon.js';
import {managePokedexEntry} from './entry.js';

export function loadingList() {
    const $listGroup = document.querySelector('#pokemon-list');
    $listGroup.innerHTML = 'Loading...';
}

export function manageListClick(event) {
    const clickedPokemon = event.target.id;

    activateLoadingPopup();
    fetchPokemonDataWithName(clickedPokemon)
    .then(data => {
        data ? managePokedexEntry(data[0], data[1]) : false;
    });
};

export function createPokemonList (pageJson) {

    const $listGroup = document.querySelector('#pokemon-list');
    $listGroup.innerHTML = '';

    pageJson.results.forEach(element => {
        const $listItem = document.createElement('li');
        $listItem.classList.add('list-group-item');
        $listItem.classList.add('list-group-item-action');
        $listItem.setAttribute('id', element.name);
        $listItem.innerText = element.name;
        
        $listGroup.appendChild($listItem);
    });
};