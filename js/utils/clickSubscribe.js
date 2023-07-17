function clickSubscribe(selectedPress) {
  //local에 아무것도 없을 때
  if (!localStorage.getItem("press")) {
    localStorage.setItem("press", JSON.stringify([]));
  }

  //local에 없으면 추가 있으면 삭제
  let SubscribePress = JSON.parse(localStorage.getItem("press"));

  if (SubscribePress.includes(selectedPress)) {
    SubscribePress = SubscribePress.filter((ele) => ele !== selectedPress);
  } else {
    SubscribePress.push(selectedPress);
  }
  localStorage.setItem("press", JSON.stringify(SubscribePress));
}
export { clickSubscribe };
