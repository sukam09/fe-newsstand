import { FIELDTAB_LIST, INITIAL_PAGE } from "../../constants/constant.js";
import { filterCategory } from "../../utils/filter/filterCategory.js";
import { ce, qs } from "../../utils/utils.js";
import { ListComponent } from "./ListComponent.js";

const all_press = qs(".all_press");

const makeFocusTab = (currentPage, filteredAgencies, item) => {
  const $field_tab_progress = ce("li");
  $field_tab_progress.className = "field-tab-progress";

  const $progress_count_wrapper = ce("div");
  $progress_count_wrapper.className = "progress-count-wrapper";

  const $progress_category = ce("span");
  $progress_category.className = "progress-category";
  $progress_category.innerText = item;

  if (Boolean(all_press.getAttribute("subscribetype"))) {
    const $progress_count = ce("span");
    $progress_count.className = "progress-count";
    $progress_count.innerText = currentPage + 1;

    const $division = ce("span");
    $division.className = "division";
    $division.innerText = "/";

    const $progress_total_count = ce("span");
    $progress_total_count.className = "progress-total-count";
    $progress_total_count.innerText = `${filteredAgencies.length}`;
    $progress_count_wrapper.appendChild($progress_category);
    $progress_count_wrapper.appendChild($progress_count);
    $progress_count_wrapper.appendChild($division);
    $progress_count_wrapper.appendChild($progress_total_count);
  } else {
    $progress_count_wrapper.appendChild($progress_category);
  }

  $field_tab_progress.appendChild($progress_count_wrapper);
  return $field_tab_progress;
};

const makeTab = (sorted_agencies, item) => {
  const fieldtab_item = Boolean(all_press.getAttribute("subscribetype"))
    ? FIELDTAB_LIST
    : sorted_agencies.map((item) => item.name);

  const $li = ce("li");
  $li.className = "field-tab-normal";
  $li.innerText = item;
  $li.addEventListener("click", () => {
    let current_category = fieldtab_item.findIndex((tag) => tag === item);

    Boolean(all_press.getAttribute("subscribetype"))
      ? ListComponent(
          INITIAL_PAGE,
          sorted_agencies,
          fieldtab_item[current_category],
          current_category
        )
      : ListComponent(
          current_category,
          sorted_agencies,
          fieldtab_item[current_category],
          current_category
        );
  });
  return $li;
};

export const makeFieldTab = (current_page, sorted_agencies, focus) => {
  const $field_tab = qs(".field-tab");
  $field_tab.className = "field-tab";

  const filtered_agencies = filterCategory(sorted_agencies, focus);

  const fieldtab_item = Boolean(all_press.getAttribute("subscribetype"))
    ? FIELDTAB_LIST
    : sorted_agencies.map((item) => item.name);

  fieldtab_item.forEach((item) => {
    if (Boolean(all_press.getAttribute("subscribetype"))) {
      if (item === focus) {
        $field_tab.appendChild(
          makeFocusTab(current_page, filtered_agencies, item)
        );
      } else {
        $field_tab.appendChild(makeTab(sorted_agencies, item));
      }
    } else {
      if (item === focus) {
        $field_tab.appendChild(
          makeFocusTab(current_page, sorted_agencies, item)
        );
      } else {
        $field_tab.appendChild(makeTab(sorted_agencies, item));
      }
    }
  });
};
