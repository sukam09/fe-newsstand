import { getJSON } from "./data.js";
import { onClickSubscribeMode, shuffleList } from "./utils.js";
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

const $totalMedia = document.querySelector(".main-nav_total");
const $subscribeMedia = document.querySelector(".main-nav_subscribe");

const $categoryBar = document.querySelector(".news-list_category");
const categoryKeys = Object.keys(categoryInfo);

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
      if (STATE.MODE.IS_TOTAL) STATE.LIST_MODE.CATE_MEDIA_IDX--;
      else STATE.LIST_MODE.SUBSCRIBE_MEDIA_IDX--;
      setFullList();
    }
  });
  $rightArrow.addEventListener("click", () => {
    if (!STATE.MODE.IS_GRID) {
      if (STATE.MODE.IS_TOTAL) STATE.LIST_MODE.CATE_MEDIA_IDX++;
      else STATE.LIST_MODE.SUBSCRIBE_MEDIA_IDX++;
      setFullList();
    }
  });
};

/**
 * 페이지 이동 시 예외처리
 */
const changeIdx = () => {
  let cateLen = categoryInfo[categoryKeys[STATE.LIST_MODE.CATE_IDX]].length;

  if (STATE.MODE.IS_TOTAL)
    if (
      STATE.LIST_MODE.CATE_IDX === 0 &&
      STATE.LIST_MODE.CATE_MEDIA_IDX === -1
    ) {
      // 첫 카테고리 첫 페이지에서 이전 페이지 이동 시
      STATE.LIST_MODE.CATE_IDX = 6;
      cateLen = categoryInfo[categoryKeys[STATE.LIST_MODE.CATE_IDX]].length;
      STATE.LIST_MODE.CATE_MEDIA_IDX = cateLen - 1;
    } else if (
      // 첫 카테고리 아닐 때, 첫 페이지에서 이전 페이지 이동 시
      STATE.LIST_MODE.CATE_IDX !== 0 &&
      STATE.LIST_MODE.CATE_MEDIA_IDX === -1
    ) {
      STATE.LIST_MODE.CATE_IDX--;
      cateLen = categoryInfo[categoryKeys[STATE.LIST_MODE.CATE_IDX]].length;
      STATE.LIST_MODE.CATE_MEDIA_IDX = cateLen - 1;
    } else if (
      // 마지막 카테고리일 때, 마지막 페이지라면,
      STATE.LIST_MODE.CATE_IDX === 6 &&
      STATE.LIST_MODE.CATE_MEDIA_IDX === cateLen
    ) {
      STATE.LIST_MODE.CATE_IDX = 0;
      STATE.LIST_MODE.CATE_MEDIA_IDX = 0;
    } else if (
      // 마지막 카테고리가 아닐 때, 마지막 페이지라면,
      STATE.LIST_MODE.CATE_IDX !== 6 &&
      STATE.LIST_MODE.CATE_MEDIA_IDX === cateLen
    ) {
      STATE.LIST_MODE.CATE_IDX++;
      STATE.LIST_MODE.CATE_MEDIA_IDX = 0;
    } else if (!STATE.MODE.IS_TOTAL) {
      if (STATE.LIST_MODE.SUBSCRIBE_MEDIA_IDX === -1) {
        STATE.LIST_MODE.SUBSCRIBE_MEDIA_IDX = STATE.SUBSCRIBE_LIST.length - 1;
      } else if (
        STATE.LIST_MODE.SUBSCRIBE_MEDIA_IDX === STATE.SUBSCRIBE_LIST.length
      ) {
        STATE.LIST_MODE.SUBSCRIBE_MEDIA_IDX = 0;
      }
    }
};

/**
 * 화면 전환시마다 카테고리바 하위 요소 리셋 후
 * 모든 카테고리를 unselected 상태로 세팅
 */
const setCategoryBar = () => {
  console.log(STATE.MODE.IS_TOTAL);
  $categoryBar.innerHTML = "";
  if (STATE.MODE.IS_TOTAL) {
    setACategoryBar({ keyList: categoryKeys });
  } else {
    const subMediaName = STATE.SUBSCRIBE_LIST.map(
      (subIdx) => mediaInfo[subIdx].name
    );
    setACategoryBar({ keyList: subMediaName });
  }
};

