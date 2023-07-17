export function showSubButton(e) {
  const target = e.currentTarget;
  const $subButtonContainer = target.querySelector(".sub_button_container");
  $subButtonContainer.style.display = "flex";
}

export function hiddenSubButton(e) {
  const target = e.currentTarget;
  const $subButtonContainer = target.querySelector(".sub_button_container");
  $subButtonContainer.style.display = "none";
}
