import { myPressListState, subStateList } from "../store/subState.js";
import { getState, setState } from "../store/observer.js";
import { qs, qsa, strToHtmlElemnt } from "../utils.js";
import {
  createCategory,
  createCategoryItem,
} from "../components/mainSection/mainBody/content/pressList/category.js";
import { pressDataState } from "../store/dataState.js";
import {
  createNewsBody,
  createNewsHeader,
} from "../components/mainSection/mainBody/content/pressList/pressList.js";
import { handleCategoryItemClick } from "./categoryController.js";

export function handleListSubButton({ currentTarget: $button }) {
  const pressId = parseInt($button.getAttribute("key").split("_")[1]);
  const subState = getState(subStateList[pressId]);
  setState(subStateList[pressId], !subState);
}

// id의 리스트 뷰의 구독, 해지 버튼 조정
export function controllListsSubButtonShowing(id) {
  const isSub = getState(subStateList[id]);
  const $pressLists = qsa(`.list_press_${id}`);

  if (!$pressLists) {
    console.log("리스트 뷰에 데이터 엄씀");
    return;
  }
  [...$pressLists].forEach(($pressList) => {
    const $subButton = $pressList.querySelector(".list_sub_button");
    const $unsubButton = $pressList.querySelector(".list_unsub_button");

    if (isSub) {
      $subButton.style.display = "none";
      $unsubButton.style.display = "flex";
    } else {
      $subButton.style.display = "flex";
      $unsubButton.style.display = "none";
    }
  });
}

export function controllMyPressList() {
  const $container = qs("#mode_my_list_container");
  const myPressList = [...getState(myPressListState)];
  const { pressList } = getState(pressDataState);
  const filteredPressList = [...pressList].filter((press) =>
    myPressList.includes(press.id)
  );
  const category = createCategory([]);
  const $category = strToHtmlElemnt(category);
  const $ul = $category.querySelector("ul");

  $container.innerHTML = "";

  filteredPressList.forEach((press, idx) => {
    // category
    const categoryItem = createCategoryItem(press.name, `my_${idx}`, 1);
    const $categoryItem = strToHtmlElemnt(categoryItem);
    console.log($categoryItem);
    $categoryItem.addEventListener("click", (e) => handleCategoryItemClick(e));
    $ul.appendChild($categoryItem);

    console.log(idx);
    // body
    const $news = document.createElement("div");
    $news.className = `news news_my${idx}`;
    $news.innerHTML = createNewsHeader(press) + createNewsBody(press);
    $container.appendChild($news);
  });
  const $ref = $container.querySelector(".news");

  $container.insertBefore($category, $ref);
}
