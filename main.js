window.onload = function () {
    createPagination();
    ifPageSelected(1);

    assignInitialEventListeners();
};

function assignInitialEventListeners() {
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


function managePageClick(event) {
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

function manageSearch() {
    const validatedInput = fetchInput();

    if (validatedInput === 'error'){
        return ''
    } else {
        activateLoadingPopup();
        fetchPokemonDataWithName(validatedInput)
        .then(data => {
            data ? managePokedexEntry(data) : false;
        });
        makeNavButtonsVisible();
    };
};

function manageListClick(event) {
    const clickedPokemon = event.target.id;

    activateLoadingPopup();
    fetchPokemonDataWithName(clickedPokemon)
    .then(data => {
        data ? managePokedexEntry(data) : false;
    });
    makeNavButtonsVisible();
};




