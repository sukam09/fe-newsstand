export function rolling() {
  const rightRollingList = document.querySelectorAll(".left_rolling_list_item");
  const leftRollingList = document.querySelectorAll(".right_rolling_list_item");

  let leftViewIdx = 0;
  let rightViewIdx = 0;
  const list_len = 5;

  const rollingAnimation = (rollingList, viewIdx) => {
    const viewItem = rollingList[viewIdx % list_len];
    const nextItem = rollingList[(viewIdx + 1) % list_len];
    const topItem = rollingList[(viewIdx + 2) % list_len];
    viewItem.className = "top";
    nextItem.className = "view";
    topItem.className = "next";
  };

  setTimeout(() => {
    setInterval(() => {
      rollingAnimation(leftRollingList, leftViewIdx);
      leftViewIdx += 1;
    }, 5000);
  }, 1000);

  setInterval(() => {
    rollingAnimation(rightRollingList, rightViewIdx);
    rightViewIdx += 1;
  }, 5000);
}
