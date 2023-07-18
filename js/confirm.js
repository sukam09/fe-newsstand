function confirm(selectedPress, _img) {
  document.querySelector(".confirm").style.display = "block";
  //YES
  _answer.children[0].addEventListener("click", () =>
    clickYes(selectedPress, _img)
  );
  //NO
  _answer.children[1].addEventListener("click", () => {});
}

function clickYes(selectedPress, _img) {
  let SubscribePress = JSON.parse(localStorage.getItem("press"));
  SubscribePress = SubscribePress.filter((ele) => ele !== selectedPress);
  _img.setAttribute("src", "../images/icon/subscribe.svg");
  localStorage.setItem("press", JSON.stringify(SubscribePress));
  document.querySelector(".confirm").style.display = "none";
}
export { confirm };
