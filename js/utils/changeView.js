const grid_view = `
    <div class="grid-view">
              <button id="left-btn">
                <img id="left" src="../assets/icons/LeftButton.png" />
              </button>
              <div class="main-list">
                <ul class="main-list-ul"></ul>
              </div>
              <button id="right-btn">
                <img id="right" src="../assets/icons/RightButton.png" />
              </button>
            </div>
    `;

const list_view = `
<div class="grid-view">
          <button id="left-btn">
            <img id="left" src="../assets/icons/left-btn.svg" />
          </button>
          <div class="main-list">
            <ul class="main-list-ul">listslits</ul>
          </div>
          <button id="right-btn">
            <img id="right" src="../assets/icons/right-btn.svg" />
          </button>
        </div>
`;
export function changeView(target) {
  const view_content = document.querySelector(".view-content");

  const grid_btn = document.getElementById("grid-btn");
  const list_btn = document.getElementById("list-btn");
  if (target === "grid") {
    view_content.innerHTML = grid_view;
    grid_btn.src = "../assets/icons/grid-view-clicked.svg";
    list_btn.src = "../assets/icons/list-view.svg";
  } else {
    view_content.innerHTML = list_view;
    grid_btn.src = "../assets/icons/grid-view.svg";
    list_btn.src = "../assets/icons/list-view-clicked.svg";
  }
}
