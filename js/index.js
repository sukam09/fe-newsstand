/*
import { App } from "./app.js";
import { render } from "./core/index.js";
import { setHeaderDate } from "./Components/Header/Function/headerDate.js";
import { setRolling } from "./Components/Headline/Function/rolling.js";
import { renderNewspaper } from "./Components/NewsGrid/newspaper.js";
import { setGridPageButton } from "./Components/NewsGrid/pageButton.js";
import { constants } from "./Data/constants.js";
import { setListPageButton } from "./Components/NewsList/pageButton.js";
import { setFieldTab } from "./Components/NewsList/fieldTab.js";
// import { setViewerEvent } from "./Components/NavBar/newsViewer.js";

const $root = document.querySelector("#root");

// observer
const observer = new MutationObserver((mutations) => {
  console.log("DOM updated!");
  // setRolling();
  // setHeaderDate();
  // // setRolling();
  // renderNewspaper(constants.MIN_PAGE, constants.LIGHT_MODE);
  // setGridPageButton();
  // setListPageButton();
  // setFieldTab();
  // setViewerEvent();
  // setRolling();
  // setHeaderDate();
});
// MutationObserver 인스턴스를 생성하고 콜백 함수를 정의합니다.
// const observer = new MutationObserver((mutationsList) => {
//   for (let mutation of mutationsList) {
//     // 변화가 감지된 요소 또는 속성에 대한 작업을 수행합니다.
//     console.log("DOM updated!");
//     setRolling();
//     setHeaderDate();
//   }
// });

const option = {
  childList: true, // 자식 요소의 변경을 감지
  subtree: true, // 모든 하위 요소의 변경을 감지
};

observer.observe($root, option);

// 렌더링
render(App, $root);

*/

import App from "./app.js";

new App(document.querySelector("#root"));
