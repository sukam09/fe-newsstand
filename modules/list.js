import { getJSON } from "./data.js";

let listInfo;
let lightMediaInfo;
let darkMediaInfo;

const setListView = (mediaId) => {
  const nowMedia = listInfo[mediaId];
  const $logo = document.querySelector(".news-list_media_header img");
  const $date = document.querySelector(".news-list_media_header p");
  const $mainTitle = document.querySelector(".news-list_media_content_main p");

  console.log(lightMediaInfo[mediaId].src);

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
  lightMediaInfo = await getJSON("/assets/light-media.json");
  darkMediaInfo = await getJSON("/assets/dark-media.json");
  listInfo = await getJSON("/assets/media-content.json");
};

export { getListInfo, setListView };
