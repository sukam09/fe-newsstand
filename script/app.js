import {startRolling, mouseEventRolling} from './rolling.js';
import { pressViewChange } from './pressViewChange.js';

window.addEventListener('DOMContentLoaded', ()=>{
    showDate();
    shuffleImgs();
    startRolling();
    pressViewChange();
    mouseEventRolling("first");
    mouseEventRolling("second");
});
