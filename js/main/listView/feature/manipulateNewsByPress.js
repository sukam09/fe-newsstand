let press = JSON.parse(localStorage.getItem("press"));
let news_by_press = [];

function manipulateNewsByPress(news) {
  press.forEach((item) => {
    news_by_press[item] = [];
  });
  news.forEach((item) => {
    if (press.includes(item.name)) {
      news_by_press[item.name].push({
        name: item.name,
        src: item.lightSrc,
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
