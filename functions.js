/* function makeIdVisible() {
const mainContainer = document.querySelector('#main-container');
mainContainer.classList.remove('not-display');

const footer = document.querySelector('#footer');
footer.classList.remove('fixed');
};

function fetchPokemonData(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then((response) => {
        return response.json();
    })
    .then((myJson) => {
        fillPokemonName(myJson.name);
        fillPokemonSprite(myJson.sprites.front_default);
        let heightWeightTypes = [myJson.height, myJson.weight, myJson.types]
        fillPokemonHeightWeightTypes(heightWeightTypes);
        fillAbilities(myJson.abilities);
        fillStats(myJson.stats);
    });
};

function fillPokemonName (pokemonName) {
    const pokemonNameSlot = document.querySelector('p[id="#mon-name"]');
    pokemonNameSlot.innerText = pokemonName.toUpperCase();
};

function fillPokemonSprite (spriteURL) {
    const pokemonSpriteSlot = document.querySelector('#sprite-container');
    const img = document.createElement('img');
    img.setAttribute('src', spriteURL);
    img.setAttribute('align', 'middle');

    pokemonSpriteSlot.appendChild(img);

};

function fillPokemonHeightWeightTypes(array) {
    const pokemonBasicsSlot = document.querySelector('#mon-basics');
    const monHeight = array[0];
    const monWeight = array[1];
    const monTypes = array[2];

    pokemonBasicsSlot.appendChild(fillTypes(monTypes));
    pokemonBasicsSlot.appendChild(fillHeight(monHeight));
    pokemonBasicsSlot.appendChild(fillWeight(monWeight));

};

function fillHeight(monHeight) {
    const heightString = monHeight.toString();
    let monHeightFormatted = '';
    if (heightString.length <= 1) {
        monHeightFormatted = '0.' + heightString + 'm';
    } else {
        monHeightFormatted = heightString.slice(0,1) + '.' + heightString.slice(1) + 'm';
    };

    const heightBox = document.createElement('div')
    heightBox.classList.add('btn-group');
    heightBox.setAttribute('role', 'group');

    const heightPrefix = document.createElement('button');
    heightPrefix.setAttribute('type', 'button');
    heightPrefix.classList.add('btn');
    heightPrefix.classList.add('btn-dark');
    heightPrefix.innerText = 'Height';

    const height = document.createElement('button');
    height.setAttribute('type', 'button');
    height.classList.add('btn');
    height.classList.add('btn-outline-dark');
    height.innerText = monHeightFormatted;

    heightBox.appendChild(heightPrefix);
    heightBox.appendChild(height);

    return heightBox;

};

function fillWeight(monWeight) {
    const weightString = monWeight.toString();
    let monWeightFormatted = '';
    if (weightString.length <= 1) {
        monWeightFormatted = weightString + 'kg';
    } else if (weightString.length <= 2) {
        monWeightFormatted = weightString.slice(0,1) + '.' + weightString.slice(1) + 'kg';       
    } else if (weightString.length <= 3) {
        monWeightFormatted = weightString.slice(0,2) + '.' + weightString.slice(2) + 'kg';       
    }

    const weightBox = document.createElement('div')
    weightBox.classList.add('btn-group');
    weightBox.setAttribute('role', 'group');

    const weightPrefix = document.createElement('button');
    weightPrefix.setAttribute('type', 'button');
    weightPrefix.classList.add('btn');
    weightPrefix.classList.add('btn-dark');
    weightPrefix.innerText = 'Weight';

    const weight = document.createElement('button');
    weight.setAttribute('type', 'button');
    weight.classList.add('btn');
    weight.classList.add('btn-outline-dark');
    weight.innerText = monWeightFormatted;

    weightBox.appendChild(weightPrefix);
    weightBox.appendChild(weight);

    return weightBox;
};

function fillTypes(monTypes) {

    let monTypesFormatted = [];

    if(monTypes.length <= 1) {
        monTypesFormatted.push(monTypes[0].type.name);
    } else {
        monTypesFormatted.push(monTypes[0].type.name);
        monTypesFormatted.push(monTypes[1].type.name);
    }

    const typesBox = document.createElement('div');
    typesBox.classList.add('btn-group');
    typesBox.setAttribute('role','group');

    const typesPrefix = document.createElement('button');
    typesPrefix.setAttribute('type','button');
    typesPrefix.classList.add('btn');
    typesPrefix.classList.add('btn-dark');
    typesPrefix.innerText = 'Types';

    const types = document.createElement('button');
    types.setAttribute('type','button');
    types.classList.add('btn');
    types.classList.add('btn-outline-dark');
    if (monTypesFormatted.length <= 1) {
        types.innerText = `${monTypesFormatted[0]}`
    } else {
        types.innerText = `${monTypesFormatted[0]},\n ${monTypesFormatted[1]}` 
    };

    typesBox.appendChild(typesPrefix);
    typesBox.appendChild(types);

    return typesBox;
};

function fillAbilities(abilities) {
    const abilityContainer = document.querySelector('#ability-container');
    for(let i = 0; abilities.length > i; i++) {
        let filling = abilityBox(abilities[i].ability.name, abilities[i].is_hidden);
        abilityContainer.appendChild(filling);
    };

};

function abilityBox(name, is_hidden) {
    const abilityBox = document.createElement('div');
    abilityBox.classList.add('btn-group');
    abilityBox.setAttribute('role','group');

    const nameButton = document.createElement('button');
    nameButton.setAttribute('type', 'button');
    nameButton.classList.add('btn');
    nameButton.classList.add('btn-outline-dark');
    nameButton.innerText = name.toUpperCase();

    const hiddenButton = document.createElement('button');
    hiddenButton.setAttribute('type', 'button');
    hiddenButton.classList.add('btn');
    hiddenButton.classList.add('btn-outline-dark');
    if (is_hidden) {
        hiddenButton.innerText = 'Hidden'
    } else {
        hiddenButton.innerText = 'Not hidden'
    };

    abilityBox.appendChild(nameButton)
    abilityBox.appendChild(hiddenButton);


    return abilityBox;
};

function fillStats(stats) {
    const statsContainer = document.querySelector('#stats-container');
    for (let i = 0; stats.length > i; i++) {
        let filling = statTable(stats[i].stat.name, stats[i].base_stat, stats[i].effort);
        statsContainer.appendChild(filling)
    };

};

function statTable(name, base, effort) {

    const table = document.createElement('table');
    table.classList.add('table');

    table.appendChild(statNameManager(name));

    const tableBody = document.createElement('tbody');

    tableBody.appendChild(statBaseManager(base));
    tableBody.appendChild(statEffortManager(effort));

    table.appendChild(tableBody);

return table;

};

function statNameManager(name) {
    const nameHead = document.createElement('thead');
    nameHead.classList.add('thead-dark');
    

    const nameContainer = document.createElement('th');
    nameContainer.setAttribute('colspan','2');
    nameContainer.classList.add('th');
    nameContainer.innerText = name.toUpperCase();
    

    const tr0 = document.createElement('tr');

    tr0.appendChild(nameContainer)
    nameHead.appendChild(tr0);

    return nameHead;
};

function statBaseManager(baseValue) {
    const baseHead = document.createElement('th');
    baseHead.setAttribute('scope','row');
    baseHead.innerText = 'Base';

    const baseValueContainer = document.createElement('td');
    baseValueContainer.innerText = baseValue;

    const tr1 = document.createElement('tr');

    tr1.appendChild(baseHead);
    tr1.appendChild(baseValueContainer);

    return tr1;

};

function statEffortManager(effortValue) {
    const effortHead = document.createElement('th');
    effortHead.setAttribute('scope','row');
    effortHead.innerText = 'Effort';

    const effortValueContainer = document.createElement('td');
    effortValueContainer.innerText = effortValue;

    const tr2 = document.createElement('tr');

    tr2.appendChild(effortHead);
    tr2.appendChild(effortValueContainer);

    return tr2;

};

function clearPokemonId (){
    const pokemonSpriteSlot = document.querySelector('#sprite-container');
    pokemonSpriteSlot.innerHTML = '';

    const pokemonBasicsSlot = document.querySelector('#mon-basics');
    pokemonBasicsSlot.innerHTML = '';
    const titleBasics = document.createElement('p');
    titleBasics.classList.add('title');
    titleBasics.innerText = 'Basics';
    pokemonBasicsSlot.appendChild(titleBasics);

    const abilityContainer = document.querySelector('#ability-container');
    abilityContainer.innerHTML = '';
    const titleAbilities = document.createElement('p');
    titleAbilities.classList.add('title');
    titleAbilities.innerText = 'Abilities';
    abilityContainer.appendChild(titleAbilities);

    const statsContainer = document.querySelector('#stats-container');
    statsContainer.innerHTML = '';
    const titleStats = document.createElement('p');
    titleStats.classList.add('title');
    titleStats.innerText = 'Stats';
    statsContainer.appendChild(titleStats);
};
*/

