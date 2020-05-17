export async function getOnePokemonPage(offset, limit) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/?offset=${offset}&limit=${limit}`);
    let data = await response.json();

    return data;
};

export async function loadPokemonDataFromApi (pokemonName) {
    const responseSingle = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const responseSpecies = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`);
    let data = [await responseSingle.json(), await responseSpecies.json()];

    return data;
};

