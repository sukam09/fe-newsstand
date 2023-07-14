import { fetchData, qsa } from "../../../utils.js";

export let leftRollingId;
export let rightRollingId;
export let leftViewIdx = 0;
export let rightViewIdx = 0;

export function startRollingAnimation() {
  const $leftRollingList = qsa(".left_rolling_list_item");
  const $rightRollingList = qsa(".right_rolling_list_item");

  setTimeout(() => {
    leftRollingId = setInterval(() => {
      rollingAnimation($leftRollingList, leftViewIdx);
      leftViewIdx += 1;
    }, 5000);
  }, 1000);

  rightRollingId = setInterval(() => {
    rollingAnimation($rightRollingList, rightViewIdx);
    rightViewIdx += 1;
  }, 5000);
}

export const rollingAnimation = (rollingList, viewIdx) => {
  const list_len = rollingList.length;
  const viewItem = rollingList[viewIdx % list_len];
  const nextItem = rollingList[(viewIdx + 1) % list_len];
  const topItem = rollingList[(viewIdx + 2) % list_len];
  viewItem.className = "top";
  nextItem.className = "view";
  topItem.className = "next";
};

export function setLeftRollingId(value) {
  leftRollingId = value;
}
export function setRightRollingId(value) {
  rightRollingId = value;
}
export function setLeftViewIdx(value) {
  leftViewIdx = value;
}
export function setRightViewIdx(value) {
  rightViewIdx = value;
}

export async function createHeadline() {
  const headlineData = await fetchData("/data/headline.json");

  let leftRollingList = "";
  let rightRollingList = "";

  for (let i = 0; i < headlineData.length / 2; i++) {
    if (i === 0) {
      leftRollingList += `
      <li class="left_rolling_list_item view">
      `;
    } else if (i === 1) {
      leftRollingList += `
      <li class="left_rolling_list_item next">
      `;
    } else {
      leftRollingList += `
      <li class="left_rolling_list_item top">
      `;
    }
    leftRollingList += `
      <span class="headline_title">연합뉴스</span>
        ${headlineData[i].title}
      </li>`;
  }

  for (let i = headlineData.length / 2; i < headlineData.length; i++) {
    if (i === headlineData.length / 2) {
      rightRollingList += `
      <li class="right_rolling_list_item view">
      `;
    } else if (i === headlineData.length / 2 + 1) {
      rightRollingList += `
      <li class="right_rolling_list_item next">
      `;
    } else {
      rightRollingList += `
      <li class="right_rolling_list_item top">
      `;
    }
    rightRollingList += `
        <span class="headline_title">연합뉴스</span>
        ${headlineData[i].title}
      </li>`;
  }

  return `
    <div class="headline_container flex_row">
      <ul class=${"left_rolling_list"}>
        ${leftRollingList}
      </ul>
      
    </div>
    <div class="headline_container flex_row">
      <ul class=${"right_rolling_list"}>
        ${rightRollingList}
      </ul>
    </div>
  `;
}