/**
 * 모드에 따라 카테고리바 세팅
 */
const setACategoryBar = ({ keyList }) => {
  keyList.forEach((key, idx) => {
    let cateHTML;
    const $li = document.createElement("li");
    $li.addEventListener("click", () => {
      if (STATE.MODE.IS_TOTAL) {
        STATE.LIST_MODE.CATE_IDX = idx;
        STATE.LIST_MODE.CATE_MEDIA_IDX = 0;
      } else {
        STATE.LIST_MODE.SUBSCRIBE_MEDIA_IDX = idx;
      }
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
  const cate = categoryKeys[STATE.LIST_MODE.CATE_IDX];
  const $cateList = $categoryBar.querySelectorAll("li");

  // 1. 모든 li 하위 돌면서 프로그래스바 삭제해주기
  $cateList.forEach((li, idx) => {
    const lastChild = li.lastElementChild;
    if (lastChild.className === "progress_bar") {
      li.className = "category_unselected";
      lastChild.remove();
      li.children[1].innerHTML = ``;
    }
  });

  // 2. 해당 STATE.LIST_MODE.CATE_IDX 위치에 프로그래스바 추가
  const $li = $categoryBar.children[STATE.LIST_MODE.CATE_IDX];
  $li.className = "category_selected";

  const $cntDiv = $li.children[1];
  $cntDiv.innerHTML = `
    <p>${STATE.LIST_MODE.CATE_MEDIA_IDX + 1}</p>
    <p>&nbsp; / ${categoryInfo[cate].length}</p>
  `;

  const $progressBar = document.createElement("div");
  $progressBar.className = "progress_bar";

  $li.append($progressBar);

  $progressBar.addEventListener("animationend", () => {
    STATE.LIST_MODE.CATE_MEDIA_IDX++;
    setFullList();
  });
};

/**
 * 페이지 전환 따른 뉴스 영역 변경
 */
const setListView = () => {
  const cate = categoryKeys[STATE.LIST_MODE.CATE_IDX];
  const mediaId = categoryInfo[cate][STATE.LIST_MODE.CATE_MEDIA_IDX];

  const nowMedia = mediaInfo[mediaId];

  const $logo = document.querySelector(".news-list_media_header img");
  const $date = document.querySelector(".news-list_media_header p");
  const $addSubBtn = document.querySelector(".news-list_subscribed_btn");
  const $cancelSubBtn = document.querySelector(".news-list_unsubscribed_btn");
  const $mainTitle = document.querySelector(".news-list_media_content_main p");

  $logo.src = nowMedia.path_light;
  $date.innerText = `${nowMedia.edit_date} 편집`;

  if (STATE.SUBSCRIBE_LIST.includes(mediaId)) {
    $addSubBtn.classList.remove("hidden");
    $cancelSubBtn.classList.add("hidden");
  } else {
    $addSubBtn.classList.add("hidden");
    $cancelSubBtn.classList.remove("hidden");
  }

  $mainTitle.innerText = nowMedia.main_title;

  const $subTitleList = document
    .querySelector(".news-list_media_content_sub")
    .querySelectorAll("*");

  $subTitleList.forEach(($li, idx) => {
    $li.innerText =
      idx !== 6
        ? nowMedia.sub_title[idx]
        : `${nowMedia.name}에서 직접 편집한 뉴스입니다.`;
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

const setListModeEvent = () => {
  $totalMedia.addEventListener("click", () => {
    if (!STATE.MODE.IS_GRID) {
      onClickListMode({ className: "main-nav_total" });
    }
  });
  $subscribeMedia.addEventListener("click", () => {
    if (!STATE.MODE.IS_GRID) {
      onClickListMode({ className: "main-nav_subscribe" });
    }
  });
};

/**
 *
 * @param {언론사 토글 중 선택한 클래스 이름} className
 */
const onClickListMode = ({ className }) => {
  onClickSubscribeMode({ className });
  [STATE.LIST_MODE.CATE_IDX, STATE.LIST_MODE.CATE_MEDIA_IDX] = [0, 0];
  setFullList();
};

/**
 * 초기 리스트뷰 세팅
 */
async function initListView() {
  await getListInfo();
  setCategoryBar();
  setFullList();
  setListArrowEvent();
  setListModeEvent();
}

export { initListView, setCategoryBar, setFullList };
