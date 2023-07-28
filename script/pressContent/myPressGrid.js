import {
  getQuerySelector,
  getQuerySelectorAll,
} from "../../utils/js/getElements.js";
import { getState, setState, register } from "../observer/observer.js";
import { allOfPress, isSubscribed, subscribedPress } from "../store/store.js";

const pressContentMyView = getQuerySelector(".press-content-my-grid-view");

export function showMyPressImg() {
  let imgSrcContent = "";
  for (let i = 0; i < 24; i++) {
    imgSrcContent += `<li></li>`;
  }
  pressContentMyView.innerHTML = imgSrcContent;
  getSubscribedData();
}

function getSubscribedData() {
  let imgSrcContent = "";
  const subscribedList = getState(subscribedPress);
  const subscribedPressNum = subscribedList.length;
  subscribedList.forEach(
    (elem) =>
      (imgSrcContent += `
      <li>
        <img src="../assets/images/pressLogo/light/img${elem}.svg" data-key=${elem}>
        <button class="my-grid-view-btn-unsub hidden">x 해지하기</button>
      </li>`)
  );

  for (let i = subscribedPressNum; i < 24; i++) {
    imgSrcContent += `<li></li>`;
  }
  pressContentMyView.innerHTML = imgSrcContent;
  showSubscribeBtn();
  setSubClickEvents();
}

function showSubscribeBtn() {
  const eachElementOfGrid = getQuerySelectorAll(
    ".press-content-my-grid-view li"
  );
  eachElementOfGrid.forEach((elem) => {
    elem.addEventListener("mouseover", () => {
      if (!elem.firstChild) return;
      elem.children[0].classList.remove("show");
      elem.children[0].classList.add("hidden");

      elem.children[1].classList.remove("hidden");
      elem.children[1].classList.add("show");
    });
  });

  eachElementOfGrid.forEach((elem) => {
    elem.addEventListener("mouseout", () => {
      if (!elem.firstChild) return;
      elem.children[0].classList.remove("hidden");
      elem.children[0].classList.add("show");

      elem.children[1].classList.remove("show");
      elem.children[1].classList.add("hidden");
    });
  });
}

function removeSubscribedPress(element) {
  const subList = getState(subscribedPress);
  const updateSubList = subList.filter((elem) => {
    return elem !== parseInt(element.children[0].dataset.key);
  });
  setState(subscribedPress, updateSubList);
}

function setSubClickEvents() {
  const unsubBtnLists = getQuerySelectorAll(".my-grid-view-btn-unsub");

  unsubBtnLists.forEach((elem) => {
    elem.addEventListener("click", () => {
      removeSubscribedPress(elem.parentNode);
    });
  });
}

register(allOfPress, showMyPressImg);
register(isSubscribed, getSubscribedData);
register(subscribedPress, getSubscribedData);
