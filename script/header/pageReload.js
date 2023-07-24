import { getQuerySelector } from "../../utils/js/getElements.js";

function pageReload() {
  const newsLogo = getQuerySelector("#header-news-icon");
  newsLogo.addEventListener("click", () => location.reload());
}

export { pageReload };
