import mainGrid from "./mainGrid.js";
import mainList from "./mainList.js";
import clickLeftAsideButton from "./clickLeftAsideButton.js";
import clickRightAsideButton from "./clickRightAsideButton.js";
import State from "../state/Reducer.js";
import controlListMinMaxException from "../utils/controlListlMinMaxException.js";

let categoryProgress;

function progress() {
   categoryProgress = setTimeout(()=>{
      let currentPage = State.getCurrentPage();
      currentPage++;
      State.setCurrentPage(currentPage);
      controlListMinMaxException();
      mainNews();
   }, 10000);
}

export default function mainNews(){
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