import { PRESS_CNT, PRESS_VIEW_COUNT } from "../constants/constants.js";
const imgIndex = Array(PRESS_CNT)
  .fill()
  .map((arr, i) => i + 1);

const shuffledPress = shuffleImgIndex();

function shuffleImgIndex() {
  return [...imgIndex].sort(() => Math.random() - 0.5);
}

const grid_view = `
              <div class="main-list">
                <ul class="main-list-ul"></ul>
              </div>
    `;

function handleEvent(event, img, button) {
  console.log(event);
  if (event === "over") {
    img.style.display = "none";
    button.style.display = "block";
  } else {
    img.style.display = "block";
    button.style.display = "none";
  }
}
export function showGridView(page) {
  const main_list = document.querySelector(".main-list");
  main_list.innerHTML = grid_view;
  const main_list_ul = document.querySelector(".main-list-ul");
  main_list_ul.innerHTML = "";
  for (
    let i = PRESS_VIEW_COUNT * (page - 1);
    i < PRESS_VIEW_COUNT * page;
    i++
  ) {
    const li = document.createElement("li");
    const img = document.createElement("img");
    const button = document.createElement("button");
    button.innerHTML = `
    <img src="../assets/icons/plus.svg" />
    <span>구독하기</span>
  `;
    img.setAttribute(
      "src",
      `../assets/images/logo/light/img${shuffledPress[i]}.svg`
    );
    main_list_ul.appendChild(li);
    li.append(img, button);
    // li.addEventListener("mouseover", () => handleEvent("over", img, button));
    // li.addEventListener("mouseout", () => handleEvent("out", img, button));
  }
}
