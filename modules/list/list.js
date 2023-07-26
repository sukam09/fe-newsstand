import { shuffleList } from "/modules/utils.js";
import { getState, setState } from "/observer/observer.js";
import {
  setListArrowEvent,
  setListModeEvent,
  setListSubscribeEvent,
} from "./event.js";
import {
  categoryInfo,
  listCateIdx,
  listCateMediaIdx,
  listSubsMediaIdx,
  mediaInfo,
  isLightMode,
  isTotalMode,
  subscribeList,
} from "../../store/index.js";
import { changeIdx } from "./utils.js";
import { register } from "../../observer/observer.js";

const $categoryBar = document.querySelector(".news-list_category");
const categoryKeys = Object.keys(getState(categoryInfo));

const $logo = document.querySelector(".news-list_media_header img");
const $date = document.querySelector(".news-list_media_header p");
const $plusSubBtn = document.querySelector(".news-list_subscribe_btn");
const $xSubBtn = document.querySelector(".news-list_unsubscribe_btn");
const $mainTitle = document.querySelector(".news-list_media_content_main p");
const $thumbnail = document.querySelector(".news-list_media_content_main img");

/**
 * 리스트뷰 렌더링 전 데이터 가져오기
 */
const getListInfo = async () => {
  // 미디어 정보 필터링해서 카테고리 정보에 넣기
  let newCateInfo = getState(categoryInfo);
  getState(mediaInfo).forEach((media, idx) => {
    let cate = media.category;
    newCateInfo[cate].push(idx);
  });
  setState(categoryInfo, newCateInfo);

  newCateInfo = getState(categoryInfo);
  categoryKeys.forEach((key) => {
    newCateInfo[key] = shuffleList(newCateInfo[key]);
  });
  setState(categoryInfo, newCateInfo);
};

/**
 * 화면 전환시마다 카테고리바 하위 요소 리셋 후
 * 모든 카테고리를 unselected 상태로 세팅
 */
const setCategoryBar = () => {
  $categoryBar.innerHTML = "";
  if (getState(isTotalMode)) {
    setACategoryBar({ keyList: categoryKeys });
  } else {
    const subMediaName = getState(subscribeList).map(
      (subIdx) => getState(mediaInfo)[subIdx].name
    );
    setACategoryBar({ keyList: subMediaName });
  }
};

/**
 * @param {현재 카테고리 idx} cateIdx
 * @returns 현재 카테고리인지 여부
 */
const isCurCategory = ({ cateIdx }) => {
  getState(isTotalMode)
    ? getState(listCateIdx) === cateIdx
    : getState(listSubsMediaIdx) === cateIdx;
};

/**
 * 모드에 따라 카테고리바 세팅
 */
const setACategoryBar = ({ keyList }) => {
  keyList.forEach((key, idx) => {
    let cateHTML;
    const $li = document.createElement("li");
    $li.addEventListener("click", () => {
      if (isCurCategory({ cateIdx: idx })) return;
      if (getState(isTotalMode)) {
        setState(listCateIdx, idx);
        setState(listCateMediaIdx, 0);
      } else {
        setState(listSubsMediaIdx, idx);
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
 * 페이지 전환 따른 프로그래스바 이동
 */
const setProgressBar = () => {
  const $cateList = $categoryBar.querySelectorAll("li");

  // 1. 모든 li 하위 돌면서 프로그래스바 삭제해주기
  $cateList.forEach((li, _) => {
    const lastChild = li.lastElementChild;
    if (lastChild.className === "progress_bar") {
      li.className = "category_unselected";
      lastChild.remove();
      li.children[1].innerHTML = ``;
    }
  });

  // 2. 모드 따라 현재 선택한 카테고리 위치에 프로그래스바 추가
  const curCateIdx = getState(isTotalMode)
    ? getState(listCateIdx)
    : getState(listSubsMediaIdx);

  const $li = setPregressText({ curCateIdx });
  const $progressBar = document.createElement("div");
  $progressBar.className = "progress_bar";
  $li.append($progressBar);

  $progressBar.addEventListener("animationend", () => {
    getState(isTotalMode)
      ? setState(listCateMediaIdx, getState(listCateMediaIdx) + 1)
      : setState(listSubsMediaIdx, getState(listSubsMediaIdx) + 1);
    setFullList();
  });
};

const setPregressText = ({ curCateIdx }) => {
  const cate = categoryKeys[getState(listCateIdx)];

  const $li = $categoryBar.children[curCateIdx];
  $li.className = "category_selected";

  const $cntDiv = $li.children[1];

  if (getState(isTotalMode)) {
    $cntDiv.innerHTML = `
  <p>${getState(listCateMediaIdx) + 1}</p>
  <p>&nbsp; / ${getState(categoryInfo)[cate].length}</p>
`;
  } else {
    $cntDiv.innerHTML = `<img
      src="/images/progress-arrow.svg"
    />`;
  }

  return $li;
};

/**
 * 페이지 전환 따른 뉴스 영역 변경
 */
const setListView = () => {
  const cate = categoryKeys[getState(listCateIdx)];

  // 모드에 따라 mediaId 세팅
  const mediaId = getState(isTotalMode)
    ? getState(categoryInfo)[cate][getState(listCateMediaIdx)]
    : getState(subscribeList)[getState(listSubsMediaIdx)];

  const nowMedia = getState(mediaInfo)[mediaId];

  $logo.src = getState(isLightMode) ? nowMedia.path_light : nowMedia.path_dark;
  $date.innerText = `${nowMedia.edit_date} 편집`;

  if (getState(subscribeList).includes(mediaId)) {
    $plusSubBtn.classList.add("hidden");
    $xSubBtn.classList.remove("hidden");
  } else {
    $plusSubBtn.classList.remove("hidden");
    $xSubBtn.classList.add("hidden");
  }

  $thumbnail.src = nowMedia.thumbnail;
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

function initListRegister() {
  register([isTotalMode, subscribeList], setCategoryBar);
  register([listCateIdx, listCateMediaIdx, listSubsMediaIdx], setCategoryBar);
}

/**
 * 초기 리스트뷰 세팅
 */
async function initListView() {
  await getListInfo();

  setListArrowEvent();
  setListModeEvent();
  setListSubscribeEvent();
  setCategoryBar();
  setFullList();

  initListRegister();
}

export { initListView, setCategoryBar, setFullList, setListView };
