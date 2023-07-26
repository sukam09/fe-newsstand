let category = [];
let news_by_category = {};

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

export { manipulateNewsByCategory, category, news_by_category };
