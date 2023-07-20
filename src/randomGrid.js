import { getPressObj } from "./api/api.js";
import { subscribeState } from "./store/subscribeState.js";

const PRESS_NUM_IN_GRID = 24;
const TOTAL_PRESS_NUM = 96;
let grid_page_count = 0;
let is_light_mode = true;
const unsub_btn = "../assets/others/unsubButton.svg";

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
  $image.classList.add("original", `${press.id}`);

  //구독하기 이미지 추가
  const $sub = document.createElement("img");
  $sub.src = `./assets/others/Button.svg`;
  $sub.classList.add("sub", `${press.id}`);

  //ul에 li 추가
  const $list = document.createElement("li");
  $list.classList.add("press-item", "full");
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

async function getPressItemById(id) {
  presses = await getPressObj();
  const subPress = await Promise.all(
    presses.filter((item) => item.id === parseInt(id))
  );
  return subPress;
}

const sub_btns = document.querySelector("#press-list");
sub_btns.addEventListener("click", async (e) => {
  const target = e.target;
  const press_id = target.classList[1];
  if (target.classList.contains("sub")) {
    const subPress = await getPressItemById(press_id);
    subscribeState.setSubscribeState(
      press_id,
      subPress[0].name,
      subPress[0].lightSrc
    );
    target.src = unsub_btn;
    target.classList.remove("sub");
    target.classList.add("un-sub");
  }
});

export { setGrid };
