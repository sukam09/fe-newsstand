let newsstandList = Array.from({ length: 96 }, () => 1).map(
  (_, index) => `${++index}.png`
);

function shuffle(newsstandList) {
  return newsstandList.sort(() => Math.random() - 0.5);
}
newsstandList = shuffle(newsstandList);
console.log(newsstandList);

const ul = document.querySelector(".newsstand-area—six-col-list");
let selectedPage = 0;

function paintNewsicon(selectedPage) {
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

function removeChildElement(parent) {
  while (parent.firstChild) {
    parent.firstChild.remove();
  }
}

paintNewsicon(selectedPage);

let btn = document.querySelector(".newsstand--right-btn");
btn.addEventListener("click", (e) => {
  removeChildElement(ul);
  paintNewsicon(++selectedPage);
});
