import { fetchData } from "../../utils.js";

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

export async function initHeadline() {
  const headlineData = await fetchData("/data/headline.json");

  const leftRollingList =
    document.getElementsByClassName("left_rolling_list")[0];
  const rightRollingList =
    document.getElementsByClassName("right_rolling_list")[0];

  for (let i = 0; i < headlineData.length / 2; i++) {
    const li = document.createElement("li");
    li.innerHTML = headlineData[i].title;
    li.className = "left_rolling_list_item";
    if (i === 0) {
      li.classList.add("view");
    } else if (i === 1) {
      li.classList.add("next");
    } else {
      li.classList.add("top");
    }
    leftRollingList.appendChild(li);
  }
  for (let i = headlineData.length / 2; i < headlineData.length; i++) {
    const li = document.createElement("li");
    li.innerHTML = headlineData[i].title;
    li.className = "right_rolling_list_item";
    if (i === headlineData.length / 2) {
      li.classList.add("view");
    } else if (i === headlineData.length / 2 + 1) {
      li.classList.add("next");
    } else {
      li.classList.add("top");
    }
    rightRollingList.appendChild(li);
  }

  rolling();
}
