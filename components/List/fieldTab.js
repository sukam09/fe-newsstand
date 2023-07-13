import { FIELDTAB_LIST, INITIAL_PAGE } from "../../constants/constant.js";
import { filterCategory } from "../../utils/filterCategory.js";
import { ListComponent } from "../ListComponent.js";

const makeFocusTab = (currentPage, filteredAgencies, item) => {
  const $field_tab_progress = document.createElement("li");
  $field_tab_progress.className = "field-tab-progress";
  const $progress_count_wrapper = document.createElement("div");
  $progress_count_wrapper.className = "progress-count-wrapper";
  const $progress_category = document.createElement("span");
  $progress_category.className = "progress-category";
  $progress_category.innerText = item;
  const $progress_count = document.createElement("span");
  $progress_count.className = "progress-count";
  $progress_count.innerText = currentPage + 1;
  const $division = document.createElement("span");
  $division.className = "division";
  $division.innerText = "/";
  const $progress_total_count = document.createElement("span");
  $progress_total_count.className = "progress-total-count";
  $progress_total_count.innerText = `${filteredAgencies.length}`;

  $progress_count_wrapper.appendChild($progress_category);
  $progress_count_wrapper.appendChild($progress_count);
  $progress_count_wrapper.appendChild($division);
  $progress_count_wrapper.appendChild($progress_total_count);
  $field_tab_progress.appendChild($progress_count_wrapper);
  return $field_tab_progress;
};

const makeTab = (sortedAgencies, item) => {
  const $li = document.createElement("li");
  $li.className = "field-tab-normal";
  $li.innerText = item;
  console.log(item);
  $li.addEventListener("click", () => {
    ListComponent(INITIAL_PAGE, sortedAgencies, item);
  });
  console.log($li);
  return $li;
};

export const makeFieldTab = (
  currentPage,
  sortedAgencies,
  focus = FIELDTAB_LIST[0]
) => {
  const $field_tab = document.querySelector(".field-tab");
  $field_tab.className = "field-tab";

  const filteredAgencies = filterCategory(sortedAgencies, focus);

  FIELDTAB_LIST.forEach((item) => {
    if (item === focus) {
      $field_tab.appendChild(makeFocusTab(currentPage, filteredAgencies, item));
    } else {
      $field_tab.appendChild(makeTab(sortedAgencies, item));
    }
  });
};
