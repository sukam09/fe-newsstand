function makeGrid() {
  const COUNT_PER_PAGE = 24;
  shuffle(logos);
  gridMain.style.display = "grid";
  listMain.style.display = "none";
  gridMain.innerHTML = "";
  let outerDiv = "";
  for (
    let LOGO_INDEX = Stores.getPage() * COUNT_PER_PAGE;
    LOGO_INDEX < COUNT_PER_PAGE * Stores.getPage() + 24;
    LOGO_INDEX++
  ) {
    outerDiv += `<div class="grid-list"><div class="hover-subscribe-button"><img src="./img/subscribe_button.svg"></div>${drawLogo(
      LOGO_INDEX
    )}</div>`;
  }
  gridMain.innerHTML = outerDiv;
}

function drawLogo(LOGO_INDEX) {
  if (logos[LOGO_INDEX] != undefined) {
    const newsLogo = `<img class="grid-image" src="${logos[LOGO_INDEX].logo}">`;
    return newsLogo;
  }
  return "";
}

function increaseGridPage() {
  if (Stores.getPage() === MAX_PAGE_NUMBER - 1) {
    rightAsideButton.style.visibility = "hidden";
    Stores.setPage(Stores.getPage() + 1);
    renderGrid();
    return;
  }
  leftAsideButton.style.visibility = "visible";
  Stores.setPage(Stores.getPage() + 1);
  renderGrid();
}

function decreaseGridPage() {
  if (Stores.getPage() === MIN_PAGE_NUMBER + 1) {
    leftAsideButton.style.visibility = "hidden";
    Stores.setPage(Stores.getPage() - 1);
    renderGrid();
    return;
  }
  rightAsideButton.style.visibility = "visible";
  Stores.setPage(Stores.getPage() - 1);
  renderGrid();
}
