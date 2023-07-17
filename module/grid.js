import { ICON, GRID, GLOBAL } from "./variable.js";
import { checkSubscribe, toggleSubscribe } from "./subscribe.js";

function initGrid() {
  try {
    let iconIndex = GLOBAL.GRID_CURRENT_PAGE * GRID.NEWS_NUM;
    for (let i = 0; i < GRID.ROW_NUM; i++) {
      const gridRow = document.createElement("ul");
      gridRow.className = "grid-row";
      for (let j = 0; j < GRID.COL_NUM; j++) {
        const gridLi = document.createElement("li");
        const PressLogo = document.createElement("img");
        PressLogo.className = "press-logo";

        PressLogo.src = GLOBAL.NEWS_DATA[iconIndex++].path;

        gridLi.appendChild(PressLogo);
        gridLi.addEventListener("mouseenter", (event) => {
          gridHover(event);
        });
        gridLi.addEventListener("mouseleave", (event) => {
          gridHover(event);
        });
        gridRow.appendChild(gridLi);
      }
      GLOBAL.DOM.GRID_VIEW.appendChild(gridRow);
    }
    updateGrid();
  } catch (e) {
    console.error(e);
  }
}

function updateGrid() {
  try {
    if (GLOBAL.NEWS_DATA) {
      let iconIndex = GLOBAL.GRID_CURRENT_PAGE * GRID.NEWS_NUM;
      const gridRow = document.querySelectorAll(".grid ul");

      gridRow.forEach((ul) => {
        const gridLi = ul.querySelectorAll("li");
        gridLi.forEach((li) => {
          const PressLogo = li.querySelector(".press-logo");
          PressLogo.src = GLOBAL.NEWS_DATA[iconIndex++].path;
        });
      });
    } else {
      throw "empty data!";
    }
  } catch (e) {
    console.log(e);
  }
}

function moveGrid(direction) {
  GLOBAL.GRID_CURRENT_PAGE += direction;
  if (GLOBAL.GRID_CURRENT_PAGE === GRID.MIN_PAGE) {
    GLOBAL.DOM.LEFT_BTN.style.display = "none";
  } else if (GLOBAL.GRID_CURRENT_PAGE === GRID.MAX_PAGE) {
    GLOBAL.DOM.RIGHT_BTN.style.display = "none";
  } else {
    GLOBAL.DOM.RIGHT_BTN.style.display = "block";
    GLOBAL.DOM.LEFT_BTN.style.display = "block";
  }
  updateGrid();
}

function gridHover(event) {
  if (event.type === "mouseenter") {
    const isSubscribe = checkSubscribe(event.target.firstChild.src);
    const subscribeBtn = document.createElement("button");
    subscribeBtn.className = "list-sub-btn";
    const subscribeImg = document.createElement("img");
    subscribeImg.src = "./icons/SymbolPlus.svg";
    const subscribeSpan = document.createElement("span");
    subscribeSpan.className = "available-medium12";
    subscribeSpan.innerHTML = isSubscribe ? "해지하기" : "구독하기";
    subscribeBtn.appendChild(subscribeImg);
    subscribeBtn.appendChild(subscribeSpan);
    subscribeBtn.addEventListener("click", (event) => {
      const target = event.target.localName === "button" ? event.target.parentNode.firstChild : event.target.parentNode.parentNode.firstChild;
      const result = toggleSubscribe(target.src);
      target.nextSibling.childNodes[0].src = result === "true" ? ICON.X : ICON.PLUS;
      target.nextSibling.childNodes[1].innerHTML = result === "true" ? "해지하기" : "구독하기";
    });
    event.target.appendChild(subscribeBtn);
    event.target.querySelector(".press-logo").style.display = "none";
  } else if (event.type === "mouseleave") {
    event.target.querySelector(".list-sub-btn").remove();
    event.target.querySelector(".press-logo").style.display = "block";
  }
}

export { initGrid, moveGrid, gridHover };
