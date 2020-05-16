


export function loadPokemonDataFromLocalStorage(pokemonName){
    let pokemonData = JSON.parse(localStorage.getItem(pokemonName));
    
    return pokemonData;
};

export function savePokemonDataToLocalStorage (pokemonName, pokemonData){
    localStorage.setItem(pokemonName, JSON.stringify(pokemonData));
 };


