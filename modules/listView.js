export function rolling() {
  const leftRollingList = document.querySelectorAll(".left_rolling_list_item");
  const rightRollingList = document.querySelectorAll(
    ".right_rolling_list_item"
  );

  let leftViewIdx = 0;
  let rightViewIdx = 0;
  const list_len = rightRollingList.length;
  let leftRollingId;
  let rightRollingId;

  const rollingAnimation = (rollingList, viewIdx) => {
    const viewItem = rollingList[viewIdx % list_len];
    const nextItem = rollingList[(viewIdx + 1) % list_len];
    const topItem = rollingList[(viewIdx + 2) % list_len];
    viewItem.className = "top";
    nextItem.className = "view";
    topItem.className = "next";
  };
  setTimeout(() => {
    leftRollingId = setInterval(() => {
      rollingAnimation(leftRollingList, leftViewIdx);
      leftViewIdx += 1;
    }, 5000);
  }, 1000);

  rightRollingId = setInterval(() => {
    rollingAnimation(rightRollingList, rightViewIdx);
    rightViewIdx += 1;
  }, 5000);
}
