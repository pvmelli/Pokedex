export function assignEventListener (targetId, eventType, eventFunction) {
    const target = document.querySelector(targetId);
    target.addEventListener(eventType, eventFunction);
};

export function assignScrollEventListener (targetId, eventType, scrollToTargetId) {
    const target = document.querySelector(targetId);
    const scrollToTarget = document.querySelector(scrollToTargetId);
    target.addEventListener(eventType, () => {scrollToTarget.scrollIntoView()});
};

export function assignScrollToTopEventListener (targetId, eventType){
    const target = document.querySelector(targetId);
    target.addEventListener(eventType, () => {document.documentElement.scrollTop = 0});

};

export function calculateOffset(selectedPage) {
    const limit = 10;
    const offset = (selectedPage - 1) * limit;
    
    return offset;
};



