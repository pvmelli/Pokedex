import {calculateOffset} from '../utilities/general.js';
import {
    loadingList,
    createPokemonPage
} from '../ui/list.js'
import {updatePagination} from '../ui/pagination.js'
import {getOnePokemonPage} from '../services/pokeapi.js';


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

export function ifPageSelected(selectedPage) {
    const offset = calculateOffset(selectedPage);
    loadingList();
    updatePagination(selectedPage)
    getOnePokemonPage(offset, 10).then(data => {
        let pokemonPageJson = data;
        updatePagination(selectedPage, pokemonPageJson);
        setTimeout(() => {createPokemonPage(pokemonPageJson)}, 200);
    });
};

