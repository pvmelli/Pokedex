function makeIdVisible() {
const mainContainer = document.querySelector('#main-container');
mainContainer.classList.remove('not-display');

const footer = document.querySelector('#footer');
footer.classList.remove('fixed');
};


function fetchInput () {
    const selectedPokemon = document.querySelector('#pokemon-select').value;

    return selectedPokemon;
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
    titleStats.innerText = 'Abilities';
    statsContainer.appendChild(titleStats);
};




