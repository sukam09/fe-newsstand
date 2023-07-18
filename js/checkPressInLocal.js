function checkPressInLocal(press) {
  //local에 아무것도 없을 때
  if (!localStorage.getItem("press")) {
    localStorage.setItem("press", JSON.stringify([]));
  }

  let SubscribePress = JSON.parse(localStorage.getItem("press"));

  //구독 X
  if (!SubscribePress.includes(`${press}`)) {
    return false;
  }
  // 구독 O
  else {
    return true;
  }
}
export { checkPressInLocal };
