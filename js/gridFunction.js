import presses from "../assets/light-media.js";
let grid_page_count = 0;
let grid_view_selected = true;
console.log(presses);

const PAGE_SIZE = 24;

const shuffle = () => Math.random() - 0.5;
let shuffled_presses = [...presses].sort(shuffle);

function appendPressInGrid(press) {
  const image = document.createElement("img");
  image.src = `${press.src}`;
  const sub = document.createElement("img");
  image.classList.add("original");
  sub.src = `./img/icons/Button.svg`;
  sub.classList.add("sub");
  const list = document.createElement("li");
  list.classList.add("press-item");
  list.appendChild(image);
  list.appendChild(sub);
  document.getElementById("press-list").appendChild(list);
}

function changeToGrid() {
  document.getElementsByClassName("grid-selected")[0].style.display = "flex";
  document.getElementsByClassName("list-selected")[0].style.display = "none";
  document.getElementsByClassName("press-list-section")[0].style.display = "none";
  document.getElementsByClassName("press-grid")[0].style.display = "block";
  grid_view_selected = true;
}

function changeToList() {
  document.getElementsByClassName("grid-selected")[0].style.display = "none";
  document.getElementsByClassName("list-selected")[0].style.display = "flex";
  document.getElementsByClassName("press-list-section")[0].style.display = "block";
  document.getElementsByClassName("press-grid")[0].style.display = "none";
  grid_view_selected = false;
}

document.getElementById("grid-next").addEventListener("click", () => {
  if (grid_page_count + 1 === parseInt(presses.length / PAGE_SIZE) - 1) {
    document.getElementById("grid-next").style.display = "none";
  }
  if (grid_page_count + 1 < parseInt(presses.length / PAGE_SIZE)) {
    document.getElementById("grid-prev").style.display = "block";
    document.getElementById("press-list").innerHTML = "";
    grid_page_count += 1;
    const slice_shuffled_presses = shuffled_presses.slice(grid_page_count * PAGE_SIZE, (grid_page_count + 1) * PAGE_SIZE);
    slice_shuffled_presses.forEach(press => {
      appendPressInGrid(press);
    });
  }
});

document.getElementById("grid-prev").addEventListener("click", () => {
  if (grid_page_count - 1 === 0) {
    document.getElementById("grid-prev").style.display = "none";
  }
  if (grid_page_count - 1 >= 0) {
    document.getElementById("grid-next").style.display = "block";
    document.getElementById("press-list").innerHTML = "";
    grid_page_count -= 1;
    const slice_shuffled_presses = shuffled_presses.slice(grid_page_count * PAGE_SIZE, (grid_page_count + 1) * PAGE_SIZE);
    slice_shuffled_presses.forEach(press => {
      appendPressInGrid(press);
    });
  }
});

function initPressGrid() {
  let shuffled_presses = [...presses].sort(shuffle);
  console.log(shuffled_presses);
  const slice_shuffled_presses = shuffled_presses.slice(0, PAGE_SIZE);
  slice_shuffled_presses.forEach(press => {
    appendPressInGrid(press);
  });
}

let list_symbol = document.querySelectorAll(".list-symbol");
list_symbol.forEach(symbol => {
  symbol.addEventListener("click", () => {
    if (grid_view_selected) {
      // grid 상태이면
      changeToList();
    }
  });
});

let grid_symbol = document.querySelectorAll(".grid-symbol");
grid_symbol.forEach(symbol => {
  symbol.addEventListener("click", () => {
    if (!grid_view_selected) {
      // grid 상태 아니면
      changeToGrid();
    }
  });
});

export { appendPressInGrid, changeToGrid, changeToList, initPressGrid };
