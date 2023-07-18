function confirm(selectedPress, _img, view) {
  document.querySelector(".confirm").style.display = "block";
  const _answer = document.querySelector(".answer");
  //YES
  _answer.children[0].addEventListener(
    "click",
    () => clickYes(selectedPress, _img, view),
    { once: true }
  );
  //NO
  _answer.children[1].addEventListener("click", clickNo);
}

function clickYes(selectedPress, _img, view) {
  let SubscribePress = JSON.parse(localStorage.getItem("press"));
  SubscribePress = SubscribePress.filter((ele) => ele !== selectedPress);
  localStorage.setItem("press", JSON.stringify(SubscribePress));
  document.querySelector(".confirm").style.display = "none";
  if (view === "list") _img.setAttribute("src", "../images/icon/subscribe.svg");
}
function clickNo() {
  document.querySelector(".confirm").style.display = "none";
}
export { confirm };
