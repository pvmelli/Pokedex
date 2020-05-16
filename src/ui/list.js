export function loadingList() {
    const $listGroup = document.querySelector('#pokemon-list');
    $listGroup.innerHTML = 'Loading...';
}

export function createPokemonPage (pageJson) {

    const $listGroup = document.querySelector('#pokemon-list');
    $listGroup.innerHTML = '';

    pageJson.results.forEach(element => {
        const $listItem = document.createElement('li');
        $listItem.classList.add('list-group-item');
        $listItem.classList.add('list-group-item-action');
        $listItem.setAttribute('id', element.name);
        $listItem.innerText = element.name;
        
        $listGroup.appendChild($listItem);
    });
};