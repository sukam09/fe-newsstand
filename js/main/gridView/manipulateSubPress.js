function manipulateSubPress(press) {
  const subPress = JSON.parse(localStorage.getItem("press"));
  let subPressInfo = [];

  subPress.forEach((item) => {
    press.forEach((ele) => {
      if (ele.name === item) subPressInfo.push(ele);
    });
  });
  return subPressInfo;
}
export { manipulateSubPress };
