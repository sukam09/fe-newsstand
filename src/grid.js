import { setButtons } from "./buttons.js";
import { NEWS_COUNT } from "./constants.js";
import { customFetch, shuffleArrayRandom } from "./utils.js";

const $gridView = document.querySelector(".grid-view");

const fillNewsContents = (newsData, pages) => {
  const startIndex = pages.getPages() * NEWS_COUNT;

  const $fragment = document.createDocumentFragment();

  $gridView.innerHTML = "";

  newsData
    .slice(startIndex, startIndex + NEWS_COUNT)
    .forEach(({ src, name }) => {
      const newsContent = createNewsContent(src, name);

      $fragment.appendChild(newsContent);
    });

  $gridView.appendChild($fragment);
};

const createNewsContent = (src, name) => {
  const $li = document.createElement("li");
  const $button = document.createElement("button");
  const $img = document.createElement("img");

  $li.className = "grid-cell";

  $img.className = "grid-cell_news-img";
  $img.src = src;
  $img.alt = name;

  $button.appendChild($img);
  $li.appendChild($button);

  return $li;
};

export const setNewsGrid = async (pages) => {
  const newsData = await customFetch("./mocks/news.json", shuffleArrayRandom);

  fillNewsContents(newsData, pages);
  setButtons(newsData, pages, fillNewsContents);
};