function fetchInput() {
    const rawInput = document.querySelector('#pokemon-field').value.trim();

    const inputValidationResult = validateInput(rawInput);

    if (inputValidationResult === 'success'){
        return rawInput;
    } else {
        showInputError(inputValidationResult)
        return 'error';
    };
};

function validateInput(inputName) {
     
    if(inputName.length === 0){
        return 'This field cannot be empty';
    };

    const onlyNumbersRegex = /^[0-9]*$/;
    if(onlyNumbersRegex.test(inputName)){
        return 'This field cannot contain numbers';
    };

    return 'success';

};

async function fetchPokemonDataWithName(pokemonName) {
    // try to search it in local storage, catch -->a la api con try
    try {
        const responseSingle = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        const responseSpecies = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`);
        let data = [await responseSingle.json(), await responseSpecies.json()];
        clearInputError();
        
        return data;

    }catch (error){
        showInputError('The name entered is invalid');
        return null;
    }
};

function clearInputError () {
    const $inputField = document.querySelector('#pokemon-field');
    $inputField.classList.remove('is-error');

    const $errorContainer = document.querySelector('#invalid-search');
    $errorContainer.classList.add('not-display');

};

function showInputError(error){
    const $inputField = document.querySelector('#pokemon-field');
    $inputField.classList.add('is-error');

    const $errorContainer = document.querySelector('#invalid-search');
    $errorContainer.classList.remove('not-display');
    $errorContainer.innerText = error;
};

function createPagination() { //works
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

function createPaginationItem(value) { //works
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
    //$pageLink.setAttribute('data-url', URL);
    $pageLink.setAttribute('id', `pagelink-${value}`);
    $pageLink.innerText = value;

    $pageItem.appendChild($pageLink);

    const $pagination = document.querySelector('#pagination');
    $pagination.appendChild($pageItem);
};

function ifPageSelected(selectedPage) {
    const offset = calculateOffset(selectedPage);
    loadingList();
    updatePagination(selectedPage)
    getOnePokemonPage(offset, 10).then(data => {
        let pokemonPageJson = data;
        updatePagination(selectedPage, pokemonPageJson);
        setTimeout(() => {createPokemonPage(pokemonPageJson)}, 200);
    });
    showPaginationItems(selectedPage);
    hidePaginationItems(selectedPage);
};

function showPaginationItems(selectedPage) { //works
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

function calculateOffset(selectedPage) {
    const limit = 10;
    const offset = (selectedPage - 1) * limit;
    
    return offset;
};

function updatePagination(selectedPage, pokemonPageJson) {
    if (pokemonPageJson === undefined) {
        updateActivePage(selectedPage);
    } else {
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

function loadingList() {
    $listGroup = document.querySelector('#pokemon-list');
    $listGroup.innerHTML = 'Loading...';
}

function createPokemonPage (pageJson) { //https://pokeapi.co/api/v2/pokemon-species/ json

    $listGroup = document.querySelector('#pokemon-list');
    $listGroup.innerHTML = '';

    pageJson.results.forEach(element => {
        const $listItem = document.createElement('li');
        $listItem.classList.add('list-group-item');
        $listItem.setAttribute('id', element.name);
        $listItem.innerText = element.name;
        
        $listGroup.appendChild($listItem);
    });
/* <ul class="list-group">
  <li class="list-group-item active">Cras justo odio</li>
  <li class="list-group-item">Dapibus ac facilisis in</li>
  <li class="list-group-item">Morbi leo risus</li>
  <li class="list-group-item">Porta ac consectetur ac</li>
  <li class="list-group-item">Vestibulum at eros</li>
</ul> */

};



async function getOnePokemonPage(offset, limit) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/?offset=${offset}&limit=${limit}`);
    let data = await response.json();

    return data;

};




