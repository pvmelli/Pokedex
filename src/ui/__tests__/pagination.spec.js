import { initialize } from "../../pokedex.js";
import {managePageClick} from "../pagination.js";
import fixture from "../../__tests__/pokedex.fixture";
import firstPage from "../../../cypress/fixtures/page_01.json";

describe ("Manage page clicks", () => {
  document.body.innerHTML = fixture;

  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(
      () =>
        new Promise(() => {
          const jsonPromise = new Promise((r) => {
            r(firstPage);
          });
          resolve({ json: () => jsonPromise });
        })
    );
  
    initialize() 
  })
  test("Manage click on first page", () => {

    const EVENT_MOCK_01 = {target: {id: "page-1"}};
  
    managePageClick(EVENT_MOCK_01);
    
    expect(global.fetch)
    .toHaveBeenLastCalledWith(`https://pokeapi.co/api/v2/pokemon-species/?offset=0&limit=10`)
  
    expect(document.querySelector("#page-1").getAttribute("class"))
    .toEqual(expect.stringContaining("active"));
    
      expect(document.querySelector("#page-previous").getAttribute("class"))
    .toEqual(expect.stringContaining("disabled"));
  
    expect(document.querySelector("#page-next").getAttribute("class"))
    .toEqual(expect.not.stringContaining("disabled"));
  
    expect(document.querySelector("#page-7").getAttribute("class"))
    .toEqual(expect.stringContaining("not-display"));
  
    expect(document.querySelector("#page-dotsprev").getAttribute("class"))
    .toEqual(expect.stringContaining("not-display"));
  
  });
  
  test("Manage click on fifth page", () => { 

      const EVENT_MOCK_05 = {target: {id: "page-5"}};
    
      managePageClick(EVENT_MOCK_05);
    
      expect(global.fetch)
      .toHaveBeenLastCalledWith(`https://pokeapi.co/api/v2/pokemon-species/?offset=40&limit=10`)
    
      expect(document.querySelector("#page-5").getAttribute("class"))
      .toEqual(expect.stringContaining("active"));
    
      expect(document.querySelector("#page-1").getAttribute("class"))
      .toEqual(expect.not.stringContaining("active"));
      
      expect(document.querySelector("#page-previous").getAttribute("class"))
      .toEqual(expect.not.stringContaining("disabled"));
    
      expect(document.querySelector("#page-next").getAttribute("class"))
      .toEqual(expect.not.stringContaining("disabled"));
    
      expect(document.querySelector("#page-1").getAttribute("class"))
      .toEqual(expect.stringContaining("not-display"));
    
      expect(document.querySelector("#page-50").getAttribute("class"))
      .toEqual(expect.stringContaining("not-display"));
    
      expect(document.querySelector("#page-dotsprev").getAttribute("class"))
      .toEqual(expect.not.stringContaining("not-display"));
    
      expect(document.querySelector("#page-dotsnext").getAttribute("class"))
      .toEqual(expect.not.stringContaining("not-display"));
    
    
    });
  
    test("Manage click on last page", () => {
  
      const EVENT_MOCK_81 = {target: {id: "page-81"}};
    
      managePageClick(EVENT_MOCK_81);
    
      expect(global.fetch)
      .toHaveBeenLastCalledWith(`https://pokeapi.co/api/v2/pokemon-species/?offset=800&limit=10`)
    
      expect(document.querySelector("#page-81").getAttribute("class"))
      .toEqual(expect.stringContaining("active"));
    
      expect(document.querySelector("#page-5").getAttribute("class"))
      .toEqual(expect.not.stringContaining("active"));
      
      expect(document.querySelector("#page-previous").getAttribute("class"))
      .toEqual(expect.not.stringContaining("disabled"));
    
      expect(document.querySelector("#page-next").getAttribute("class"))
      .toEqual(expect.stringContaining("disabled"));
    
      expect(document.querySelector("#page-50").getAttribute("class"))
      .toEqual(expect.stringContaining("not-display"));    
    });
})

describe ("Manage clicks on previous and next buttons", () => {
  document.body.innerHTML = fixture;
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(
      () =>
        new Promise(() => {
          const jsonPromise = new Promise((r) => {
            r(firstPage);
          });
          resolve({ json: () => jsonPromise });
        })
    );

    initialize() 
  })
  test("Manage click on previous button", () => {
    const EVENT_MOCK_81 = {target: {id: "page-81"}};
  
    managePageClick(EVENT_MOCK_81);

    expect(document.querySelector("#page-81").getAttribute("class"))
    .toEqual(expect.stringContaining("active"));
  
    const EVENT_MOCK_PREV = {target: {id: "pagelink-previous"}};
  
    managePageClick(EVENT_MOCK_PREV);

    expect(document.querySelector("#page-81").getAttribute("class"))
    .toEqual(expect.not.stringContaining("active"));

    expect(document.querySelector("#page-80").getAttribute("class"))
    .toEqual(expect.stringContaining("active"));
  
    expect(global.fetch)
    .toHaveBeenLastCalledWith(`https://pokeapi.co/api/v2/pokemon-species/?offset=790&limit=10`)

  
});

test("Manage click on next button", () => {
    const EVENT_MOCK_01 = {target: {id: "page-1"}};
  
    managePageClick(EVENT_MOCK_01);

    expect(document.querySelector("#page-1").getAttribute("class"))
    .toEqual(expect.stringContaining("active"));
  
    const EVENT_MOCK_NEXT = {target: {id: "pagelink-next"}};
  
    managePageClick(EVENT_MOCK_NEXT);

    expect(document.querySelector("#page-1").getAttribute("class"))
    .toEqual(expect.not.stringContaining("active"));

    expect(document.querySelector("#page-2").getAttribute("class"))
    .toEqual(expect.stringContaining("active"));
  
    expect(global.fetch)
    .toHaveBeenLastCalledWith(`https://pokeapi.co/api/v2/pokemon-species/?offset=10&limit=10`)  
});
})




