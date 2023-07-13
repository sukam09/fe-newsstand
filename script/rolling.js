import {getQuerySelector, getQuerySelectorAll} from "../utils/getElements.js";

let intervalFirstNewsbar;
let intervalSecondNewsbar;
function startRolling() {
    intervalFirstNewsbar = setInterval(()=> {
        rollingCb('first');
    }, 5000);
    
    intervalSecondNewsbar = setInterval(()=>{
        setTimeout(()=>{
            rollingCb('second');
        }, 1000)
    }, 5000);
}

function stopRolling(){
    clearInterval(intervalFirstNewsbar);
    clearInterval(intervalSecondNewsbar);
}

function mouseEventRolling(state) {
    const headlineNews = getQuerySelectorAll(document, `.newsbar-content-container-${state} li`);
    
    headlineNews.forEach((elem) => {
        elem.addEventListener('mouseover', () => {
            elem.style.textDecoration = "underline";
            elem.style.cursor = "pointer";
            stopRolling();
        })
    
        elem.addEventListener('mouseout', () => {
            elem.style.textDecoration = "none";
            elem.style.cursor = "auto";
            startRolling();
        })
    })
}

function rollingCb(state) {
    getQuerySelector(document,`.newsbar-content-container-${state} .prev`).classList.remove('prev');
    let current = getQuerySelector(document,`.newsbar-content-container-${state} .current`);
    current.classList.remove('current');
    current.classList.add('prev');

    let next = getQuerySelector(document,`.newsbar-content-container-${state} .next`);
    if(next.nextElementSibling == null) {
        getQuerySelector(document,`.newsbar-content-container-${state} li:first-child`).classList.add('next');
    } else {
        next.nextElementSibling.classList.add('next');
    }
    next.classList.remove('next');
    next.classList.add('current');
}

export {startRolling, mouseEventRolling};