import { removeAllChildNodes } from "../utils/removeChild.js";

const appendPress = (agency) => {
  const $press_news = document.querySelector(".press-news");
  const $news_list = document.createElement("div");
  $news_list.className = "news-list";

  $news_list.appendChild(makeMainTitle(agency));
  $news_list.appendChild(makeSubTitle(agency));

  $press_news.appendChild(makePressInfo(agency));
  $press_news.appendChild($news_list);
};

const makePressInfo = (agency) => {
  const $press_info = document.createElement("div");
  $press_info.className = "press-info";

  const $press_brandmark = document.createElement("img");
  $press_brandmark.className = "press-brandmark";
  $press_brandmark.src = agency.logo;
  $press_brandmark.alt = `${agency.name}`;

  const $press_edit_date = document.createElement("div");
  $press_edit_date.className = "press-edit-date";
  $press_edit_date.innerText = `${agency.editTime} 편집`;

  $press_info.appendChild($press_brandmark);
  $press_info.appendChild($press_edit_date);
  $press_info.appendChild(makeSubscribeBtn(agency));

  return $press_info;
};

const makeSubscribeBtn = (agency) => {
  const $press_subscribe = document.createElement("button");
  $press_subscribe.className = "press-subscribe";

  const sr_only = document.createElement("span");
  sr_only.className = "screen-reader-only";
  sr_only.innerText = agency.subscribe ? "해지하기" : "구독하기";

  const $plus_btn = document.createElement("img");
  $plus_btn.className = "plus";
  $plus_btn.src = "./asset/icon/plus.svg";
  $plus_btn.alt = "plus";

  const $subscribe = document.createElement("div");
  $subscribe.className = "subscribe-text";
  $subscribe.innerText = "구독하기";

  $press_subscribe.appendChild(sr_only);
  $press_subscribe.appendChild($plus_btn);
  $press_subscribe.appendChild($subscribe);

  return $press_subscribe;
};

const makeMainTitle = (agency) => {
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

const makeSubTitle = (agency) => {
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

export const renderList = (currentPage, categories) => {
  const press = document.querySelector(".press-news");
  if (press.childNodes.length !== 0) {
    removeAllChildNodes(press);
  }
  appendPress(categories[currentPage]);
};
