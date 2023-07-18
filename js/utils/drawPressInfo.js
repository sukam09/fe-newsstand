import { getSubscribedPress, parentCallback } from "../sections/mainView.js";
import { SNACKBAR_WAIT_TIME } from "../constants/constants.js";

function handleClick(e, subscribedPress, press) {
  subscribedPress = getSubscribedPress();
  let btn_target = e.target.closest("button");
  const button = document.querySelector(".sub");
  const press_news = document.querySelector(".press-news");
  const newDiv = document.createElement("div");
  if (btn_target) {
    let isSubscribed = subscribedPress.includes(press);
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
      btn.addEventListener("click", (e) =>
        checkAnswer(e, subscribedPress, press)
      );
    }
    //구독하지 않았을 때 => 구독됨
    else {
      //추가
      const updateSubscribedPress = [...subscribedPress, press];
      subscribedPress = updateSubscribedPress;
      //스낵바
      newDiv.classList.add("popup", "snackbar");
      newDiv.textContent = "내가 구독한 언론사에 추가되었습니다.";
      press_news.appendChild(newDiv);
      //구독한 상태로 바뀜
      //버튼 변경
      button.innerHTML = showSubscribeButton(!isSubscribed);
      //부모에도 전달
      parentCallback(subscribedPress);
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

function checkAnswer(e, subscribedPress, press) {
  const button = document.querySelector(".sub");
  const target = e.target.closest("button");
  const alert = document.querySelector(".alert");
  alert.style.display = "none";
  if (target.classList.contains("btn-yes")) {
    console.log("yes");
    const updatedPress = subscribedPress.filter((item) => item !== press);
    subscribedPress = updatedPress;
    showSubscribeButton(subscribedPress, press);
    button.innerHTML = showSubscribeButton(subscribedPress.includes(press));
    parentCallback(subscribedPress);
  } else {
    console.log("no");
  }
}
function showSubscribeButton(isSubscribed) {
  return isSubscribed
    ? `
      <button class="sub cancel">
        <img src="../assets/icons/closed.svg" />
      </button>
    `
    : `
      <button class="sub subscribe">
        <img src="../assets/icons/plus.svg" />
        <span>구독하기</span>
      </button>
      `;
}

export function drawPressInfo(order, list_content, list, subscribedPress) {
  subscribedPress = getSubscribedPress();
  const press_news = document.querySelector(".press-news");
  const isSubscribed = subscribedPress.includes(list_content[order - 1].name);
  const button = showSubscribeButton(isSubscribed);
  try {
    press_news.innerHTML = `<div class="press-info">
    <img
      id="press-logo"
      alt="press-logo"
      src="${list_content[order - 1].src}"
    />
    <span class="edit-date">${list_content[order - 1].edit_date} 편집</span>
    <div class="sub">${button}</div>
  </div>`;
    const newDiv = document.createElement("div");
    newDiv.classList.add("news-content");
    press_news.appendChild(newDiv);
    const sub_btn = document.querySelector(".press-info .sub");
    sub_btn.addEventListener("click", (e) => {
      handleClick(e, subscribedPress, list_content[order - 1].name);
    });
  } catch {}
}
