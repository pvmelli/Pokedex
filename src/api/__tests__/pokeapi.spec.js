import { initialize } from "../../pokedex.js";
import {getOnePokemonPage, loadPokemonDataFromApi} from '../pokeapi.js'

beforeEach(() => {
    global.fetch = jest.fn();
  });

test("Pokemon pages can be loaded correctly from the api", async () => {
    global.fetch.mockImplementation(() => new Promise((resolve) => {
        const jsonPromise = new Promise((r) => {
          r([]);
        });
        resolve({ json: () => jsonPromise });
      }));

      const BASE_SINGLE_URL = 'https://pokeapi.co/api/v2/pokemon/'
      const BASE_SPECIES_URL = 'https://pokeapi.co/api/v2/pokemon-species/';
    
      loadPokemonDataFromApi('blastoise');
    
      expect(global.fetch)
        .toHaveBeenCalledTimes(2);

      expect(global.fetch)
        .toHaveBeenCalledWith(`${BASE_SINGLE_URL}blastoise`);

        expect(global.fetch)
        .toHaveBeenCalledWith(`${BASE_SPECIES_URL}blastoise`)
});

test("The data of a pokemon can be loaded correctly from the api", () => {
    global.fetch.mockImplementation(() => new Promise((resolve) => {
        const jsonPromise = new Promise((r) => {
          r([]);
        });
        resolve({ json: () => jsonPromise });
      }));

      const BASE_URL = 'https://pokeapi.co/api/v2/pokemon-species/'
      const LIMIT = 10;
    
      getOnePokemonPage(0, 10);
    
      expect(global.fetch)
        .toHaveBeenCalledTimes(1);
      expect(global.fetch)
        .toHaveBeenCalledWith(`${BASE_URL}?offset=0&limit=${LIMIT}`);
});

