let news_by_press = [];
let press;
function manipulateNewsByPress(news) {
  press = JSON.parse(localStorage.getItem("press"));

  press.forEach((item) => {
    news_by_press[item] = [];
  });
  news.forEach((item) => {
    if (press.includes(item.name)) {
      news_by_press[item.name].push({
        name: item.name,
        lightSrc: item.lightSrc,
        darkSrc: item.darkSrc,
        isSub: item.isSub,
        editDate: item.editDate,
        thumbSrc: item.thumbSrc,
        headTitle: item.main_title,
        subTitle: item.subTitle,
        copyRight: `${item.name} 언론사에서 직접 편집한 뉴스입니다.`,
      });
    }
  });
}
export { manipulateNewsByPress, press, news_by_press };
