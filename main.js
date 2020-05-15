window.onload = function () {
    createPagination();
    ifPageSelected(1);

    const $pagination = document.querySelector('[id="pagination"]');
    $pagination.addEventListener('click',managePageClick);

    const $searchButton = document.querySelector('[id="search-button"]');
    $searchButton.addEventListener('click',manageSearch);
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

function manageSearch() {
    //show loading popup and then clear it;
    // go back to search bar and go back to top buttons
    const validatedInput = fetchInput();

    if (validatedInput === 'error'){
        return ''
    } else {
        fetchPokemonDataWithName(validatedInput)
        .then(data => {
            data ? managePokedexEntry(data) : false;
        });
    };
};

/*function search () {
    clearPokemonId();
    let input = fetchInput();

    makeIdVisible();

    fetchPokemonData(input);
};*/


