function search () {
    clearPokemonId();
    let input = fetchInput();

    makeIdVisible();

    fetchPokemonData(input);
};


