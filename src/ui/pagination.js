import {calculateOffset} from '../utilities/utilities.js';
import {
    loadingList,
    createPokemonList
} from '../ui/list.js'
import {getOnePokemonPage} from '../api/pokeapi.js';

export function createPagination() { 
    const totalNumberOfPokemons = 807;
    const limit = 10;
    const totalPages = (totalNumberOfPokemons / limit) + 1;

    createPaginationItem('previous');
    createPaginationItem('dotsprev');

    for(let i = 1; totalPages > i; i++){
        createPaginationItem(i);
    };

    createPaginationItem('dotsnext');
    createPaginationItem('next');
};

function createPaginationItem(value) {
    const $pageItem = document.createElement('li');
    $pageItem.classList.add('page-item');
    $pageItem.setAttribute('id', `page-${value}`);

    if(typeof (value) === 'number') {
        $pageItem.classList.add('not-display');
    };

    if(value === 'dotsprev' || value === 'dotsnext') {
        $pageItem.classList.add('not-display');
        $pageItem.classList.add('dot-items');
        $pageItem.classList.add('disabled');
        value = '...';
    };

    const $pageLink = document.createElement('a');
    $pageLink.classList.add('page-link');
    $pageLink.setAttribute('id', `pagelink-${value}`);
    $pageLink.innerText = value;

    $pageItem.appendChild($pageLink);

    const $pagination = document.querySelector('#pagination');
    $pagination.appendChild($pageItem);
};

export function ifPageSelected(selectedPage) {
    const offset = calculateOffset(selectedPage);
    loadingList();
    updatePagination(selectedPage)
    getOnePokemonPage(offset, 10).then(data => {
        let pokemonPageJson = data;
        updatePagination(selectedPage, pokemonPageJson);
        setTimeout(() => {createPokemonList(pokemonPageJson)}, 200);
    });
};

function updatePagination(selectedPage, pokemonPageJson) {
    updateActivePage(selectedPage)
    showPaginationItems(selectedPage);
    hidePaginationItems(selectedPage);

    if (pokemonPageJson !== undefined) {
        updateDisabledButtons(pokemonPageJson);
    }
};

function updateActivePage(selectedPage){
    const $allItems = document.querySelectorAll('.page-item');
    $allItems.forEach(element => {
        element.classList.remove('active');
    })

    const $selectedItem = document.querySelector(`#page-${selectedPage}`);
    $selectedItem.classList.add('active');
};

function updateDisabledButtons(pokemonPageJson) {
    const $previousButton = document.querySelector('#page-previous')
    
    if(pokemonPageJson.previous === null) {
        $previousButton.classList.add('disabled');
    } else {
        $previousButton.classList.remove('disabled');
    }

    const $nextButton = document.querySelector('#page-next')

    if(pokemonPageJson.next === null) {
        $nextButton.classList.add('disabled');
    } else {
        $nextButton.classList.remove('disabled');
    };
}

function showPaginationItems(selectedPage) {
    const followingPages = selectedPage + 3;
    const previousPages = selectedPage - 3;
    const $pageItems = document.querySelectorAll('.page-item');
    const totalPages = Number($pageItems.length) - 2;

    const dotPageItems = document.querySelectorAll('.dot-items');

    if (previousPages >= 1) {
        dotPageItems[0].classList.remove('not-display');
    };

    if (followingPages <= totalPages) {
        dotPageItems[1].classList.remove('not-display');
    }

    for(let i = selectedPage; i < followingPages; i++) {
        const pageItem = document.querySelector(`#page-${i}`);
        if (pageItem === null) { break; }
        pageItem.classList.remove('not-display');
    }

    for(let i = selectedPage; i > previousPages; i--) {
        const pageItem = document.querySelector(`#page-${i}`);
        if (pageItem === null) { break; }
        pageItem.classList.remove('not-display');
    }
};

function hidePaginationItems(selectedPage) { // works
    const followingPages = selectedPage + 3;
    const previousPages = selectedPage - 3;
    const $pageItems = document.querySelectorAll('.page-item');
    const totalPages = Number($pageItems.length) - 2;

    const dotPageItems = document.querySelectorAll('.dot-items');

    if (previousPages <= 0) {
        dotPageItems[0].classList.add('not-display');
    };

    if (followingPages >= totalPages - 1) {
        dotPageItems[1].classList.add('not-display');
    };


    if(!(previousPages < 1) && !(followingPages > totalPages)){
        for(let i = previousPages; i < Number(selectedPage); i--){
            if (i === 0) { break; }
            const pageItem = document.querySelector(`#page-${i}`);
            pageItem.classList.add('not-display');
        };

        for(let i = followingPages; i < $pageItems.length; i++){
            if (i === totalPages + 1) { break; }
            const pageItem = document.querySelector(`#page-${i}`);
            if (pageItem === null) { break; }
            pageItem.classList.add('not-display');
        };

    }else if (!(previousPages < 1)) {
        for(let i = previousPages; i < selectedPage; i--){
            if (i === 0) { break; }
            const pageItem = document.querySelector(`#page-${i}`);
            if (pageItem === null) { break; }
            pageItem.classList.add('not-display');
        };
    } else if (!(followingPages > totalPages)) {
        for(let i = followingPages; i < $pageItems.length; i++){
            if (i === totalPages + 1) { break; }
            const pageItem = document.querySelector(`#page-${i}`);
            if (pageItem === null) { break; }
            pageItem.classList.add('not-display');
        };
    };
};

export function managePageClick(event) {
    const clickedPage = event.target.id;
    let numberOfClickedPage = Number(clickedPage.split('-')[1]);

    if (clickedPage === 'pagination'){
        return '';
    }

    if (clickedPage === 'pagelink-previous'){
        const $activePage = document.querySelector("li.active").id
        const numberOfPreviousPage = Number($activePage.split('-')[1]) - 1;
        numberOfClickedPage = numberOfPreviousPage;
    }

    if (clickedPage === 'pagelink-next'){
        const $activePage = document.querySelector("li.active").id
        const numberOfNextPage = Number($activePage.split('-')[1]) + 1;
        numberOfClickedPage = numberOfNextPage;
    }

    ifPageSelected(numberOfClickedPage);
};


