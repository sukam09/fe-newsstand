import { getPressObj } from "./api/api.js";
import { setDisplay } from "./util/utils.js";

const PRESS_NUM_IN_GRID = 24;
const TOTAL_PRESS_NUM = 96;
let grid_page_count = 0;
let is_light_mode = true;

/***** 언론사 사진 셔플 *****/
let presses;
let shuffled_presses;

function shuffleArray(array) {
  array.sort(() => Math.random() - 0.5);
  return array;
}

/***** grid에 언론사 & 구독 이미지 추가 *****/
function appendPressInGrid(press) {
  //언론사 이미지 추가
  const $image = document.createElement("img");
  $image.src = is_light_mode ? `${press.lightSrc}` : `${press.darkSrc}`;
  $image.classList.add("original");

  //구독하기 이미지 추가
  const $sub = document.createElement("img");
  $sub.src = `./assets/others/Button.svg`;
  $sub.classList.add("sub");

  //ul에 li 추가
  const $list = document.createElement("li");
  $list.classList.add("press-item");
  $list.append($image, $sub);
  document.getElementById("press-list").appendChild($list);
}

async function setGrid() {
  presses = await getPressObj();
  shuffled_presses = shuffleArray(presses);
  const slice_shuffled_presses = shuffled_presses.slice(0, PRESS_NUM_IN_GRID);
  slice_shuffled_presses.forEach((press) => {
    appendPressInGrid(press);
  });
}

/***** grid 넘기는 화살표 관련 함수 *****/
/* 뒤로 넘기기 */
const grid_next = document.getElementById("grid-next");
grid_next.addEventListener("click", () => {
  if (grid_page_count + 1 === TOTAL_PRESS_NUM / PRESS_NUM_IN_GRID - 1) {
    setDisplay("#grid-next", "none");
  }
  if (grid_page_count + 1 < TOTAL_PRESS_NUM / PRESS_NUM_IN_GRID) {
    setDisplay("#grid-prev", "block");
    document.getElementById("press-list").innerHTML = "";
    grid_page_count += 1;
    const slice_shuffled_presses = shuffled_presses.slice(
      grid_page_count * 24,
      grid_page_count * 24 + 24
    );
    slice_shuffled_presses.forEach((press) => {
      appendPressInGrid(press);
    });
  }
});

/* 앞으로 넘기기 */
const grid_prev = document.getElementById("grid-prev");
grid_prev.addEventListener("click", () => {
  if (grid_page_count - 1 === 0) {
    setDisplay("#grid-prev", "none");
  }
  if (grid_page_count - 1 >= 0) {
    setDisplay("#grid-next", "block");
    document.getElementById("press-list").innerHTML = "";
    grid_page_count -= 1;
    const slice_shuffled_presses = shuffled_presses.slice(
      grid_page_count * 24,
      grid_page_count * 24 + 24
    );
    slice_shuffled_presses.forEach((press) => {
      appendPressInGrid(press);
    });
  }
});

export { setGrid };
