import { fetchData } from "../../../utils.js";
import { rollingList } from "./rollingList/rollingList.js";

export function rolling() {
  const leftRollingList = document.querySelectorAll(".left_rolling_list_item");
  const rightRollingList = document.querySelectorAll(
    ".right_rolling_list_item"
  );

  console.log(leftRollingList);
  console.log(rightRollingList);

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

export async function headline() {
  const headlineData = await fetchData("/data/headline.json");

  let leftRollingList = "";

  for (let i = 0; i < headlineData.length / 2; i++) {
    if (i === 0) {
      leftRollingList += `
      <li class="left_rolling_list_item view">
        ${headlineData[i].title}
      </li>
      `;
    } else if (i === 1) {
      leftRollingList += `
      <li class="left_rolling_list_item next">
        ${headlineData[i].title}
      </li>
      `;
    } else {
      leftRollingList += `
      <li class="left_rolling_list_item top">
        ${headlineData[i].title}
      </li>
      `;
    }
  }
  let rightRollingList = "";

  for (let i = headlineData.length / 2; i < headlineData.length; i++) {
    if (i === headlineData.length / 2) {
      rightRollingList += `
      <li class="right_rolling_list_item view">
        ${headlineData[i].title}
      </li>
      `;
    } else if (i === headlineData.length / 2 + 1) {
      rightRollingList += `
      <li class="right_rolling_list_item next">
        ${headlineData[i].title}
      </li>
      `;
    } else {
      rightRollingList += `
      <li class="right_rolling_list_item top">
        ${headlineData[i].title}
      </li>
      `;
    }
  }

  return `
    <div class="headline_container flex_row">
      <h2>연합뉴스</h2>
      <ul class=${"left_rolling_list"}>
        ${leftRollingList}
      </ul>
      
    </div>
    <div class="headline_container flex_row">
      <h2>연합뉴스</h2>
      <ul class=${"right_rolling_list"}>
        ${rightRollingList}
      </ul>
    </div>
  `;
}
