import { gridPage, showGridPageButton } from "./gridView.js";

// 그리드 뷰로 전환
export function handleGridButton() {
  const list_button = document.getElementById("list_button");
  const grid_button = document.getElementById("grid_button");
  const list_container = document.getElementById("list_container");
  const grid_container = document.getElementById(`grid_page_${gridPage}`);

  const left_list_button =
    document.getElementsByClassName("left_list_button")[0];
  const right_list_button =
    document.getElementsByClassName("right_list_button")[0];
  const left_grid_button =
    document.getElementsByClassName("left_grid_button")[0];
  const right_grid_button =
    document.getElementsByClassName("right_grid_button")[0];

  // 버튼 색상 바꾸기
  grid_button.className = "clicked";
  list_button.className = "";

  // 그리드, 리스트 전환
  list_container.style.display = "none";
  grid_container.style.display = "grid";

  // 버튼 바꾸기
  left_grid_button.style.display = "block";
  right_grid_button.style.display = "block";
  left_list_button.style.display = "none";
  right_list_button.style.display = "none";
  showGridPageButton();
}

// 리스트 뷰로 변환
export function handleListButton() {
  const list_button = document.getElementById("list_button");
  const grid_button = document.getElementById("grid_button");
  const list_container = document.getElementById("list_container");
  const grid_container = document.getElementById(`grid_page_${gridPage}`);
  const left_list_button =
    document.getElementsByClassName("left_list_button")[0];
  const right_list_button =
    document.getElementsByClassName("right_list_button")[0];
  const left_grid_button =
    document.getElementsByClassName("left_grid_button")[0];
  const right_grid_button =
    document.getElementsByClassName("right_grid_button")[0];

  // 버튼 색상 바꾸기
  list_button.className = "clicked";
  grid_button.className = "";

  // 그리드, 리스트 전환
  list_container.style.display = "block";
  grid_container.style.display = "none";

  // 버튼 바꾸기
  left_grid_button.style.display = "none";
  right_grid_button.style.display = "none";
  left_list_button.style.display = "block";
  right_list_button.style.display = "block";
}

// 오늘 날짜 update
export function initDate() {
  let today = new Date();
  const dateHtml = document.getElementsByClassName("date")[0];
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "long",
  };

  today = today.toLocaleDateString("ko-KR", options);
  dateHtml.innerHTML = today;
}

export function handleLogoButton() {
  location.reload();
}
