import { clickNo, clickYes } from "./eventHandlers.js";

function confirmModal(selectedPress, _img) {
  document.querySelector(".confirm").style.display = "block";
  document.querySelector(
    ".question"
  ).innerHTML = `<span><span>${selectedPress}</span>을(를)</span> 구독해지하시겠습니까?`;

  const _answer = document.querySelector(".answer");
  //YES
  _answer.children[0].addEventListener(
    "click",
    () => clickYes(selectedPress, _img),
    { once: true }
  );
  //NO
  _answer.children[1].addEventListener("click", clickNo);
}

export { confirmModal };
