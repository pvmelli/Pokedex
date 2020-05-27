import { createPagination, ifPageSelected } from "./ui/pagination.js";
import { assignInitialEventListeners } from "./ui/general.js";

export function initialize() {
  createPagination();
  ifPageSelected(1);

  assignInitialEventListeners();
}
