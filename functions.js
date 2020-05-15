function fetchInput() {
    const rawInput = document.querySelector('#pokemon-field').value.trim().toLowerCase();

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
    try {
        let pokemonData = loadPokemonDataFromLocalStorage(pokemonName);
        console.log(pokemonData);
        if (pokemonData === null){
            console.log('im throwing an error')
            throw error;
        } else {
            console.log('im returning data from LS')
            return pokemonData;
        }
    } catch (e) {
        console.log('this is the catch');
        try {
            let data = await loadPokemonDataFromApi (pokemonName);
            console.log(data);
            savePokemonDataToLocalStorage (pokemonName, data);
            clearInputError();
            makeNavButtonsVisible();
            console.log('im returning data from API')
            return data;
    
        }catch (error){
            console.log('the name is INVALIDIII!!')
            clearLoadingPopup();
            showInputError('The name entered is invalid');
            return null;
        }
    }

};

function loadPokemonDataFromLocalStorage(pokemonName){
let pokemonData = JSON.parse(localStorage.getItem(pokemonName));

return pokemonData;
};

// JSON.parse(localStorage.getItem('user'))

async function loadPokemonDataFromApi (pokemonName) {
    const responseSingle = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const responseSpecies = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`);
    let data = [await responseSingle.json(), await responseSpecies.json()];

    return data;
};

function savePokemonDataToLocalStorage (pokemonName, pokemonData){
    localStorage.setItem(pokemonName, JSON.stringify(pokemonData));
} 

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

function managePokedexEntry(pokemondata){
    showPokedexEntry();
    clearPokedexEntry();
    fillPokedexEntry(pokemondata);
    scrollToPokedexEntry();

    clearLoadingPopup();
};

function activateLoadingPopup() {
    const $loadingModal = document.querySelector('#loading-modal');
    $loadingModal.classList.remove('not-display');
};

function clearLoadingPopup() {
    const $loadingModal = document.querySelector('#loading-modal');
    $loadingModal.classList.add('not-display');
}

function clearPokedexEntry() {
    const $pokedexContainers = document.querySelectorAll('.pokedex-container');

    $pokedexContainers.forEach(container => {
        container.innerText = '';
    });
};

function showPokedexEntry(){
    const $pokedexEntry = document.querySelector('#pokedex-entry');
    $pokedexEntry.classList.remove('not-display');
};

function scrollToPokedexEntry() {
    const pokedexEntryMargin = document.querySelector('#top-navbuttons-row');
    pokedexEntryMargin.scrollIntoView();
};

function createGroupButton () {
    const box = document.createElement('div');
    box.classList.add('btn-group');
    box.classList.add('btn-box');
    box.setAttribute('role','group');

    return box;
};

function createPrefixButton (name, style) {
    const prefix = document.createElement('button');
    prefix.setAttribute('type', 'button');
    prefix.classList.add('btn');
    prefix.classList.add(style);
    prefix.innerText = name;

    return prefix;
};

function createValueButton(name, style) {
    const value = document.createElement('button');
    value.classList.add('btn');
    value.classList.add(style);
    value.innerText = name;

    return value;
};

function fillPokedexEntry(pokemondata) {
    const pokemonSingleData = pokemondata[0];
    const pokemonSpeciesData = pokemondata[1];
    fillPokemonName(pokemonSingleData.name);
    fillPokemonSprite(pokemonSingleData.sprites.front_default);
    fillPokemonCharacteristics(pokemonSingleData, pokemonSpeciesData);
    fillPokemonFlavorText(pokemonSpeciesData.flavor_text_entries);
    fillPokemonAbilities(pokemonSingleData.abilities);
    fillPokemonStats(pokemonSingleData.stats);
};

function fillPokemonName(name){
    const $nameContainer = document.querySelector("#pokemon-name");
    $nameContainer.innerText = name.toUpperCase();
};

function fillPokemonSprite(spriteURL){
    const $spriteContainer = document.querySelector('#sprite-container');

    let $image;
    if (spriteURL === null){
        $image = document.createElement('strong');
        $image.innerText = '???';
    } else {
        $image = document.createElement('img');
        $image.setAttribute('src', spriteURL);
        $image.classList.add('sprite');
    }

    $spriteContainer.appendChild($image);

}; 

function fillPokemonCharacteristics(pokemonSingleData, pokemonSpeciesData) {
    const $characteristicsContainer = document.querySelector('#characteristics');
    fillGeneration(pokemonSpeciesData.generation.name, $characteristicsContainer);
    fillHeight(pokemonSingleData.height.toString(), $characteristicsContainer);
    fillWeight(pokemonSingleData.weight.toString(), $characteristicsContainer);
    fillHabitat(pokemonSpeciesData.habitat, $characteristicsContainer)
    fillTypes(pokemonSingleData.types, $characteristicsContainer);
};

function fillGeneration(generation_x, container){
    const generation = generation_x.split('-');

    const genBox = createGroupButton();
    const genPrefix = createPrefixButton(generation[0].toUpperCase(),'btn-dark');
    const genValue = createValueButton(generation[1].toUpperCase(), 'btn-outline-dark');

    genBox.appendChild(genPrefix);
    genBox.appendChild(genValue);

    container.appendChild(genBox);
};

function fillHeight(heightDataString, container){
    const formattedHeight = heightFormatter(heightDataString);

    const heightBox = createGroupButton();
    const heightPrefix = createPrefixButton('HEIGHT', 'btn-dark');
    const heightValue = createValueButton(formattedHeight, 'btn-outline-dark');

    heightBox.appendChild(heightPrefix);
    heightBox.appendChild(heightValue);

    container.appendChild(heightBox);
};

function heightFormatter(heightString) {
    if (heightString === null) {
        return formattedHeight = `???`;
    } else if (heightString.length <= 1) {
        return formattedHeight = `0.${heightString}m`;
    } else {
        return formattedHeight = `${heightString.slice(0,1)}.${heightString.slice(1)}m`;
    };
}

function fillWeight(weightDataString, container) {

    const formattedWeight = weightFormatter(weightDataString);
    
    const weightBox = createGroupButton();
    const weightPrefix = createPrefixButton('WEIGHT', 'btn-dark');
    const weightValue = createValueButton(formattedWeight, 'btn-outline-dark');

    weightBox.appendChild(weightPrefix);
    weightBox.appendChild(weightValue);

    container.appendChild(weightBox);
};

function weightFormatter(weightString) {
    if(weightString === null){
        return formattedWeight = `???`;
    }else if (weightString.length <= 1) {
        return formattedWeight = `${weightString}kg`;
    } else if (weightString.length <= 2) {
        return formattedWeight = `${weightString.slice(0,1)}.${weightString.slice(1)}kg`;       
    } else if (weightString.length <= 3) {
        return formattedWeight = `${weightString.slice(0,2)}.${weightString.slice(2)}kg`;       
    } else if (weightString.length > 3) {
        return formattedWeight = `${weightString.slice(0,3)}.${weightString.slice(3)}kg`;       
    };
};

function fillHabitat(habitat, container){

    let formattedHabitat = '';
    if (habitat === null){
        formattedHabitat = '???'
    } else {
        formattedHabitat = habitatFormatter(habitat.name);
    }

    const habitatBox = createGroupButton();
    const habitatPrefix = createPrefixButton('HABITAT', 'btn-dark');
    const habitatValue = createValueButton(formattedHabitat, 'btn-outline-dark');

    habitatBox.appendChild(habitatPrefix);
    habitatBox.appendChild(habitatValue);

    container.appendChild(habitatBox);

};

function habitatFormatter(habitat) {
    if (habitat === null) {
        return formattedHabitat = '???';
    } else {
        return habitat;
    }
};

function fillTypes(typesObject, container){
    const formattedTypes = typeFormatter(typesObject);

    const typesBox = createGroupButton();
    const typesPrefix = createPrefixButton('TYPE', 'btn-dark');
    const typesValue = createValueButton(formattedTypes, 'btn-outline-dark');

    typesBox.appendChild(typesPrefix);
    typesBox.appendChild(typesValue);

    container.appendChild(typesBox);
};

function typeFormatter(typesObject) {
    if(typesObject.length <= 1){
        return formattedType = typesObject[0].type.name.toString();
    } else if (typesObject.length = 2){
        const type1 = typesObject[0].type.name;
        const type2 = typesObject[1].type.name;
        return formattedTypes = `${type1},\n ${type2}`;
    };
};





function fillPokemonFlavorText(flavorTextEntriesObject){
    const englishFlavorText = getEnglishText(flavorTextEntriesObject);
    const flavorTextContainer = document.querySelector('#flavor-text');
    const formattedFlavorText = flavorTextFormatter(englishFlavorText);

    flavorTextContainer.innerText = formattedFlavorText;

};

function getEnglishText(flavorTextEntriesObject){
    let englishEntries = []

    flavorTextEntriesObject.forEach(entry => {

        let language = entry.language.name;
        if (language === 'en'){
            englishEntries.push(entry.flavor_text);
        };
    });

    return englishEntries[0]
};

function flavorTextFormatter(flavorText){
    const flavorTextPieces = flavorText.split('\n');
    const formatedFlavorText = flavorTextPieces.join(' ');

    return formatedFlavorText;
};

function fillPokemonAbilities(pokemonAbilities){
    const $abilitiesContainer = document.querySelector('#abilities');

    pokemonAbilities.forEach(ability => {
        let abilityBox = createGroupButton()        
        let abilityName = createPrefixButton(ability.ability.name.toUpperCase(), 'btn-outline-dark');        
        let abilityHidden = createValueButton(ability.is_hidden, 'btn-outline-dark');
        if(abilityHidden.innerText === 'true') {
            abilityHidden.innerText = 'Hidden'
        } else {
            abilityHidden.innerText = 'Not hidden'
        }

        abilityBox.appendChild(abilityName);
        abilityBox.appendChild(abilityHidden);

        $abilitiesContainer.appendChild(abilityBox);
    });
};

function fillPokemonStats(pokemonStats) {
    const $statsContainer = document.querySelector('#stats');

    pokemonStats.forEach(stat => {

        let statTable = createStatTable(stat.stat.name, stat.base_stat, stat.effort);

        $statsContainer.appendChild(statTable);

    });
};

function createStatTable(statName, statBase, statEffort) {
    const container = document.createElement('table');
    container.classList.add('table');

    container.appendChild(createTH(statName));

    const body = document.createElement('tbody');

    body.appendChild(createTBRow('Base', statBase));
    body.appendChild(createTBRow('Effort', statEffort));
    
    container.appendChild(body);
    
    return container;
};

function createTH(name) {
    const head = document.createElement('thead');
    head.classList.add('thead-dark');

    const row = document.createElement('tr');

    const nameContainer = document.createElement('th');
    nameContainer.setAttribute('colspan','2');
    nameContainer.classList.add('th');
    nameContainer.innerText = name.toUpperCase();

    row.appendChild(nameContainer);
    head.appendChild(row);

    return head;
};

function createTBRow(name, value){

    const row = document.createElement('tr');

    const head = document.createElement('th');
    head.setAttribute('scope','row');
    head.innerText = name;

    const valueContainer = document.createElement('td');
    valueContainer.innerText = value;

    row.appendChild(head);
    row.appendChild(valueContainer);

    return row;
};

function createPagination() { 
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
        $listItem.classList.add('list-group-item-action');
        $listItem.setAttribute('id', element.name);
        $listItem.innerText = element.name;
        
        $listGroup.appendChild($listItem);
    });
};



async function getOnePokemonPage(offset, limit) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/?offset=${offset}&limit=${limit}`);
    let data = await response.json();

    return data;

};

function makeNavButtonsVisible(){
    const $navButtonContainers = document.querySelectorAll('.nav-container');
    $navButtonContainers.forEach($container => {
        $container.classList.remove('not-display')
    });
};




