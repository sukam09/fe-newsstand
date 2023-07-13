import {startRolling, getNewsHeadline} from './rolling.js';
import { pressViewChange } from './pressViewChange.js';
import { showDate } from './showTodayDate.js';
import { shuffleImgs, changePressGrid} from './pressGridList.js';

window.addEventListener('DOMContentLoaded', ()=>{
    showDate();
    shuffleImgs();
    startRolling();
    pressViewChange();
    getNewsHeadline();
    changePressGrid();
});
