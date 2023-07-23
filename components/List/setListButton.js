import { FIELDTAB_LIST } from "../../constants/constant.js";
import { filterCategory } from "../../utils/filterCategory.js";
import { setButton } from "../Button/setButton.js";
import { ListComponent } from "../ListComponent.js";

const all_press = document.querySelector(".all_press");

export const setListButton = (
  sorted_agencies,
  current_page,
  current_category
) => {
  const [prev_btn, next_btn] = setButton();
  prev_btn.addEventListener("click", () => {
    moveToPrevPage(sorted_agencies, current_page, current_category);
  });
  next_btn.addEventListener("click", () => {
    moveToNextPage(sorted_agencies, current_page, current_category);
  });
};

export const moveToPrevPage = (
  sorted_agencies,
  current_page,
  current_category
) => {
  if (Boolean(all_press.getAttribute("subscribetype"))) {
    if (current_page === 0 && current_category === 0) {
      current_category = FIELDTAB_LIST.length - 1;

      const filtered_agencies = filterCategory(
        sorted_agencies,
        FIELDTAB_LIST[current_category]
      );

      current_page = filtered_agencies.length - 1;
      ListComponent(
        current_page,
        sorted_agencies,
        FIELDTAB_LIST[current_category],
        current_category
      );
    } else if (current_page === 0) {
      current_category--;
      const filtered_agencies = filterCategory(
        sorted_agencies,
        FIELDTAB_LIST[current_category]
      );

      current_page = filtered_agencies.length - 1;
      ListComponent(
        current_page,
        sorted_agencies,
        FIELDTAB_LIST[current_category],
        current_category
      );
    } else {
      current_page--;
      ListComponent(
        current_page,
        sorted_agencies,
        FIELDTAB_LIST[current_category],
        current_category
      );
    }
  } else {
    if (current_page === 0) {
      current_page = sorted_agencies.length - 1;
      ListComponent(
        current_page,
        sorted_agencies,
        sorted_agencies[current_page].name,
        current_category
      );
    } else {
      ListComponent(
        current_page,
        sorted_agencies,
        sorted_agencies[current_page].name,
        current_category
      );
    }
  }
};
export const moveToNextPage = (
  sorted_agencies,
  current_page,
  current_category
) => {
  if (Boolean(all_press.getAttribute("subscribetype"))) {
    const nowFiltered = filterCategory(
      sorted_agencies,
      FIELDTAB_LIST[current_category],
      current_category
    );

    if (
      current_page === nowFiltered.length - 1 &&
      current_category === FIELDTAB_LIST.length - 1
    ) {
      current_category = 0;
      current_page = 0;

      ListComponent(
        current_page,
        sorted_agencies,
        FIELDTAB_LIST[current_category],
        current_category
      );
    } else if (current_page === nowFiltered.length - 1) {
      current_category++;
      current_page = 0;

      ListComponent(
        current_page,
        sorted_agencies,
        FIELDTAB_LIST[current_category],
        current_category
      );
    } else {
      current_page++;
      ListComponent(
        current_page,
        sorted_agencies,
        FIELDTAB_LIST[current_category],
        current_category
      );
    }
  } else {
    if (current_page === sorted_agencies.length - 1) {
      current_page = 0;
      ListComponent(
        current_page,
        sorted_agencies,
        sorted_agencies[current_page].name,
        current_category
      );
    } else {
      current_page++;
      ListComponent(
        current_page,
        sorted_agencies,
        sorted_agencies[current_page].name,
        current_category
      );
    }
  }
};
