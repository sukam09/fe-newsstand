import { getElemId, getElemClass } from "../utils/getElements.js";
import { fetchData } from "../utils/getJson.js";

const page = [[], [], [], []];

const sectionPrevButton = getElemId(document, 'press-content-prev');
const sectionNextButton = getElemId(document, 'press-content-next');
const pressContentView = getElemClass(document, 'press-content-view');

let pageNumber = 0;

async function shuffleImgs() {
    const imgPath = await fetchData("../assets/data/newspaperSrc.json");
    const imgId = imgPath.newsList.map((elem)=> {
        return elem.id;
    })
    
    const shuffledArray = [...imgId].sort(() => Math.random() - 0.5);
    console.log(shuffledArray);
    shuffledArray.forEach((arr, idx) => {
        const pageIndex = Math.floor(idx / 24);
        page[pageIndex].push(arr);
      });

    let imgSrcContent = "";
    page[0].forEach((elem)=> {
        imgSrcContent +=`<li><img src="../assets/images/pressLogo/light/img${elem}.svg"</li>`;
    })
    pressContentView[0].innerHTML = imgSrcContent;
}

function showPressImg(flag) {
    const pressContentView = getElemClass(document, 'press-content-view');
    pageNumber = (flag >= 0) ? ++pageNumber : --pageNumber; 

    sectionPrevButton.style.visibility = pageNumber !== 0 ? "visible" : "hidden";
    sectionNextButton.style.visibility = pageNumber >= 3 ? "hidden" : "visible";
	let imgSrcContent = "";
    page[pageNumber].forEach((elem)=> {
        imgSrcContent +=`<li><img src="../assets/images/pressLogo/light/img${elem}.svg"</li>`;
    })
    pressContentView[0].innerHTML = imgSrcContent;
}

function changePressGrid() {
    sectionPrevButton.addEventListener('click',()=>showPressImg(-1));
    sectionNextButton.addEventListener('click', () => showPressImg(1));
}

export {shuffleImgs, changePressGrid};
