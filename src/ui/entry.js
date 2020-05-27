import {clearLoadingPopup} from '../ui/general.js';

export function managePokedexEntry(pokemonSingleData, pokemonSpeciesData){
    showPokedexEntry();
    clearPokedexEntry();
    fillPokedexEntry(pokemonSingleData, pokemonSpeciesData);
    scrollToPokedexEntry();

    clearLoadingPopup();
};

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

function fillPokedexEntry(pokemonSingleData, pokemonSpeciesData) {
    fillPokemonName(pokemonSingleData.name);
    fillPokemonSprite(pokemonSingleData.sprites.front_default);
    fillPokemonCharacteristics(pokemonSingleData, pokemonSpeciesData);
    fillPokemonFlavorText(pokemonSpeciesData.flavor_text_entries);
    fillPokemonAbilities(pokemonSingleData.abilities);
    fillPokemonStats(pokemonSingleData.stats);
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
        return `???`;
    } else if (heightString.length <= 1) {
        return `0.${heightString}m`;
    } else {
        return `${heightString.slice(0,1)}.${heightString.slice(1)}m`;
    };
};

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
        return `???`;
    }else if (weightString.length <= 1) {
        return `${weightString}kg`;
    } else if (weightString.length <= 2) {
        return `${weightString.slice(0,1)}.${weightString.slice(1)}kg`;       
    } else if (weightString.length <= 3) {
        return `${weightString.slice(0,2)}.${weightString.slice(2)}kg`;       
    } else if (weightString.length > 3) {
        return `${weightString.slice(0,3)}.${weightString.slice(3)}kg`;       
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
        return typesObject[0].type.name.toString();
    } else if (typesObject.length = 2){
        const type1 = typesObject[0].type.name;
        const type2 = typesObject[1].type.name;
        return `${type1},\n ${type2}`;
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
    container.setAttribute('id', `${statName.toUpperCase()}`)

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




