import rollingList from "../asset/data/rollingList.js";

function listenHeadlineHover(target){
    target.addEventListener("mouseover", () => {
        target.classList.add("paused");
    })
    target.addEventListener("mouseout", () => {
        target.classList.remove("paused")
    })
}
function drawHeadline(target, data){
    target.innerHTML = "";
    data.forEach((item) => {
        target.innerHTML += `<span>${item.title}</span>`
    })
    target.innerHTML += `<span>${data[0].title}</span>` // repeat drawHeadline instantly when rolling-window shows the last headline
}
function rollHeadline(target, data, headlineIdx, sectionIdx, isFirstRoll) {
    if (headlineIdx >= rollingList.length){
        drawHeadline(target, data);
        headlineIdx = 0;
    }
    const crntHeadline = target.children[headlineIdx];

    // add 1 sec gap between left and right rolling sections
    if (isFirstRoll && sectionIdx == 1){ // right rolling section (initial roll)
        setTimeout(() => {
            crntHeadline.classList.add("roll");
        }, 1000);
    } else if (sectionIdx == 0 || (!isFirstRoll && sectionIdx == 1)){ // left rolling section & right rolling section from second round roll
        crntHeadline.classList.add("roll");
    }
    listenHeadlineHover(crntHeadline);
    crntHeadline.addEventListener("animationend", () => {
            headlineIdx++;
            target.children[headlineIdx].classList.add("roll");
            isFirstRoll = false
            rollHeadline(target,data,headlineIdx, sectionIdx, isFirstRoll);
    })
    
}

export {rollHeadline};