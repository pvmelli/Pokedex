import {
    createPagination,
    ifPageSelected
} from './ui/pagination.js';
import {assignInitialEventListeners} from './ui/general.js'

export function initialize() {
    window.onload = function () {
        createPagination();
        ifPageSelected(1);
    
        assignInitialEventListeners();
    };
};









