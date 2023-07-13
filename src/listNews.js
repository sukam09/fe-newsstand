import { categoryList } from "../data/newsContents.js";
import { CATEGORY_NUM } from "./progressBar.js";

function drawListView(category_idx, title_idx) {
  appendPressInfo(category_idx, title_idx);
  appendNewsMain(category_idx, title_idx);
}

function appendCategory() {
  for (let i = 0; i < CATEGORY_NUM; i++) {
    const content = document.querySelector(".list-nav ul");
    content.insertAdjacentHTML(
      "afterbegin",
      `<li class="progress-item">${categoryList[i].categoryName}
        <div class="count font-init">
          <span class="now-count">1</span> <span>/</span><span>${categoryList[i].tabs}</span>
        </div>
      </li>`
    );
  }
}

function appendPressInfo(category_idx, title_idx) {
  document.querySelector(".press-brandmark").src =
    categoryList[category_idx].data[title_idx].logoSrc;
  document.querySelector(".edit-date").innerHTML =
    categoryList[category_idx].data[title_idx].editDate;
}

function appendNewsMain(category_idx, title_idx) {
  document.querySelector(".thumbnail").src =
    categoryList[category_idx].data[title_idx].imgSrc;
  document.querySelector(".news-main .font-init").innerHTML =
    categoryList[category_idx].data[title_idx].mainTitle;
  for (
    let i = 0;
    i < categoryList[category_idx].data[title_idx].subTitleList.length;
    i++
  ) {
    const list = document.createElement("li");
    list.innerHTML =
      categoryList[category_idx].data[title_idx].subTitleList[i].title;
    document.querySelector(".news-sub-list").appendChild(list);
  }
  const list_caption = document.createElement("li");
  list_caption.classList.add("caption");
  list_caption.innerHTML = `${categoryList[category_idx].data[title_idx].name} 언론사에서 직접 편집한 뉴스입니다.`;
  document.querySelector(".news-sub-list").appendChild(list_caption);
}

export { drawListView };
