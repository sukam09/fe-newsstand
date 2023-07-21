import mainGrid from "./mainGrid.js";
import mainList from "./mainList.js";
import clickLeftAsideButton from "./clickLeftAsideButton.js";
import clickRightAsideButton from "./clickRightAsideButton.js";
import State from "../store/StateStore.js";
import controlListMinMaxException from "../utils/controlListlMinMaxException.js";

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
   if(State.getGridState()) {
      mainGrid();
      clickLeftAsideButton();
      clickRightAsideButton();
   }

   else{
      mainList();
      clickLeftAsideButton();
      clickRightAsideButton();
      progress();
   }
}