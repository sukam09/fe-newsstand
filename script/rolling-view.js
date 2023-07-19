import rollingList from "../asset/data/rollingList.js";

const rollingContent = document.querySelectorAll(".rolling-content");

function handleHeadlineHover(target){
    target.addEventListener("mouseover", () => {
        target.classList.add("paused");
    })
    target.addEventListener("mouseout", () => {
        target.classList.remove("paused")
    })
}

function drawHeadline(target){
    target.innerHTML = "";
    rollingList.forEach((item) => {
        target.innerHTML += `<span>${item.title}</span>`
    })
    target.innerHTML += `<span>${rollingList[0].title}</span>` // repeat drawHeadline instantly when rolling-window shows the last headline

}

function rollHeadline(target, headlineIdx) {
    if (headlineIdx >= rollingList.length){
        drawHeadline(target);
        headlineIdx = 0;
    }
    
    const crntHeadline = target.children[headlineIdx];
    crntHeadline.classList.add("roll");
    handleHeadlineHover(crntHeadline);

    crntHeadline.addEventListener("animationend",() => {
        headlineIdx++;
        rollHeadline(target, headlineIdx);
    })
}

function rollInit(){
    rollingContent.forEach((item, index) => {
        if (index == 0){
            rollHeadline(item, rollingList.length);
        } else if (index == 1){
            item.innerHTML += `<span>${rollingList[0].title}</span>`
            setTimeout(() => {
                rollHeadline(item, rollingList.length);
            }, 1000);
        }
    })
}


export {rollInit};