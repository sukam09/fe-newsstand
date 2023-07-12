const PRESS_NUM_IN_GRID = 24;
const TOTAL_PRESS_NUM = 96;
let grid_page_count = 0;
let is_light_mode = true;

/***** 언론사 사진 셔플 *****/
const presses = Array.from(
  { length: TOTAL_PRESS_NUM },
  (_, idx) => `${idx + 1}.png`
);
const shuffle = () => Math.random() - 0.5;
let shuffled_presses = [...presses].sort(shuffle);

/***** grid에 언론사 & 구독 이미지 추가 *****/
function appendPressInGrid(press) {
  //언론사 이미지 추가
  const $image = document.createElement("img");
  $image.src = is_light_mode
    ? `./icons/press_logo/${press}`
    : `./icons/darkmode_logo/${press}`;
  $image.classList.add("original");

  //구독하기 이미지 추가
  const $sub = document.createElement("img");
  $sub.src = `./icons/others/Button.svg`;
  $sub.classList.add("sub");

  //ul에 li 추가
  const $list = document.createElement("li");
  $list.classList.add("press-item");
  $list.append($image, $sub);
  document.getElementById("press-list").appendChild($list);
}

function initGrid() {
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
    grid_next.style.display = "none";
  }
  if (grid_page_count + 1 < TOTAL_PRESS_NUM / PRESS_NUM_IN_GRID) {
    document.getElementById("grid-prev").style.display = "block";
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
    grid_prev.style.display = "none";
  }
  if (grid_page_count - 1 >= 0) {
    document.getElementById("grid-next").style.display = "block";
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

export { initGrid };
