import {startRolling, mouseEventRolling} from './rolling.js';


window.addEventListener('DOMContentLoaded', ()=>{
    showDate();
    shuffleImgs();
    startRolling();
    mouseEventRolling("first");
    mouseEventRolling("second");
});
