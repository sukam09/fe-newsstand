import { UNSUB_BTN_IMG, GRID_SUB_BTN_IMG } from "../path.js";
import { getPressObj } from "../api/api.js";
import { subscribeState } from "../store/subscribeState.js";

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
  $image.classList.add("original", `${press.id}`);

  //구독 여부 확인 후 구독하기/해지하기 이미지 추가
  const $sub = document.createElement("img");
  const sub_press = subscribeState.getSubInfoById(press.id.toString());
  if (sub_press.length === 0) {
    //구독 안했으면
    $sub.src = GRID_SUB_BTN_IMG;
  } else {
    //구독 했으면
    $sub.src = UNSUB_BTN_IMG;
  }

  $sub.classList.add("sub", `id${press.id}`);

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

function drawGrid(page_num) {
  const slice_shuffled_presses = shuffled_presses.slice(
    page_num * PRESS_NUM_IN_GRID,
    PRESS_NUM_IN_GRID * (page_num + 1)
  );
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
    drawGrid(grid_page_count);
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
    drawGrid(grid_page_count);
  }
});

/***** 구독하기 버튼 누르면 구독 *****/
//id로 언론사 찾기
async function getPressItemById(id) {
  presses = await getPressObj();
  const subPress = await Promise.all(
    presses.filter((item) => item.id === parseInt(id))
  );
  return subPress;
}
//구독하기 버튼 이벤트 리스너
const sub_btns = document.querySelector("#press-list");
sub_btns.addEventListener("click", async (e) => {
  const target = e.target;
  const target_class = target.classList[1];
  const press_id = target_class.slice(2, target_class.length);
  if (target.classList.contains("sub")) {
    const subPress = await getPressItemById(press_id);
    subscribeState.setSubscribeState(
      press_id,
      subPress[0].name,
      subPress[0].lightSrc
    );
    target.src = UNSUB_BTN_IMG;
    target.className = `un-sub id${press_id}`;
  }
});

export { PRESS_NUM_IN_GRID, setGrid, drawGrid };
