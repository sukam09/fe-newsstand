export const makeSubNews = (agency) => {
  const $news_sub = document.createElement("ul");
  $news_sub.className = "news-sub";

  let $li;
  agency.subArticles.forEach((subnews) => {
    $li = document.createElement("li");
    $li.className = "sub-title";
    $li.innerText = subnews.title;
    $news_sub.appendChild($li);
  });
  $li = document.createElement("li");
  $li.className = "caption";
  $li.innerText = `${agency.name} 언론사에서 직접 편집한 뉴스입니다.`;
  $news_sub.appendChild($li);
  return $news_sub;
};
