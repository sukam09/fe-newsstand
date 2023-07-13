import {startRolling, mouseEventRolling} from './rolling.js';
import { pressViewChange } from './pressViewChange.js';
import { showDate } from './showTodayDate.js';
import { shuffleImgs, changePressGrid} from './pressGridList.js';

window.addEventListener('DOMContentLoaded', ()=>{
    showDate();
    shuffleImgs();
    startRolling();
    pressViewChange();
    mouseEventRolling("first");
    mouseEventRolling("second");
    changePressGrid();
});
