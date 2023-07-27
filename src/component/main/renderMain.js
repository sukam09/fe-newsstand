import mainGrid from "./mainGrid.js";
import mainList from "./mainList.js";
import clickLeftAsideButton from "./leftButton.js";
import clickRightAsideButton from "./rightButton.js";
import State from "../../store/StateStore.js";
import { GridState } from "../../store/viewStore.js";
import { getState } from "../../observer/observer.js";
import controlListMinMaxException from "../../utils/controlListlMinMaxException.js";

let categoryProgress;

function progress() {
   categoryProgress = setTimeout(()=>{
      let currentPage = State.getCurrentPage();
      currentPage++;
      State.setCurrentPage(currentPage);
      controlListMinMaxException();
      renderMain();
   }, 10000);
}

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
      // progress();
   }
}