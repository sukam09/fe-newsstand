const gridContainer = document.querySelector(".grid-box");
const dateContainer = document.querySelector(".header-right");
const leftArrow = document.querySelector(".arrow-left");
const rightArrow = document.querySelector(".arrow-right");
const header = document.querySelector(".header-left");
const pressCover = document.querySelector(".press-cover");

let crntPage = 0;
let pressIdxArray = Array.from(Array(96).keys()); // create array of consecutive numbers [0...95] - to be used in drawPress()


function shuffleArray(arr){
    for (let i = arr.length - 1; i>0;i--){
        const j = Math.floor(Math.random()*(i+1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}
function listenPressHover(){
    const pressItems = document.querySelectorAll(".pressItem");
    pressItems.forEach((item)=>{
        item.addEventListener("mouseover",()=>{
            pressCover.classList.remove("hidden");
            item.appendChild(pressCover);
            document.body.removeChild(pressCover);
        })
    })
}
function listenReload(){
    header.addEventListener("click", () => {
        window.location.reload();
    })
}
function listenArrow(){
    leftArrow.addEventListener("click",()=> {
        crntPage--;
        updateArrow();
        drawPress(crntPage);
    })
    rightArrow.addEventListener("click",() => {
        crntPage++;
        updateArrow();
        drawPress(crntPage);
    })
    
}
function updateArrow(){
    if (crntPage == 0){
        leftArrow.classList.add("hidden");
    } else if (crntPage == 3){
        rightArrow.classList.add("hidden");
    } else {
        leftArrow.classList.remove("hidden");
        rightArrow.classList.remove("hidden");
    }
  
}
function drawPress(idx){
    while (gridContainer.firstChild){
        gridContainer.removeChild(gridContainer.firstChild);
    }
    let shuffledArray = shuffleArray(pressIdxArray);

    for (let i=24*idx;i<24*(idx+1);i++){
        const pressElem = document.createElement("li");
        pressElem.classList.add("pressItem");
        const pressLogo = document.createElement("img");
        pressLogo.src = `./asset/logo/light/img${shuffledArray[i+1]}.svg`
        pressElem.appendChild(pressLogo);
        gridContainer.appendChild(pressElem);
    }
    listenPressHover();
}
function drawDate() {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let weekDay = ["일요일","월요일","화요일","수요일","목요일","금요일","토요일"]

    let fullDate = year + ". " + month + ". " + day + " " + weekDay[date.getDay()];
    let dateContent = document.createTextNode(fullDate);
    dateContainer.appendChild(dateContent);
}
function init(){
    drawDate();
    drawPress(crntPage);
    updateArrow();
    listenArrow();
    listenReload();   
}

window.onload = init;