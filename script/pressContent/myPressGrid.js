import { getQuerySelector } from "../../utils/js/getElements.js";
import { fetchData } from "../../utils/js/getJson.js";
import { getState, register } from "../observer/observer.js";
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
      (imgSrcContent += `<li><img src="../assets/images/pressLogo/light/img${elem}.svg" data-key=${elem}></li>`)
  );
  for (let i = subscribedPressNum; i < 24; i++) {
    imgSrcContent += `<li></li>`;
  }
  pressContentMyView.innerHTML = imgSrcContent;
}

register(allOfPress, showMyPressImg);
register(isSubscribed, getSubscribedData);
