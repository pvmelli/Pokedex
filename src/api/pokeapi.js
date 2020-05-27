export async function getOnePokemonPage(offset, limit) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/?offset=${offset}&limit=${limit}`);
    let data = await response.json();

    return data;
};

export async function loadPokemonDataFromApi (pokemonName) {
    const responseSingle = loadSinglePokemonDataFromApi (pokemonName);
    const responseSpecies = loadSpeciesPokemonDataFromApi (pokemonName);
    let data = [await responseSingle, await responseSpecies];

    return data;
};

async function loadSinglePokemonDataFromApi (pokemonName) {
    const responseSingle = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

    return responseSingle.json();
};

async function loadSpeciesPokemonDataFromApi (pokemonName) {
    const responseSpecies = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`);

    return responseSpecies.json();

}

