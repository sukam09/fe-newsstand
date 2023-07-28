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
  const action = [
    [firstT, "remove", CARD_SLIDING, "add", CARD_SLIDING_AFTER],
    [secondT, "remove", CARD_SLIDING_AFTER, "add", CARD_SLIDING],
    [thirdT, "remove", CARD_SLIDING_AFTER, "remove", CARD_SLIDING],
    [firstCp, "remove", CARD_SLIDING, "add", CARD_SLIDING_AFTER],
    [secondCp, "remove", CARD_SLIDING_AFTER, "add", CARD_SLIDING],
    [thirdCp, "remove", CARD_SLIDING_AFTER, "remove", CARD_SLIDING],
  ];

  action.forEach((act) =>
    rollingAction(act[0], act[1], act[2], act[3], act[4])
  );
}

export function moveMiddleContent(
  firstCp,
  secondCp,
  thirdCp,
  firstT,
  secondT,
  thirdT
) {
  const action = [
    [firstT, "remove", CARD_SLIDING_AFTER, "add", CARD_SLIDING],
    [secondT, "remove", CARD_SLIDING_AFTER, "remove", CARD_SLIDING],
    [thirdT, "remove", CARD_SLIDING, "add", CARD_SLIDING_AFTER],
    [firstCp, "remove", CARD_SLIDING_AFTER, "add", CARD_SLIDING],
    [secondCp, "remove", CARD_SLIDING_AFTER, "remove", CARD_SLIDING],
    [thirdCp, "remove", CARD_SLIDING, "add", CARD_SLIDING_AFTER],
  ];
  action.forEach((act) =>
    rollingAction(act[0], act[1], act[2], act[3], act[4])
  );
}

export function moveBottomContent(
  firstCp,
  secondCp,
  thirdCp,
  firstT,
  secondT,
  thirdT
) {
  const action = [
    [firstT, "remove", CARD_SLIDING_AFTER, "remove", CARD_SLIDING],
    [secondT, "remove", CARD_SLIDING, "add", CARD_SLIDING_AFTER],
    [thirdT, "remove", CARD_SLIDING_AFTER, "add", CARD_SLIDING],
    [firstCp, "remove", CARD_SLIDING_AFTER, "remove", CARD_SLIDING],
    [secondCp, "remove", CARD_SLIDING, "add", CARD_SLIDING_AFTER],
    [thirdCp, "remove", CARD_SLIDING_AFTER, "add", CARD_SLIDING],
  ];
  action.forEach((act) =>
    rollingAction(act[0], act[1], act[2], act[3], act[4])
  );
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
