import { initialize } from "../pokedex.js";
import fixture from "./pokedex.fixture.js";
import firstPage from "../../cypress/fixtures/page_01.json";

test("Initialize pokedex", () => {
  document.body.innerHTML = fixture;
  global.fetch = jest.fn().mockImplementation(
    () =>
      new Promise(() => {
        const jsonPromise = new Promise((r) => {
          r(firstPage);
        });
      })
  );

  initialize();
  expect(document.querySelectorAll(".page-item")).toHaveLength(85);

  expect(document.querySelector("#page-1").getAttribute("class"))
  .toEqual(expect.stringContaining("active"));

  expect(global.fetch).toHaveBeenCalledTimes(1);

  setTimeout(() => {
    expect(
      document.querySelectorAll("#pokemon-list .list-group-item")
    ).toHaveLength(10);
  }, 15000);
});
