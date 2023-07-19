function manipulateSubPress(press) {
  const subPress = JSON.parse(localStorage.getItem("press"));

  let subPressInfo = [];
  press.map((item) => {
    if (subPress.includes(item.name)) subPressInfo.push(item);
  });
  return subPressInfo;
}
export { manipulateSubPress };
