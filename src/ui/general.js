import {
    assignEventListener,
    assignScrollEventListener,
    assignScrollToTopEventListener
} from '../utilities/utilities.js';

import {managePageClick} from './pagination.js';
import {manageSearch} from './searchbar.js';
import {manageListClick} from './list.js';

export function assignInitialEventListeners() {
    assignEventListener('[id="pagination"]', 'click', managePageClick);
    assignEventListener('[id="search-button"]', 'click', manageSearch);
    assignEventListener('[id="pokemon-list"]', 'click', manageListClick);
    
    assignScrollEventListener('[id="nav-search-button"]', 'click', '[id="search-title"]')
    assignScrollEventListener('[id="nav-list-button"]', 'click', '[id="pagination"]')

    assignScrollToTopEventListener ('[id="nav-top-button"]', 'click')
}

export function activateLoadingPopup() {
    const $loadingModal = document.querySelector('#loading-modal');
    $loadingModal.classList.remove('not-display');
};

export function clearLoadingPopup() {
    const $loadingModal = document.querySelector('#loading-modal');
    $loadingModal.classList.add('not-display');
}

export function makeNavButtonsVisible(){
    const $navButtonContainers = document.querySelectorAll('.nav-container');
    $navButtonContainers.forEach($container => {
        $container.classList.remove('not-display')
    });
};

