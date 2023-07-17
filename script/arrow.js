import pressList from "../asset/data/pressList.js"
import listViewData from "../asset/data/listViewData.js";
import { drawPress } from "./grid-view.js";
import { drawList } from "./list-view.js";

const leftArrow = document.querySelector(".arrow-left");
const rightArrow = document.querySelector(".arrow-right");

const categoryList = ["종합/경제","방송/통신","IT","영자지","스포츠/연예","매거진/전문지","지역"]

function updateArrow(crntView, crntPage){
    let maxPage;
    leftArrow.classList.remove("hidden");
    rightArrow.classList.remove("hidden");
    switch (crntView){
        case "grid":
            maxPage = pressList.length/24;
            if (crntPage == 0){
                leftArrow.classList.add("hidden");
            } else if (crntPage == maxPage-1){
                rightArrow.classList.add("hidden");
            }
            break;
        case "list":
            break;
    }
    
}
function listenArrow(crntView, crntPage, crntListIdx = 0){
    leftArrow.addEventListener("click",()=> {
        crntPage--;
        switch (crntView){
            case "grid":
                drawPress(crntPage);
                updateArrow(crntView, crntPage);
                break;
            case "list":
                if (crntPage == -1){
                    crntListIdx = crntListIdx == 0 ? categoryList.length-1 : crntListIdx-1;
                    crntPage = 0;
                }
                drawList(crntListIdx, crntPage);
                updateArrow(crntView, crntPage, crntListIdx);
                break;
        }
        
    })
    rightArrow.addEventListener("click",() => {
        crntPage++;
        switch (crntView){
            case "grid":
                drawPress(crntPage);
                updateArrow(crntView, crntPage);
                break;
            case "list":
                if (crntPage >= listViewData.filter(data => data.category == categoryList[crntListIdx]).length){
                    crntListIdx = crntListIdx == categoryList.length-1 ? 0 : crntListIdx+1;
                    crntPage = 0;
                }
                drawList(crntListIdx, crntPage);
                updateArrow(crntView, crntPage, crntListIdx)
                break;
        }
    })
    
}

export {updateArrow, listenArrow}