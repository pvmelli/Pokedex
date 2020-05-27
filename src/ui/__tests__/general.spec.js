import { initialize } from "../../pokedex.js";
import {activateLoadingPopup, clearLoadingPopup, makeNavButtonsVisible} from '../general.js';
import fixture from "../../__tests__/pokedex.fixture";

test("Loading popup", () => {
    document.body.innerHTML = fixture;
  
    initialize()

    activateLoadingPopup()

    expect(document.querySelector('#loading-modal').getAttribute("class"))
    .toEqual(expect.not.stringContaining("not-display"));

    clearLoadingPopup()

    expect(document.querySelector('#loading-modal').getAttribute("class"))
    .toEqual(expect.stringContaining("not-display"));

});

test("Nav buttons display", () => {
    document.body.innerHTML = fixture;
  
    initialize();

    const allNavButtons = document.querySelectorAll('.nav-container');

    allNavButtons.forEach((navButton) => {
        expect(navButton.getAttribute("class"))
        .toEqual(expect.stringContaining("not-display"));
    });

    makeNavButtonsVisible();

    allNavButtons.forEach((navButton) => {
        expect(navButton.getAttribute("class"))
        .toEqual(expect.not.stringContaining("not-display"));
    });    

});

