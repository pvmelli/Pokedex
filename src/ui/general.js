export function activateLoadingPopup() {
    const $loadingModal = document.querySelector('#loading-modal');
    $loadingModal.classList.remove('not-display');
};

export function clearLoadingPopup() {
    const $loadingModal = document.querySelector('#loading-modal');
    $loadingModal.classList.add('not-display');
}

export function makeNavButtonsVisible(){
    const $navButtonContainers = document.querySelectorAll('.nav-container');
    $navButtonContainers.forEach($container => {
        $container.classList.remove('not-display')
    });
};

