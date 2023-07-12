//뷰 타입 변경
function initViewChange() {
  const view_type = document.querySelectorAll(".viewer-btn button");
  const grid_view = document.querySelector(".grid-view");
  const list_view = document.querySelector(".list-view");
  list_view.style.display = "none";
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
  });
}
export { initViewChange };
