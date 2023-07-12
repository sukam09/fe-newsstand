import { checkPage } from "../utils/checkPage.js";
import { changeView } from "../utils/changeView.js";

const imgIndex = Array(96)
  .fill()
  .map((arr, i) => i + 1);
function shuffleImgIndex() {
  return [...imgIndex].sort(() => Math.random() - 0.5);
}
const shuffledPress = shuffleImgIndex();

let page = 1;

function MainView() {
  showGridView();
  checkPage(page);

  const headerElement = document.createElement("h1");
  headerElement.textContent = "여기에 헤더 컴포넌트의 내용을 작성하세요";

  return headerElement;
}

//TODO: 옮기기
function changePage(target) {
  if (target === "left") {
    page--;
  } else if (target === "right") {
    page++;
  }
  showGridView();
  checkPage(page);
}

function handleClick(e) {
  const target = e.target.id;
  switch (target) {
    case "grid-btn":
    case "grid-view-btn":
      page = 1;
      changeView("grid");
      showGridView();
      checkPage(page);
      break;
    case "list-btn":
    case "list-view-btn":
      page = 1;
      changeView("list");
      showListView();
      checkPage(page);
      break;
    case "left":
    case "right":
      changePage(target);
      break;
    default:
      break;
  }
}
function showGridView() {
  const main_list_ul = document.querySelector(".main-list-ul");
  main_list_ul.innerHTML = "";
  for (let i = 24 * (page - 1); i < 24 * page; i++) {
    const li = document.createElement("li");
    const img = document.createElement("img");
    img.setAttribute(
      "src",
      `../assets/images/logo/light/img${shuffledPress[i]}.svg`
    );
    main_list_ul.appendChild(li);
    li.appendChild(img);
  }
}
function showListView() {}

document.addEventListener("click", handleClick);

export { MainView };
