/**
 * 카테고리 변경시 tab 스타일 변경
 */
export function tabClassChange(targetTab, previousProgressTab, categoryLength, listState) {
  const CURRENT_PAGE = listState.CURRENT_PAGE;
  const CURRENT_CATEGORY = listState.CURRENT_CATEGORY;

  const progressTabName = previousProgressTab.querySelector(".text-category-name");
  const progressTabNumber = previousProgressTab.querySelector(".text-category-number");

  previousProgressTab.classList.remove("progress-tab");
  previousProgressTab.classList.add("text-tab");
  progressTabName.classList.remove("selected-bold14");
  progressTabName.classList.add("available-medium14");
  progressTabNumber.classList.add("hidden");

  targetTab.classList.remove("text-tab");
  targetTab.classList.add("progress-tab");
  const textTabName = targetTab.querySelector(".text-category-name");
  const textTabNumber = targetTab.querySelector(".text-category-number");
  textTabName.classList.remove("available-medium14");
  textTabName.classList.add("selected-bold14");
  textTabNumber.classList.remove("hidden");

  textTabNumber.querySelector(".present").innerHTML = `${CURRENT_PAGE} / `;
  textTabNumber.querySelector(".entire").innerHTML = categoryLength[CURRENT_CATEGORY];
}

export function prevProgressWidthChange(progressTab) {
  const progressRatio = progressTab.querySelector(".progress-ratio");
  progressRatio.style.width = "0px";
}
