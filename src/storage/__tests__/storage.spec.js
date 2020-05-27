import {loadPokemonDataFromLocalStorage, savePokemonDataToLocalStorage} from '../storage.js'

beforeEach(() => {
    jest.spyOn(Storage.prototype, 'setItem')
});

afterEach(() => {
    localStorage.setItem.mockRestore()
  })

test("Saving to local storage", () => {
    savePokemonDataToLocalStorage('blastoise', {id:1})
    expect(localStorage.setItem).toHaveBeenCalledWith('blastoise', JSON.stringify({ id: 1 }))

});

