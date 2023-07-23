import { store } from "../core/store.js";
import { ICON_IMG_PATH, SNACKBAR_WAIT_TIME } from "../constants/constants.js";
import { getPage, getSubscribedPress } from "../core/getter.js";
function handleClick(e, press) {
  let btn_target = e.target.closest("button");
  const button = document.querySelector(".sub");
  const press_news = document.querySelector(".press-news");
  const newDiv = document.createElement("div");
  if (btn_target) {
    let isSubscribed = getSubscribedPress().includes(press);
    btn_target = showSubscribeButton(isSubscribed);
    //구독한 상태에서 누를 경우
    if (isSubscribed) {
      console.log("해지");
      newDiv.classList.add("popup", "alert");
      newDiv.innerHTML = `
      <div class="message"><span class="press">${press}</span>을(를)\n구독해지하시겠습니까?</div>
      <div class="buttons">
        <button class="btn-yes">예, 해지합니다</button>
        <button class="btn-no">아니오</button>
      </div>`;
      press_news.appendChild(newDiv);
      const btn = document.querySelector(".buttons");
      btn.addEventListener("click", (e) => checkAnswer(e, press));
    }
    //구독하지 않았을 때 => 구독됨
    else {
      const pattern = /img(\d+)\.svg/; // 정규식 패턴

      const updatePressObject = {
        name: press.name,
        index: press.src.match(pattern)[1],
      };
      const updatedSubscribedPress = [...subscribedPress, updatePressObject];
      store.setState({ subscribedPress: updatedSubscribedPress });
      //스낵바
      newDiv.classList.add("popup", "snackbar");
      newDiv.textContent = "내가 구독한 언론사에 추가되었습니다.";
      press_news.appendChild(newDiv);
      //구독한 상태로 바뀜
      //버튼 변경
      button.innerHTML = showSubscribeButton(!isSubscribed);
      // newDiv.addEventListener("animationend", handleAnimationEnd);
    }
  }
}
// function handleAnimationEnd() {
//   const main_list = document.querySelector(".main-list");
//   setTimeout(() => {
//     main_list.innerHTML = ""; //TODO 내가 구독한 언론사 탭으로 이동
//   }, SNACKBAR_WAIT_TIME);
// }

function checkAnswer(e, press) {
  const button = document.querySelector(".sub");
  const target = e.target.closest("button");
  const alert = document.querySelector(".alert");
  alert.style.display = "none";
  if (target.classList.contains("btn-yes")) {
    console.log("yes");
    const updatedSubscribedPress = subscribedPress.filter(
      (item) => item.name !== press.name
    );
    store.setState({ subscribedPress: updatedSubscribedPress });
    showSubscribeButton(getSubscribedPress().includes(press.name));
    button.innerHTML = showSubscribeButton(subscribedPress.includes(press));
  } else {
    console.log("no");
  }
}
function showSubscribeButton(isSubscribed) {
  return isSubscribed
    ? `
      <button class="sub cancel">
        <img src="${ICON_IMG_PATH}/closed.svg" />
      </button>
    `
    : `
      <button class="sub subscribe">
        <img src="${ICON_IMG_PATH}/plus.svg" />
        <span>구독하기</span>
      </button>
      `;
}

export function drawPressInfo(list_content) {
  const press_news = document.querySelector(".press-news");
  const isSubscribed = getSubscribedPress().includes(
    list_content[getPage() - 1]
  );
  const button = showSubscribeButton(isSubscribed);
  try {
    press_news.innerHTML = `<div class="press-info">
    <img
      id="press-logo"
      alt="press-logo"
      src="${list_content[getPage() - 1].src}"
    />
    <span class="edit-date">${list_content[getPage() - 1].edit_date} 편집</span>
    <div class="sub">${button}</div>
  </div>`;
    const newDiv = document.createElement("div");
    newDiv.classList.add("news-content");
    press_news.appendChild(newDiv);
    const sub_btn = document.querySelector(".press-info .sub");
    sub_btn.addEventListener("click", (e) => {
      handleClick(e, list_content[getPage() - 1]);
    });
  } catch {}
}
