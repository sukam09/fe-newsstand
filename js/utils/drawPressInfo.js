import { parentCallback } from "../sections/mainView.js";
import { SNACKBAR_WAIT_TIME } from "../constants/constants.js";

function handleClick(e, subscribedPress, press) {
  const btn_target = e.target.closest("button");

  const press_news = document.querySelector(".press-news");
  const newDiv = document.createElement("div");
  if (btn_target) {
    console.log(subscribedPress, subscribedPress.includes(press));
    if (btn_target.classList.contains("cancel")) {
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
    } else {
      console.log("현재 언론사", press);
      subscribedPress = [...subscribedPress, press];
      newDiv.classList.add("popup", "snackbar");
      newDiv.textContent = "내가 구독한 언론사에 추가되었습니다.";
      press_news.appendChild(newDiv);
      showSubscribeButton(subscribedPress, press);
      parentCallback(subscribedPress);
      newDiv.addEventListener("animationend", handleAnimationEnd);
    }
  }
}
function handleAnimationEnd() {
  const main_list = document.querySelector(".main-list");
  setTimeout(() => {
    main_list.innerHTML = ""; //TODO 내가 구독한 언론사 탭으로 이동
  }, SNACKBAR_WAIT_TIME);
}

function checkAnswer(e, subscribedPress, press) {
  const target = e.target.closest("button");
  const alert = document.querySelector(".alert");
  alert.style.display = "none";
  if (target.classList.contains("btn-yes")) {
    console.log("yes");
    const updatedPress = subscribedPress.filter((item) => item !== press);
    subscribedPress = updatedPress;
    showSubscribeButton(subscribedPress, press);
    parentCallback(subscribedPress);
  } else {
    console.log("no");
  }
}
function showSubscribeButton(subscribedPress, press) {
  const subscribe_btn = document.querySelector(".subscribe");
  const cancel_btn = document.querySelector(".cancel");
  if (subscribedPress.includes(press)) {
    subscribe_btn.style.display = "none";
    cancel_btn.style.display = "block";
  } else {
    subscribe_btn.style.display = "flex";
    cancel_btn.style.display = "none";
  }
}
export function drawPressInfo(img, subscribedPress, press) {
  const press_news = document.querySelector(".press-news");
  press_news.innerHTML = `<div class="press-info">
      <img
        id="press-logo"
        alt="press-logo"
        src="../assets/images/logo/light/img${img}.svg"
      />
      <span class="edit-date">2023.07.12 16:52 편집</span>
      <div class="sub">
        <button class="sub subscribe">
          <img src="../assets/icons/plus.svg" />
          <span>구독하기</span>
        </button>
        <button class="sub cancel">
          <img src="../assets/icons/closed.svg" />
        </button>
      </div>
    </div>`;
  showSubscribeButton(subscribedPress, press);
  const newDiv = document.createElement("div");
  newDiv.classList.add("news-content");
  press_news.appendChild(newDiv);
  const sub_btn = document.querySelector(".press-info .sub");
  sub_btn.addEventListener("click", (e) =>
    handleClick(e, subscribedPress, press)
  );
}
