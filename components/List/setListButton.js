import {
  FIELDTAB_LIST,
  INITIAL_CATEGORY,
  INITIAL_PAGE,
} from "../../constants/constant.js";
import { filterCategory } from "../../utils/filterCategory.js";
import { setButton } from "../Button/setButton.js";
import { ListComponent } from "../ListComponent.js";

export const setListButton = (sortedAgencies, currentPage, currentCategory) => {
  const [prevBtn, nextBtn] = setButton();
  prevBtn.addEventListener("click", () => {
    moveToPrevPage(sortedAgencies, currentPage, currentCategory);
  });
  nextBtn.addEventListener("click", () => {
    moveToNextPage(sortedAgencies, currentPage, currentCategory);
  });
};

export const moveToPrevPage = (
  sortedAgencies,
  currentPage,
  currentCategory
) => {
  if (currentPage === 0 && currentCategory === 0) {
    currentCategory = FIELDTAB_LIST.length - 1;

    const filteredAgencies = filterCategory(
      sortedAgencies,
      FIELDTAB_LIST[currentCategory]
    );

    currentPage = filteredAgencies.length - 1;
    ListComponent(
      currentPage,
      sortedAgencies,
      FIELDTAB_LIST[currentCategory],
      currentCategory
    );
  } else if (currentPage === 0) {
    currentCategory--;
    const filteredAgencies = filterCategory(
      sortedAgencies,
      FIELDTAB_LIST[currentCategory]
    );

    currentPage = filteredAgencies.length - 1;
    ListComponent(
      currentPage,
      sortedAgencies,
      FIELDTAB_LIST[currentCategory],
      currentCategory
    );
  } else {
    currentPage--;
    ListComponent(
      currentPage,
      sortedAgencies,
      FIELDTAB_LIST[currentCategory],
      currentCategory
    );
  }
};
export const moveToNextPage = (
  sortedAgencies,
  currentPage,
  currentCategory
) => {
  const nowFiltered = filterCategory(
    sortedAgencies,
    FIELDTAB_LIST[currentCategory],
    currentCategory
  );

  if (
    currentPage === nowFiltered.length - 1 &&
    currentCategory === FIELDTAB_LIST.length - 1
  ) {
    currentCategory = 0;
    currentPage = 0;

    ListComponent(
      currentPage,
      sortedAgencies,
      FIELDTAB_LIST[currentCategory],
      currentCategory
    );
  } else if (currentPage === nowFiltered.length - 1) {
    currentCategory++;
    currentPage = 0;

    ListComponent(
      currentPage,
      sortedAgencies,
      FIELDTAB_LIST[currentCategory],
      currentCategory
    );
  } else {
    currentPage++;
    ListComponent(
      currentPage,
      sortedAgencies,
      FIELDTAB_LIST[currentCategory],
      currentCategory
    );
  }
};
