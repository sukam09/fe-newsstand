import { URL } from "../../asset/data/constants.js";
import { getJSON } from "../../util/getJSON.js";

const rollingContent = document.querySelectorAll(".rolling-content");

function handleHeadlineHover(target){
    target.addEventListener("mouseover", () => {
        target.classList.add("paused");
    })
    target.addEventListener("mouseout", () => {
        target.classList.remove("paused")
    })
}

function drawHeadline(rollingData, target){
    target.innerHTML = "";
    rollingData.forEach((item) => {
        target.innerHTML += `<span>${item.title}</span>`
    })
    target.innerHTML += `<span>${rollingData[0].title}</span>` // repeat drawHeadline instantly when rolling-window shows the last headline

}

function rollHeadline(rollingData, target, headlineIdx = 0) {
    if (headlineIdx >= rollingData.length){
        drawHeadline(rollingData,target);
        headlineIdx = 0;
    }
    
    const crntHeadline = target.children[headlineIdx];
    crntHeadline.classList.add("roll");
    handleHeadlineHover(crntHeadline);

    crntHeadline.addEventListener("animationend",() => {
        headlineIdx++;
        rollHeadline(rollingData, target, headlineIdx);
    })
}

async function initRoll(){
    const rollingData = await getJSON(URL.ROLLING_DATA);
    rollingContent.forEach((item, index) => {
        drawHeadline(rollingData, item);

        if (index == 0){ 
            // left rolling section
            rollHeadline(rollingData, item, rollingData.length);
        } else if (index == 1){ 
            // right rolling section
            item.innerHTML += `<span>${rollingData[0].title}</span>`
            setTimeout(() => {
                rollHeadline(rollingData, item, rollingData.length);
            }, 1000);
        }
    })
}


export {initRoll};