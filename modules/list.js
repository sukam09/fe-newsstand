import { getJSON } from "./data.js";
import { shuffleList } from "./utils.js";

let categoryInfo = {
  "종합/경제": [],
  "방송/통신": [],
  IT: [],
  영자지: [],
  "스포츠/연예": [],
  "매거진/전문지": [],
  지역: [],
};

let mediaInfo;

const setCategoryBar = () => {
  const $categoryBar = document.querySelector(".news-list_category");

  Object.keys(categoryInfo).forEach((key, idx) => {
    let cateHTML;
    // 카테고리 이름 넣는 건 디폴트
    const $li = document.createElement("li");
    if (idx === 0) {
      $li.classList.add("category_selected");
      cateHTML = `
          <p>${key}</p>
          <div>
            <p>1</p>
            <p> &nbsp; / ${categoryInfo[key].length}</p>
          </div>
          <div class="progress_bar"/>
      `;
    } else {
      $li.classList.add("category_unselected");
      cateHTML = `
          <p>${key}</p>
          <div></div>
      `;
    }
    $li.innerHTML = cateHTML;
    $categoryBar.append($li);
  });
};

const setListView = (mediaId) => {
  console.log(mediaId);
  const nowMedia = mediaInfo[mediaId];
  const $logo = document.querySelector(".news-list_media_header img");
  const $date = document.querySelector(".news-list_media_header p");
  const $mainTitle = document.querySelector(".news-list_media_content_main p");

  $logo.src = nowMedia.path_light;
  $date.innerText = `${nowMedia.edit_date} 편집`;
  // 구독 관련 정보 추가 필요
  $mainTitle.innerText = nowMedia.main_title;
  const $subTitleList = document
    .querySelector(".news-list_media_content_sub")
    .querySelectorAll("li");

  $subTitleList.forEach(($li, idx) => {
    $li.innerText = nowMedia.sub_title[idx];
  });
};

const getListInfo = async () => {
  mediaInfo = await getJSON("/assets/media-content.json");

  // 미디어 정보 필터링해서 카테고리 정보에 넣기
  mediaInfo.forEach((media, idx) => {
    let cate = media.category;
    categoryInfo[cate].push(idx);
  });

  Object.keys(categoryInfo).forEach((key, idx) => {
    categoryInfo[key] = shuffleList(categoryInfo[key]);
  });
};

(async function initListView() {
  await getListInfo();
  setCategoryBar();
  setListView(categoryInfo[Object.keys(categoryInfo)[0]][0]);
})();

export { getListInfo, setCategoryBar, setListView };
