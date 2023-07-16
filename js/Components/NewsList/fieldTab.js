import { constants } from "../../Data/constants.js";
import { changePageTarget, renderContent } from "./pageButton.js";
import { fetchNewsData, getCategoryData } from "./pressNews.js";
import { startProgress, stopProgress } from "./progress.js";

let result = "";
let nowCategoryNewsData;

const makeTag = (event, item) => {
  if (event.target.innerHTML.includes(item)) {
    nowCategoryNewsData = getCategoryData(item).sort(() => Math.random() - 0.5);

    result += `
    <li class="news-list__field-tab__progress">
      <span>${item}</span>
      <span class="news-list__field-tab__progress-count">
        1
        <span class="news-list__field-tab__progress-entire">/ ${nowCategoryNewsData.length}</span>
      </span>
    </li>`;
  } else {
    result += `<li class="news-list__field-tab__general">${item}</li>`;
  }
};

const convertTab = (amout) => {
  const $liAll = document.querySelectorAll(".news-list__field-tab > li");
  [...$liAll].forEach((item, index) => {
    if (item.className === "news-list__field-tab__progress") {
      $liAll[
        (index + amout + constants.FIELDTAB_LIST.length) %
          constants.FIELDTAB_LIST.length
      ].click();
      return;
    }
  });
};

const setFieldTab = () => {
  if (!nowCategoryNewsData)
    fetchNewsData(constants.FIELDTAB_LIST[0])
      .then((res) => (nowCategoryNewsData = res))
      .then(() => renderContent());

  result = "";
  const $fieldTabList = document.querySelectorAll(".news-list__field-tab > li");
  [...$fieldTabList].forEach((item) => {
    item.addEventListener("click", (event) => {
      constants.FIELDTAB_LIST.forEach((item) => makeTag(event, item));
      document.querySelector(".news-list__field-tab").innerHTML = result;
      stopProgress();
      startProgress();
      setFieldTab();
      changePageTarget();
    });
  });
};

export { setFieldTab, convertTab, nowCategoryNewsData };
