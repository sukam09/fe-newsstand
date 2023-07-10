function moveTopContent(
  firstTitle,
  secondTitle,
  thirdTitle,
  firstCorp,
  secondCorp,
  thirdCorp
) {
  firstTitle.classList.remove("card_sliding");
  firstTitle.classList.add("card_sliding_after");

  secondTitle.classList.remove("card_sliding_after");
  secondTitle.classList.add("card_sliding");

  thirdTitle.classList.remove("card_sliding_after");
  thirdTitle.classList.remove("card_sliding");

  firstCorp.classList.remove("card_sliding");
  firstCorp.classList.add("card_sliding_after");

  secondCorp.classList.remove("card_sliding_after");
  secondCorp.classList.add("card_sliding");

  thirdCorp.classList.remove("card_sliding_after");
  thirdCorp.classList.remove("card_sliding");
}

function moveMiddleContent(
  firstTitle,
  secondTitle,
  thirdTitle,
  firstCorp,
  secondCorp,
  thirdCorp
) {
  firstTitle.classList.remove("card_sliding_after");
  firstTitle.classList.add("card_sliding");

  secondTitle.classList.remove("card_sliding_after");
  secondTitle.classList.remove("card_sliding");

  thirdTitle.classList.remove("card_sliding");
  thirdTitle.classList.add("card_sliding_after");

  firstCorp.classList.remove("card_sliding_after");
  firstCorp.classList.add("card_sliding");

  secondCorp.classList.remove("card_sliding_after");
  secondCorp.classList.remove("card_sliding");

  thirdCorp.classList.remove("card_sliding");
  thirdCorp.classList.add("card_sliding_after");
}

function moveBottomContent(
  firstTitle,
  secondTitle,
  thirdTitle,
  firstCorp,
  secondCorp,
  thirdCorp
) {
  firstTitle.classList.remove("card_sliding_after");
  firstTitle.classList.remove("card_sliding");

  secondTitle.classList.remove("card_sliding");
  secondTitle.classList.add("card_sliding_after");

  thirdTitle.classList.remove("card_sliding_after");
  thirdTitle.classList.add("card_sliding");

  firstCorp.classList.remove("card_sliding_after");
  firstCorp.classList.remove("card_sliding");

  secondCorp.classList.remove("card_sliding");
  secondCorp.classList.add("card_sliding_after");

  thirdCorp.classList.remove("card_sliding_after");
  thirdCorp.classList.add("card_sliding");
}

function replaceText(
  whereCorp,
  whereTitle,
  currentChildIndex,
  dataCnt,
  newsDataLeft
) {
  document.getElementsByClassName(whereCorp)[0].children[
    currentChildIndex
  ].textContent = newsDataLeft[dataCnt].corp;
  document.getElementsByClassName(whereTitle)[0].children[
    currentChildIndex
  ].textContent = newsDataLeft[dataCnt].title;
}

export { moveTopContent, moveMiddleContent, moveBottomContent, replaceText };
