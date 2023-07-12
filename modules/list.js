import { getJSON } from "./data.js";

let listInfo;
let lightMediaInfo;
let darkMediaInfo;
let categoryInfo;

const setCategoryBar = () => {
  const $categoryBar = document.querySelector(".news-list_category");
  categoryInfo.forEach((cate, idx) => {
    let cateHTML;
    // 카테고리 이름 넣는 건 디폴트
    const $li = document.createElement("li");
    if (idx === 0) {
      $li.classList.add("category_selected");
      cateHTML = `
          <p>${cate.name}</p>
          <div>
            <p>${idx + 1}</p>
            <p> &nbsp; / ${cate.mediaIdList.length}</p>
          </div>
          <div class="progress_bar"/>
      `;
    } else {
      $li.classList.add("category_unselected");
      cateHTML = `
          <p>${cate.name}</p>
          <div></div>
      `;
    }
    $li.innerHTML = cateHTML;
    $categoryBar.append($li);
  });
};

const setListView = (mediaId) => {
  const nowMedia = listInfo[mediaId];
  const $logo = document.querySelector(".news-list_media_header img");
  const $date = document.querySelector(".news-list_media_header p");
  const $mainTitle = document.querySelector(".news-list_media_content_main p");

  $logo.src = lightMediaInfo[mediaId].src;
  $date.innerText = `${nowMedia.date} 편집`;
  // 구독 관련 정보 추가 필요
  $mainTitle.innerText = nowMedia.mainTitle;
  const $subTitleList = document
    .querySelector(".news-list_media_content_sub")
    .querySelectorAll("li");

  $subTitleList.forEach(($li, idx) => {
    $li.innerText = nowMedia.subTitle[idx];
  });
};

const getListInfo = async () => {
  // Promise.all()
  lightMediaInfo = await getJSON("/assets/light-media.json");
  darkMediaInfo = await getJSON("/assets/dark-media.json");
  listInfo = await getJSON("/assets/media-content.json");
  categoryInfo = await getJSON("/assets/category-info.json");
};

(async function initListView() {
  await getListInfo();
  setCategoryBar();
  setListView(categoryInfo[0].mediaIdList[0]);
})();

export { getListInfo, setCategoryBar, setListView };
