// 페이지 넘길 때 첫번째 마지막 페이지 화살표 숨김
export function toggleArrow(grid_view_info) {
    const left_btn = document.querySelector(grid_view_info.getLeftBtn());
    const right_btn = document.querySelector(grid_view_info.getRightBtn());
    const current_page = grid_view_info.getCurrentPage();
    const max_page = grid_view_info.getMaxPage();
    left_btn.style.visibility = "visible";
    right_btn.style.visibility = "visible";
    if (current_page <= 0) left_btn.style.visibility = "hidden";
    if (current_page >= max_page) right_btn.style.visibility = "hidden";
}
