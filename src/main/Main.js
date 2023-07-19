import { shuffled_data } from "../../data/shuffled_data.js";
import listArticle from "../../data/list_article.json" assert { type: "json"};

import mainGrid from "./mainGrid.js";
import mainList from "./mainList.js";
import clickLeftAsideButton from "./clickLeftAsideButton.js";
import clickRightAsideButton from "./clickRightAsideButton.js";

let categoryProgress;

function progress(isAll, view, currentPageNum, categoryNum) {
   categoryProgress = setTimeout(()=>{
       main(isAll, view, currentPageNum + 1, categoryNum);
   }, 10000);
}

function setButtonVisivility(leftVisibility, rightVisibility){
   const leftAsideButton = document.getElementById("aside-left");
   const rightAsideButton = document.getElementById("aside-right");
   leftAsideButton.style.visibility = leftVisibility;
   rightAsideButton.style.visibility = rightVisibility;
}

function controlGridMinMaxException(MIN_PAGE_NUMBER, MAX_PAGE_NUMBER, currentPageNum){
   if (currentPageNum <= MIN_PAGE_NUMBER){
      setButtonVisivility("hidden", "visible");
   }
   else if(currentPageNum >= MAX_PAGE_NUMBER){
      setButtonVisivility("visible", "hidden");
   }
}


function controlListMinMaxException(MIN_PAGE_NUMBER, MAX_PAGE_NUMBER, currentPageNum, categoryNum){
      if(currentPageNum < MIN_PAGE_NUMBER){
         categoryNum--;
         if(categoryNum < 0){
            categoryNum = listArticle.length-1;
         }
         currentPageNum = listArticle[categoryNum].news.length;
      }
      else if(currentPageNum > MAX_PAGE_NUMBER){
         categoryNum++;
         if(categoryNum > listArticle.length-1){
            categoryNum = categoryNum % 7;
         }
         currentPageNum = 1;
      }
      return [currentPageNum, categoryNum];
}

export default function main(isAll, view, currentPageNum, categoryNum){
   clearInterval(categoryProgress);
   if(view === "grid") {
      controlGridMinMaxException(1, parseInt(shuffled_data.length / 24), currentPageNum);
      mainGrid(isAll, currentPageNum);
      clickLeftAsideButton();
      clickRightAsideButton();
   }

   else if(view === "list") {
      setButtonVisivility("visible", "visible");
      [currentPageNum, categoryNum] = controlListMinMaxException(1, listArticle[categoryNum].news.length, currentPageNum, categoryNum);
      mainList(isAll,view, currentPageNum, categoryNum);
      clickLeftAsideButton();
      clickRightAsideButton();
      progress(isAll,view, currentPageNum, categoryNum);
   }
}