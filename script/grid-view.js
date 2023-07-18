import pressList from "../asset/data/pressList.js";
import { store } from "../store/store.js";
import { shuffleArray } from "../util/shuffleArray.js";

const gridContainer = document.querySelector(".grid-box");
const pressCover = document.querySelector(".press-cover");
const subBtn = document.querySelector(".sub-btn");
const unsubBtn = document.querySelector(".unsub-btn");

let pressIdxArray = Array.from(Array(pressList.length).keys()); // create array of consecutive numbers [0...95] - to be used in drawPress()
let subscribedPress = Array.from(Array(pressList.length/2).keys());  // array of subscribed press IDs


function checkSubscription(item){
    if (subscribedPress.includes(parseInt(item.getAttribute("index")))){
        subBtn.classList.add("hide");
        unsubBtn.classList.remove("hide");
    } else {
        subBtn.classList.remove("hide");
        unsubBtn.classList.add("hide");
    }
}
function listenPressHover(){
    const pressItems = document.querySelectorAll(".pressItem");
    pressItems.forEach((item)=>{
        item.addEventListener("mouseover",()=>{
            checkSubscription(item);
            pressCover.classList.remove("hidden");
            item.appendChild(pressCover);
        })
    })
    gridContainer.addEventListener("mouseout", () => {
        pressCover.classList.add("hidden");
    })
}
function drawPress(){
    gridContainer.innerHTML = "";
    let shuffledArray = shuffleArray(pressIdxArray);
    let crntPage = store.getPage()

    for (let i=24*crntPage;i<24*(crntPage+1);i++){
        gridContainer.innerHTML += `
            <li class="pressItem" index=${shuffledArray[i]+1}>
                <img src="./asset/logo/light/img${shuffledArray[i]+1}.svg" />
            </li>
        `
    }
    listenPressHover();
}

export {drawPress}