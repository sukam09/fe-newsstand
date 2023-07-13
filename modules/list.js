import { getJSON } from "./data.js";
import { shuffleList } from "./utils.js";

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

/**
 * 모든 카테고리를 unselected 상태로 세팅
 */
const setCategoryBar = () => {
  Object.keys(categoryInfo).forEach((key) => {
    let cateHTML;
    // 카테고리 이름 넣는 건 디폴트
    const $li = document.createElement("li");
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
 * @param cateIdx 현재 카테고리 순서
 * @param mediaIdx 현재 카테고리 리스트 내 미디어 순서
 */
const setProgressBar = (cateIdx, mediaIdx) => {
  const cate = Object.keys(categoryInfo)[cateIdx];

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

  if (mediaIdx + 1 === categoryInfo[cate].length) {
    // 해당 카테고리의 마지막 페이지일 때
    $progressBar.addEventListener("animationend", () => {
      setListView((cateIdx + 1) % 7, 0);
      setProgressBar((cateIdx + 1) % 7, 0);
    });
  } else {
    // 해당 카테고리 내에서 다음 페이지로 이동할 때
    $progressBar.addEventListener("animationend", () => {
      setListView(cateIdx, mediaIdx + 1);
      setProgressBar(cateIdx, mediaIdx + 1);
    });
  }
};

/**
 * 페이지 전환 따른 뉴스 영역 변경
 * @param cateIdx 현재 카테고리 순서
 * @param mediaIdx 현재 카테고리 리스트 내 미디어 순서
 */
const setListView = (cateIdx, mediaIdx) => {
  const cate = Object.keys(categoryInfo)[cateIdx];
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
  // 구독 관련 정보 추가 필요
  $mainTitle.innerText = nowMedia.main_title;

  const $subTitleList = document
    .querySelector(".news-list_media_content_sub")
    .querySelectorAll("li");

  $subTitleList.forEach(($li, idx) => {
    $li.innerText = nowMedia.sub_title[idx];
  });
};

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

  Object.keys(categoryInfo).forEach((key, idx) => {
    categoryInfo[key] = shuffleList(categoryInfo[key]);
  });
};

async function initListView() {
  await getListInfo();
  setCategoryBar();
  setListView(0, 0);
  setProgressBar(0, 0);
}

export { initListView };
