export const makeMainNews = (agency) => {
  const $news_main = document.createElement("div");
  $news_main.className = "news-main";

  const $img = document.createElement("img");
  $img.className = "thumbnail";
  $img.src = agency.mainArticle.thumbnail;
  $img.alt = "Main News Thumbnail";

  const $title = document.createElement("div");
  $title.innerText = agency.mainArticle.title;

  $news_main.appendChild($img);
  $news_main.appendChild($title);
  return $news_main;
};
