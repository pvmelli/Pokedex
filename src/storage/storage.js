export function loadPokemonDataFromLocalStorage(pokemonName){
    let pokemonData = JSON.parse(localStorage.getItem(pokemonName));
    
    return pokemonData;
};

export function savePokemonDataToLocalStorage (pokemonName, pokemonData){
    try{
        localStorage.setItem(pokemonName, JSON.stringify(pokemonData));
    }catch(e){
        return '';
    }
};


