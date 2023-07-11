const view_content = document.querySelector(".view-content");
const imgIndex = Array(96)
  .fill()
  .map((arr, i) => i + 1);

let main_list_page = 1;
const grid_view = `
    <div class="grid-view">
              <button id="left-btn">
                <img id="left" src="../images/icon/LeftButton.png" />
              </button>
              <div class="main-list">
                <ul class="main-list-ul"></ul>
              </div>
              <button id="right-btn">
                <img id="right" src="../images/icon/RightButton.png" />
              </button>
            </div>
    `;

const list_view = `
<div class="grid-view">
          <button id="left-btn">
            <img id="left" src="../images/icon/LeftButton.png" />
          </button>
          <div class="main-list">
            <ul class="main-list-ul">listslits</ul>
          </div>
          <button id="right-btn">
            <img id="right" src="../images/icon/RightButton.png" />
          </button>
        </div>
`;

function shuffleImgIndex() {
  return [...imgIndex].sort(() => Math.random() - 0.5);
}
const shuffledPress = shuffleImgIndex();

function showGridView() {
  const main_list_ul = document.querySelector(".main-list-ul");
  main_list_ul.innerHTML = "";
  for (let i = 24 * (main_list_page - 1); i < 24 * main_list_page; i++) {
    const li = document.createElement("li");
    const img = document.createElement("img");
    img.setAttribute("src", `../images/logo/light/img${shuffledPress[i]}.svg`);
    main_list_ul.appendChild(li);
    li.appendChild(img);
  }
}

function changePage(target) {
  if (target === "left") {
    main_list_page--;
  } else if (target === "right") {
    main_list_page++;
  }
  showGridView();
  checkPage();
}

function checkPage() {
  const path = new URL(document.getElementById("grid-btn").src).pathname;
  const isClicked = path.includes("clicked");
  if (isClicked) {
    const left_btn = document.getElementById("left-btn");
    const right_btn = document.getElementById("right-btn");
    if (main_list_page === 1) left_btn.style.visibility = "hidden";
    else if (main_list_page === 4) right_btn.style.visibility = "hidden";
    else {
      left_btn.style.visibility = "visible";
      right_btn.style.visibility = "visible";
    }
  }
}

function handleClick(e) {
  const target = e.target.id;
  switch (target) {
    case "grid-btn":
    case "list-btn":
      changeView(target);
      break;
    case "left":
    case "right":
      changePage(target);
      break;
    default:
      break;
  }
}

function showListView() {}

function changeView(target) {
  const grid_btn = document.getElementById("grid-btn");
  const list_btn = document.getElementById("list-btn");
  main_list_page = 1;
  if (target === "grid-btn") {
    view_content.innerHTML = grid_view;
    grid_btn.src = "../images/icon/grid-view-clicked.svg";
    list_btn.src = "../images/icon/list-view.svg";
    showGridView();
    checkPage();
  } else {
    view_content.innerHTML = list_view;
    grid_btn.src = "../images/icon/grid-view.svg";
    list_btn.src = "../images/icon/list-view-clicked.svg";
    showListView();
  }
}

document.addEventListener("click", handleClick);

showGridView();
checkPage();
