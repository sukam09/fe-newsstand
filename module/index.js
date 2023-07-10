const $newsWrapper = document.querySelector(".news-wrapper");
const $systemDate = document.querySelector(".system-date");

const MEDIA_NUM = 24;
const TOPIC_NUM = 10;
let idList = Array.from({ length: 96 }, (_, idx) => idx);
let isLightMode = true;
let pageNum = 0;

const getJSON = async (url) => {
  try {
    const response = await fetch(url);
    const jsonData = await response.json();
    return jsonData;
  } catch (err) {
    console.error("Error : ", err);
    return null;
  }
};

/**
 * 핫토픽 5개씩 요소 추가하기
 */
const setHotTopic = async () => {
  const $hotTopicLeft = document.querySelector(".hot-topic-left");
  const $hotTopicRight = document.querySelector(".hot-topic-right");

  let hotTopic = await getJSON("../assets/hotTopic.json");

  hotTopic.forEach((topic, idx) => {
    const $li = document.createElement("li");
    $li.classList.add("hot-topic_list");

    const $h2 = document.createElement("h2");
    $h2.classList.add("hot-topic_list_title");
    $h2.innerText = topic.title;

    const $p = document.createElement("p");
    $p.classList.add("hot-topic_list_content");
    $p.innerText = topic.content;

    $li.append($h2, $p);

    idx < 5 ? $hotTopicLeft.append($li) : $hotTopicRight.append($li);
  });
};

/**
 * 핫토픽 롤링하는 함수
 * -> 5초에 한번씩 가장 위에 있는 뉴스 하위로 가져옴.
 */

/**
 * 배열을 섞는 함수
 */
const shuffleList = (list) => {
  list.sort(() => Math.random() - 0.5);
};

/**
 * 언론사 Grid 제작하기
 */
const makeGrid = () => {
  for (let i = 0; i < MEDIA_NUM; i++) {
    const $li = document.createElement("li");
    const imgSrc = isLightMode
      ? `./img/light-media/${idList[i]}.png`
      : `./img/dark-media/${idList[i]}.png`;

    const checkImg = new Image();
    checkImg.src = imgSrc;
    checkImg.onload = () => {
      const $img = document.createElement("img");
      $img.classList.add(`img${i}`);
      $img.src = imgSrc;
      $img.style.height = "20px";
      $li.appendChild($img);
    };

    $newsWrapper.append($li);
  }
};

/**
 * 언론사 이미지 src 변경하기
 */
const changeImgSrc = () => {
  let newImg = idList.slice(
    pageNum * MEDIA_NUM,
    pageNum * MEDIA_NUM + MEDIA_NUM
  );

  for (let i = 0; i < MEDIA_NUM; i++) {
    const $img = document.querySelector(`.img${i}`);
    const imgSrc = isLightMode
      ? `./img/light-media/${newImg[i]}.png`
      : `./img/dark-media/${newImg[i]}.png`;

    const checkImg = new Image();
    checkImg.src = imgSrc;
    checkImg.onload = () => {
      $img.src = imgSrc;
    };
    checkImg.onerror = () => {
      $img.remove();
    };
  }
};

/**
 * Grid 화살표 hidden 처리하기
 */
const setArrowVisible = () => {
  const leftArrow = document.querySelector(".left-arrow");
  const rightArrow = document.querySelector(".right-arrow");

  // 페이지 제한 0~3에 따른 hidden 여부
  if (pageNum === 0) {
    leftArrow.classList.add("hidden");
  } else if (pageNum > 0 && pageNum < 3) {
    leftArrow.classList.remove("hidden");
    rightArrow.classList.remove("hidden");
  } else if (pageNum === 3) {
    rightArrow.classList.add("hidden");
  }

  // 언론사 로고 개수 따른 hidden 여부
};

/**
 * Grid 화살표 클릭하기
 */
const clickArrow = (num) => {
  pageNum += num;
  changeImgSrc();
  setArrowVisible();
};

/**
 * 시스템 날짜 표시하기
 */
const setDate = () => {
  const today = new Date();

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "long",
  };

  const $p = document.createElement("p");
  $p.innerText = today.toLocaleDateString("ko-KR", options);
  $systemDate.append($p);
};
const subscribed = Array.from({ length: 27 }, (_, idx) => idx + 1);

/**
 * 로고를 클릭하면 새로고침
 */
const reloadPage = () => {
  location.reload();
};

function init() {
  setDate();
  setHotTopic();
  shuffleList(idList);
  setArrowVisible(idList);
  makeGrid();
}

init();
