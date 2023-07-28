import mainGrid from "./mainGrid.js";
import mainList from "./mainList.js";
import clickLeftAsideButton from "./leftButton.js";
import clickRightAsideButton from "./rightButton.js";
import { GridState } from "../../store/viewStore.js";
import { getState } from "../../observer/observer.js";
let categoryProgress;

export default function renderMain(){
   clearInterval(categoryProgress);
   if(getState(GridState)) {
      mainGrid();
      clickLeftAsideButton();
      clickRightAsideButton();
   }

   else{
      mainList();
      clickLeftAsideButton();
      clickRightAsideButton();
   }
}