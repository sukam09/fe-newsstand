import { handleElementClass } from "./util.js";

const CARD_SLIDING = "card_sliding";
const CARD_SLIDING_AFTER = "card_sliding_after";

export function moveTopContent(
  firstCp,
  secondCp,
  thirdCp,
  firstT,
  secondT,
  thirdT
) {
  rollingAction(firstT, "remove", CARD_SLIDING, "add", CARD_SLIDING_AFTER);
  rollingAction(secondT, "remove", CARD_SLIDING_AFTER, "add", CARD_SLIDING);
  rollingAction(thirdT, "remove", CARD_SLIDING_AFTER, "remove", CARD_SLIDING);

  rollingAction(firstCp, "remove", CARD_SLIDING, "add", CARD_SLIDING_AFTER);
  rollingAction(secondCp, "remove", CARD_SLIDING_AFTER, "add", CARD_SLIDING);
  rollingAction(thirdCp, "remove", CARD_SLIDING_AFTER, "remove", CARD_SLIDING);
}

export function moveMiddleContent(
  firstCp,
  secondCp,
  thirdCp,
  firstT,
  secondT,
  thirdT
) {
  rollingAction(firstT, "remove", CARD_SLIDING_AFTER, "add", CARD_SLIDING);
  rollingAction(secondT, "remove", CARD_SLIDING_AFTER, "remove", CARD_SLIDING);
  rollingAction(thirdT, "remove", CARD_SLIDING, "add", CARD_SLIDING_AFTER);

  rollingAction(firstCp, "remove", CARD_SLIDING_AFTER, "add", CARD_SLIDING);
  rollingAction(secondCp, "remove", CARD_SLIDING_AFTER, "remove", CARD_SLIDING);
  rollingAction(thirdCp, "remove", CARD_SLIDING, "add", CARD_SLIDING_AFTER);
}

export function moveBottomContent(
  firstCp,
  secondCp,
  thirdCp,
  firstT,
  secondT,
  thirdT
) {
  rollingAction(firstT, "remove", CARD_SLIDING_AFTER, "remove", CARD_SLIDING);
  rollingAction(secondT, "remove", CARD_SLIDING, "add", CARD_SLIDING_AFTER);
  rollingAction(thirdT, "remove", CARD_SLIDING_AFTER, "add", CARD_SLIDING);

  rollingAction(firstCp, "remove", CARD_SLIDING_AFTER, "remove", CARD_SLIDING);
  rollingAction(secondCp, "remove", CARD_SLIDING, "add", CARD_SLIDING_AFTER);
  rollingAction(thirdCp, "remove", CARD_SLIDING_AFTER, "add", CARD_SLIDING);
}

export function replaceText(
  whereCorp,
  whereTitle,
  currentChildIndex,
  dataCnt,
  headlineData
) {
  document.querySelector(whereCorp).children[currentChildIndex].textContent =
    headlineData[dataCnt].publisher;
  document.querySelector(whereTitle).children[currentChildIndex].textContent =
    headlineData[dataCnt].title;
}

function rollingAction(position, action1, class1, action2, class2) {
  action1 === "add"
    ? addAction(position, class1)
    : removeAction(position, class1);
  action2 === "add"
    ? addAction(position, class2)
    : removeAction(position, class2);
}

function removeAction(position, className) {
  handleElementClass(position, "remove", className);
}

function addAction(position, className) {
  handleElementClass(position, "add", className);
}
