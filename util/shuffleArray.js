import { store } from "../store/store.js";

function shuffleArray(arr){
    for (let i = arr.length - 1; i>0;i--){
        const j = Math.floor(Math.random()*(i+1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    store.setShuffledList(arr);
    return arr.map(data => data + 1);
}

export {shuffleArray}