const CARD_SLIDING = "card_sliding";
const CARD_SLIDING_AFTER = "card_sliding_after";

function moveTopContent(
  firstTitle,
  secondTitle,
  thirdTitle,
  firstCorp,
  secondCorp,
  thirdCorp
) {
  rollingAction(firstTitle, "remove", CARD_SLIDING, "add", CARD_SLIDING_AFTER);
  rollingAction(secondTitle, "remove", CARD_SLIDING_AFTER, "add", CARD_SLIDING);
  rollingAction(
    thirdTitle,
    "remove",
    CARD_SLIDING_AFTER,
    "remove",
    CARD_SLIDING
  );

  rollingAction(firstCorp, "remove", CARD_SLIDING, "add", CARD_SLIDING_AFTER);
  rollingAction(secondCorp, "remove", CARD_SLIDING_AFTER, "add", CARD_SLIDING);
  rollingAction(
    thirdCorp,
    "remove",
    CARD_SLIDING_AFTER,
    "remove",
    CARD_SLIDING
  );
}

function moveMiddleContent(
  firstTitle,
  secondTitle,
  thirdTitle,
  firstCorp,
  secondCorp,
  thirdCorp
) {
  rollingAction(firstTitle, "remove", CARD_SLIDING_AFTER, "add", CARD_SLIDING);
  rollingAction(
    secondTitle,
    "remove",
    CARD_SLIDING_AFTER,
    "remove",
    CARD_SLIDING
  );
  rollingAction(thirdTitle, "remove", CARD_SLIDING, "add", CARD_SLIDING_AFTER);

  rollingAction(firstCorp, "remove", CARD_SLIDING_AFTER, "add", CARD_SLIDING);
  rollingAction(
    secondCorp,
    "remove",
    CARD_SLIDING_AFTER,
    "remove",
    CARD_SLIDING
  );
  rollingAction(thirdCorp, "remove", CARD_SLIDING, "add", CARD_SLIDING_AFTER);
}

function moveBottomContent(
  firstTitle,
  secondTitle,
  thirdTitle,
  firstCorp,
  secondCorp,
  thirdCorp
) {
  rollingAction(
    firstTitle,
    "remove",
    CARD_SLIDING_AFTER,
    "remove",
    CARD_SLIDING
  );
  rollingAction(secondTitle, "remove", CARD_SLIDING, "add", CARD_SLIDING_AFTER);
  rollingAction(thirdTitle, "remove", CARD_SLIDING_AFTER, "add", CARD_SLIDING);

  rollingAction(
    firstCorp,
    "remove",
    CARD_SLIDING_AFTER,
    "remove",
    CARD_SLIDING
  );
  rollingAction(secondCorp, "remove", CARD_SLIDING, "add", CARD_SLIDING_AFTER);
  rollingAction(thirdCorp, "remove", CARD_SLIDING_AFTER, "add", CARD_SLIDING);
}

function replaceText(
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
  position.classList.remove(className);
}

function addAction(position, className) {
  position.classList.add(className);
}

export { moveTopContent, moveMiddleContent, moveBottomContent, replaceText };
