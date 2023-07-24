import { getQuerySelectorAll } from "../../utils/js/getElements.js";
import { fetchData } from "../../utils/js/getJson.js";
import { getState, register } from "../observer/observer.js";
import { gridPageIdx } from "../store/store.js";

const page = [[], [], [], []];

const pressContentView = getQuerySelectorAll(".press-content-view");

// Json 객체로부터 받아오는 뉴스 데이터의 id값 랜덤 셔플 후 첫번째 페이지 구현
async function shuffleImgs() {
  const imgPath = await fetchData("../assets/data/newspaperSrc.json");
  const imgId = imgPath.newsList.map((elem) => {
    return elem.id;
  });

  const shuffledArray = [...imgId].sort(() => Math.random() - 0.5);
  shuffledArray.forEach((arr, idx) => {
    const pageIndex = Math.floor(idx / 24);
    page[pageIndex].push(arr);
  });

  let imgSrcContent = "";
  page[0].forEach((elem) => {
    imgSrcContent += `<li><img src="../assets/images/pressLogo/light/img${elem}.svg"</li>`;
  });
  pressContentView[0].innerHTML = imgSrcContent;
  register(gridPageIdx, showPressImg);
}

// 각각의 페이지에 올바른 뉴스데이터 나타내기
function showPressImg() {
  const nowGridIdx = getState(gridPageIdx);
  let imgSrcContent = "";
  page[nowGridIdx].forEach((elem) => {
    imgSrcContent += `<li><img src="../assets/images/pressLogo/light/img${elem}.svg"</li>`;
  });
  pressContentView[0].innerHTML = imgSrcContent;
}

export { shuffleImgs };
