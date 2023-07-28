import { ce } from "../../utils/utils.js";

export const makeMainNews = (agency) => {
  const $news_main = ce("div");
  $news_main.className = "news-main";

  const $img = ce("img");
  $img.className = "thumbnail";
  $img.src = agency.mainArticle.thumbnail;
  $img.alt = "Main News Thumbnail";

  const $title = ce("div");
  $title.className = "title";
  $title.innerText = agency.mainArticle.title;

  $news_main.appendChild($img);
  $news_main.appendChild($title);
  return $news_main;
};
