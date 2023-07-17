import { getJSON } from "./data.js";
import { shuffleList } from "./utils.js";
import { STATE } from "../constant.js";

let mediaInfo;
let categoryInfo = {
  "종합/경제": [],
  "방송/통신": [],
  IT: [],
  영자지: [],
  "스포츠/연예": [],
  "매거진/전문지": [],
  지역: [],
};

const $categoryBar = document.querySelector(".news-list_category");
const categoryKeys = Object.keys(categoryInfo);

let [cateIdx, mediaIdx] = [0, 0];

/**
 * 리스트뷰 렌더링 전 데이터 가져오기
 */
const getListInfo = async () => {
  mediaInfo = await getJSON("/assets/media-content.json");

  // 미디어 정보 필터링해서 카테고리 정보에 넣기
  mediaInfo.forEach((media, idx) => {
    let cate = media.category;
    categoryInfo[cate].push(idx);
  });

  categoryKeys.forEach((key) => {
    categoryInfo[key] = shuffleList(categoryInfo[key]);
  });
};

/**
 * 리스트뷰 내 화면 전환 이벤트
 */
const setListArrowEvent = () => {
  const $leftArrow = document.querySelector(".left-arrow");
  const $rightArrow = document.querySelector(".right-arrow");

  $leftArrow.addEventListener("click", () => {
    if (!STATE.MODE.IS_GRID) {
      mediaIdx--;
      setFullList();
    }
  });
  $rightArrow.addEventListener("click", () => {
    if (!STATE.MODE.IS_GRID) {
      mediaIdx++;
      setFullList();
    }
  });
};

/**
 * cateIdx, mediaIdx 변경 시 범위 벗어나는 idx 예외처리
 *
 * 1. 이전 페이지 이동했을 때
 * 1-1. cate: -1, media: -1
 * 1-2. cate: 0~6: media: -1
 *
 * 2. 다음 페이지 이동했을 때
 * 2-1. cate: 0~5, media: length
 * 2-2. cate: 6, media: length
 */
const changeIdx = () => {
  let cateLen = categoryInfo[categoryKeys[cateIdx]].length;

  if (cateIdx === 0 && mediaIdx <= -1) {
    cateIdx = 6;
    mediaIdx = cateLen - 1;
  } else if (cateIdx > 0 && cateIdx <= 6 && mediaIdx === -1) {
    cateIdx--;
    mediaIdx = cateLen - 1;
  } else if (cateIdx >= 0 && cateIdx <= 5 && mediaIdx === cateLen) {
    cateIdx++;
    mediaIdx = 0;
  } else if (cateIdx === 6 && mediaIdx === cateLen) {
    cateIdx = 0;
    mediaIdx = 0;
  }
};

/**
 * 모든 카테고리를 unselected 상태로 세팅
 */
const setCategoryBar = () => {
  categoryKeys.forEach((key, idx) => {
    let cateHTML;
    const $li = document.createElement("li");
    $li.addEventListener("click", () => {
      cateIdx = idx;
      mediaIdx = 0;
      setFullList();
    });
    $li.classList.add("category_unselected");
    cateHTML = `
          <p>${key}</p>
          <div></div>
      `;
    $li.innerHTML = cateHTML;
    $categoryBar.append($li);
  });
};

/**
 * 페이지 전환 따른 카테고리바 변경
 */
const setProgressBar = () => {
  const cate = categoryKeys[cateIdx];
  const $cateList = document
    .querySelector(".news-list_category")
    .querySelectorAll("li");

  // 1. 모든 li 하위 돌면서 프로그래스바 삭제해주기
  $cateList.forEach((li, idx) => {
    const lastChild = li.lastElementChild;
    if (lastChild.className === "progress_bar") {
      li.className = "category_unselected";
      lastChild.remove();
      li.children[1].innerHTML = ``;
    }
  });

  // 2. 해당 cateIdx 위치에 프로그래스바 추가
  const $li = $categoryBar.children[cateIdx];
  $li.className = "category_selected";

  const $cntDiv = $li.children[1];
  $cntDiv.innerHTML = `
    <p>${mediaIdx + 1}</p>
    <p>&nbsp; / ${categoryInfo[cate].length}</p>
  `;

  const $progressBar = document.createElement("div");
  $progressBar.className = "progress_bar";

  $li.append($progressBar);

  $progressBar.addEventListener("animationend", () => {
    mediaIdx++;
    setFullList();
  });
};

/**
 * 페이지 전환 따른 뉴스 영역 변경
 */
const setListView = () => {
  const cate = categoryKeys[cateIdx];
  const mediaId = categoryInfo[cate][mediaIdx];

  const nowMedia = mediaInfo[mediaId];

  const $logo = document.querySelector(".news-list_media_header img");
  const $date = document.querySelector(".news-list_media_header p");
  const $addSubBtn = document.querySelector(".news-list_subscribed_btn");
  const $cancelSubBtn = document.querySelector(".news-list_unsubscribed_btn");
  const $mainTitle = document.querySelector(".news-list_media_content_main p");

  $logo.src = nowMedia.path_light;
  $date.innerText = `${nowMedia.edit_date} 편집`;

  if (nowMedia.is_subscribe) {
    $addSubBtn.classList.remove("hidden");
    $cancelSubBtn.classList.add("hidden");
  } else {
    $addSubBtn.classList.add("hidden");
    $cancelSubBtn.classList.remove("hidden");
  }

  $mainTitle.innerText = nowMedia.main_title;

  const $subTitleList = document
    .querySelector(".news-list_media_content_sub")
    .querySelectorAll("li");

  $subTitleList.forEach(($li, idx) => {
    $li.innerText = nowMedia.sub_title[idx];
  });
};

/**
 * 프로그래스바, 뉴스영역 렌더링
 */
const setFullList = () => {
  changeIdx();
  setListView();
  setProgressBar();
};

/**
 * 초기 리스트뷰 세팅
 */
async function initListView() {
  await getListInfo();
  setCategoryBar();
  setFullList();
  setListArrowEvent();
}

export { initListView };
