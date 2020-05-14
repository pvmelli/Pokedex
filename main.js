window.onload = function () {
    createPagination();
    ifPageSelected(1);

    let $pagination = document.querySelector('[id="pagination"]');
    $pagination.addEventListener('click',managePageClick);
};



function managePageClick(event) {
    const clickedPage = event.target.id
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
}

/*function search () {
    clearPokemonId();
    let input = fetchInput();

    makeIdVisible();

    fetchPokemonData(input);
};*/


