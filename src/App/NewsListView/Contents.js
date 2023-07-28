/* 
리스트 뷰  컨테이너 컴포넌트
*/
import Component from "../../utils/Component.js";
import { listStore, categoryNews, pressNews } from "../../store/ListStore.js";
import { mainStore, ALL, MY, setPress } from "../../store/MainStore.js";
import { addPress, pressStore } from "../../store/PressStore.js";
import getRandomIndexArr from "../../api/getRandomIndexArr.js";
import Alert from "../Modal/Alert.js";
import SnackBar from "../Modal/SnackBar.js";

const subscribeButtonInner = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M19 12.998H13V18.998H11V12.998H5V10.998H11V4.99799H13V10.998H19V12.998Z"/></svg>구독하기`;

const unsubscribeButtonInner = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<rect x="0.5" y="0.5" width="23" height="23" rx="11.5"/>
<path d="M9.6 15L9 14.4L11.4 12L9 9.6L9.6 9L12 11.4L14.4 9L15 9.6L12.6 12L15 14.4L14.4 15L12 12.6L9.6 15Z" fill="#879298"/>
<rect x="0.5" y="0.5" width="23" height="23" rx="11.5" stroke="#D2DAE0"/>
</svg>`;

const getEditDate = function (regDate) {
  let [date, time] = regDate.split(" ");

  let year = date.substring(0, 4);
  let month = date.substring(4, 6);
  let day = date.substring(6, 8);

  date = `${year}.${month}.${day}`;
  time = time.substring(0, 5);

  return `${date} ${time} 편집`;
};

const isSubscribed = (id) => {
  let pressId = Number(id) - 1;
  return pressStore.getState().pressArr.indexOf(String(pressId)) > -1;
};

const createSubNews = (titles) => {
  let inner = titles.reduce(
    (accumulator, currentValue) =>
      accumulator + `<li class="sub-title">${currentValue.title}</li>`,
    ""
  );
  return inner;
};
function Contents($target, props) {
  this.indexArr;
  this.prevCategory = undefined;
  Component.call(this, $target, props);

  mainStore.subscribe(this.setUp);
  listStore.subscribe(this.setUp);
}

Object.setPrototypeOf(Contents.prototype, Component.prototype);

Contents.prototype.template = function () {
  if (
    mainStore.getState().pressType === ALL &&
    this.prevCategory !== listStore.getState().category
  ) {
    this.prevCategory = listStore.getState().category;
    this.indexArr = getRandomIndexArr(listStore.getState().lastPage);
  }

  let content;
  let currCategory = listStore.getState().category;
  let currPage = listStore.getState().page;
  let id;

  if (mainStore.getState().pressType === ALL) {
    content = categoryNews[currCategory][this.indexArr[currPage - 1]];
    id = content.pid;
  } else {
    id = Number(pressStore.getState().pressArr[currCategory]) + 1;
    content = pressNews[id];
  }

  if (content) {
    let mode = document.body.className ? "Dark" : "Light";

    let imgSrc = content[`logo${mode}`];

    return `
  <header class="list-header">
    <img src="${imgSrc.url}" class="press-img">
    <div class="list-edit">${getEditDate(content.regDate)}</div>
    <button ${isSubscribed(id) ? "" : `class="subscribe-btn"`}
    data-key=${Number(id) - 1}>
    ${isSubscribed(id) ? unsubscribeButtonInner : subscribeButtonInner}</button>
  </header>
  <div class="list-news">
    <div class="main-news">
      <div class="img-container">
        <img src="${content.materials[0].image.url}">
      </div>
      <div class="main-title">
      ${content.materials[0].title}
      </div>
    </div>
    <div class="sub-news">
      <ul>${createSubNews(content.materials.slice(1, 7))}
      <li class="caption">${
        content.name
      } 언론사에서 직접 편집한 뉴스입니다.</li>
    </ul>
    </div>
  </div>
  `;
  }
  return "";
};

Contents.prototype.setEvent = function () {
  const $el = this.$el;
  const $button = this.$el.querySelector("button");

  if ($button) {
    $button.addEventListener("click", ({ currentTarget }) => {
      if (currentTarget.className === "subscribe-btn") {
        let newPress = pressStore.getState().pressArr;
        newPress.push($button.dataset.key);

        $button.classList.remove("subscribe-btn");
        $button.innerHTML = unsubscribeButtonInner;

        let newAction = addPress(newPress);
        pressStore.dispatch(newAction);

        new SnackBar($el, {});
      } else {
        new Alert(this.$el.parentNode, {
          ...this.props,
          id: Number(currentTarget.dataset.key),
        });
      }
    });
  }
};
export default Contents;
