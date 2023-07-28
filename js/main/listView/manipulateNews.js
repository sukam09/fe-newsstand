let category = [];
let press;
let news_by_category = {};
let news_by_press = [];

function manipulateNewsByCategory(news) {
  news.forEach((item) => {
    if (!category.includes(item.category)) category.push(item.category);
  });
  category.forEach((item) => {
    news_by_category[item] = [];
  });
  news.forEach((item) => {
    news_by_category[item.category].push({
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
  });
}

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

export {
  manipulateNewsByCategory,
  manipulateNewsByPress,
  press,
  news_by_press,
  category,
  news_by_category,
};
