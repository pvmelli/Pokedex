import {createPagination} from './src/ui/pagination.js';
import {ifPageSelected} from './src/utilities/pagination.js';
import {assignInitialEventListeners} from './src/utilities/general.js'

export default function initialize() {
    window.onload = function () {
        createPagination();
        ifPageSelected(1);
    
        assignInitialEventListeners();
    };
};







