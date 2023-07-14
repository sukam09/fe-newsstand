//뷰 타입 변경
function initViewChange() {
  const view_type = document.querySelectorAll(".viewer-btn button");
  //view_type[0] : listview, view_type[1] : gridview
  const grid_view = document.querySelector(".grid-view");
  const list_view = document.querySelector(".list-view");

  const grid_left_btn = document.getElementById("grid-left-btn");
  const grid_right_btn = document.getElementById("grid-right-btn");

  const list_left_btn = document.getElementById("list-left-btn");
  const list_right_btn = document.getElementById("list-right-btn");

  view_type[0].addEventListener("click", () => {
    view_type[0].innerHTML = `<img
    src="../images/icon/List-view-checked.svg"
    alt="images"
  />`;
    view_type[1].innerHTML = `<img
    src="../images/icon/Grid-view-unchecked.svg"
    alt="images"
  />`;
    grid_view.style.display = "none";
    list_view.style.display = "block";

    //button 교체
    grid_left_btn.style.display = "none";
    grid_right_btn.style.display = "none";
    list_left_btn.style.display = "block";
    list_right_btn.style.display = "block";
  });
  view_type[1].addEventListener("click", () => {
    view_type[0].innerHTML = `<img
    src="../images/icon/List-view-unchecked.svg"
    alt="images"
  />`;
    view_type[1].innerHTML = `<img
    src="../images/icon/Grid-view-checked.svg"
    alt="images"
  />`;
    list_view.style.display = "none";
    grid_view.style.display = "flex";

    grid_left_btn.style.display = "block";
    grid_right_btn.style.display = "block";
    list_left_btn.style.display = "none";
    list_right_btn.style.display = "none";
  });
}
export { initViewChange };
