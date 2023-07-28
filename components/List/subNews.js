import { ce } from "../../utils/utils.js";

export const makeSubNews = (agency) => {
  const $news_sub = ce("ul");
  $news_sub.className = "news-sub";

  let $li;
  agency.subArticles.forEach((subnews) => {
    $li = ce("li");
    $li.className = "sub-title";
    $li.innerText = subnews.title;
    $news_sub.appendChild($li);
  });
  $li = ce("li");
  $li.className = "caption";
  $li.innerText = `${agency.name} 언론사에서 직접 편집한 뉴스입니다.`;
  $news_sub.appendChild($li);
  return $news_sub;
};
