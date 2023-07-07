import { newsPagination } from "../newsstand/newsPagination.js";

let newsstandList = Array.from({ length: 96 }, () => 1).map(
  (_, index) => `${++index}.png`
);
let selectedPage = 0;

function shuffle(newsstandList) {
  return newsstandList.sort(() => Math.random() - 0.5);
}

function paintNewsicon(selectedPage) {
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

function createRandomNewsstand() {
  newsstandList = shuffle(newsstandList);

  paintNewsicon(selectedPage);
  newsPagination(selectedPage, newsstandList);
}

export { createRandomNewsstand };
