import { GRID } from "../constant";

function btnColorChange(targetBtn, inactiveBtn) {
  const rootStyles = getComputedStyle(document.documentElement);
  const btnActiveColor = rootStyles.getPropertyValue("--text-point");
  const btnInActiveColor = rootStyles.getPropertyValue("--text-weak");

  const active_btn = targetBtn.querySelector("path");
  active_btn.setAttribute("fill", btnActiveColor);

  const inactive_btn = inactiveBtn.querySelector("path");
  inactive_btn.setAttribute("fill", btnInActiveColor);
}

export function renderViewButton(layout) {
  const list_Btn = document.querySelector("#list-btn");
  const grid_Btn = document.querySelector("#grid-btn");

  layout === GRID ? btnColorChange(grid_Btn, list_Btn) : btnColorChange(list_Btn, grid_Btn);
}
