import { startProgressAnimation } from "../components/mainSection/mainBody/content/pressList/category/progressBar.js";
import { getState, setState } from "../core/observer.js";
import { categoryIdState, listPageState } from "../state/pageState.js";
import { qs, qsa } from "../utils.js";

export function handleClickCategoryItem(e) {
  const id = e.currentTarget.id;
  const [, categoryId] = id.split("_");

  setState(categoryIdState, parseInt(categoryId));
  setState(listPageState, 0);

  if (!e.currentTarget.classList.contains("clicked")) {
    highlightCategoryItem();
  }
}

export function highlightCategoryItem() {
  const categoryId = getState(categoryIdState);
  const $clickedElements = qsa(".clicked");
  for (let i = 0; i < $clickedElements.length; i++) {
    $clickedElements[i].classList.remove("clicked");
  }

  const $category = qs(`#category_${parseInt(categoryId)}`);
  $category.classList.add("clicked");
  const $progressbar = $category.getElementsByClassName("progressbar")[0];
  startProgressAnimation($progressbar);
}
