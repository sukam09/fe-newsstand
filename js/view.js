const view_content = document.querySelector(".view-content");
const imgIndex = Array(96)
  .fill()
  .map((arr, i) => i);

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

function showMainList() {
  const main_list_ul = document.querySelector(".main-list-ul");
  main_list_ul.innerHTML = "";
  for (let i = 24 * (main_list_page - 1); i < 24 * main_list_page; i++) {
    const li = document.createElement("li");
    const img = document.createElement("img");
    img.setAttribute(
      "src",
      `../images/lightmode-media/asset ${shuffledPress[i]} 1.png`
    );
    main_list_ul.appendChild(li);
    li.appendChild(img);
  }
}

function shuffleImgIndex() {
  return [...imgIndex].sort(() => Math.random() - 0.5);
}
const shuffledPress = shuffleImgIndex();

function changePage(target) {
  if (target === "left") {
    main_list_page--;
  } else if (target === "right") {
    main_list_page++;
  }
  checkPage();
}

function checkPage() {
  const left_btn = document.getElementById("left-btn");
  const right_btn = document.getElementById("right-btn");
  if (main_list_page === 1) left_btn.style.visibility = "hidden";
  else if (main_list_page === 4) right_btn.style.visibility = "hidden";
  else {
    left_btn.style.visibility = "visible";
    right_btn.style.visibility = "visible";
  }
}

function handleClick(e) {
  const grid_view_btn = document.querySelector(
    ".viewer-btn .grid-view-btn img"
  );
  const list_view_btn = document.querySelector(
    ".viewer-btn .list-view-btn img"
  );
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

function changeView(target) {
  const grid_btn = document.getElementById("grid-btn");
  const list_btn = document.getElementById("list-btn");
  main_list_page = 1;
  if (target === "grid-btn") {
    view_content.innerHTML = grid_view;
    grid_btn.src = "../images/icon/grid-view-clicked.svg";
    list_btn.src = "../images/icon/list-view.svg";
    showMainList();
  } else {
    view_content.innerHTML = list_view;
    grid_btn.src = "../images/icon/grid-view.svg";
    list_btn.src = "../images/icon/list-view-clicked.svg";
  }
}

document.addEventListener("click", handleClick);
checkPage();
showMainList();
