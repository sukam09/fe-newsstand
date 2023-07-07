function removeChildElement(parent) {
  while (parent.firstChild) {
    parent.firstChild.remove();
  }
}
function paintNewsicon(selectedPage, newsstandList) {
  const ul = document.querySelector(".newsstand-area—six-col-list");
  for (let idx = selectedPage * 24; idx < selectedPage * 24 + 24; idx++) {
    const li = document.createElement("li");
    li.className = "newsstand—subscrtion-box";
    const img = document.createElement("img");
    const icon = newsstandList[idx];
    img.src = `./assets/newsIcon/light/${icon}`;
    li.appendChild(img);
    ul.appendChild(li);
  }
}

function newsPagination(selectedPage, newsstandList) {
  const ul = document.querySelector(".newsstand-area—six-col-list");
  const rightBtn = document.querySelector(".newsstand--right-btn");
  const leftBtn = document.querySelector(".newsstand--left-btn");
  rightBtn.addEventListener("click", (e) => {
    removeChildElement(ul);
    paintNewsicon(++selectedPage, newsstandList);
    isBtnDisabled();
  });

  leftBtn.addEventListener("click", (e) => {
    removeChildElement(ul);
    paintNewsicon(--selectedPage, newsstandList);
    isBtnDisabled();
  });

  function isBtnDisabled() {
    selectedPage
      ? leftBtn.classList.remove("btn-disabled")
      : leftBtn.classList.add("btn-disabled");
    selectedPage === 3
      ? rightBtn.classList.add("btn-disabled")
      : rightBtn.classList.remove("btn-disabled");
  }
}

export { newsPagination };
