let pressNewsData;

const fetchNewsData = async (initCategory) => {
  pressNewsData = await fetch("./js/Data/pressNews.json").then((res) => {
    return res.json();
  });
  return getCategoryData(initCategory);
};

const getCategoryData = (category) => {
  return pressNewsData.news.filter((item) => item.category === category);
};
export { fetchNewsData, getCategoryData };
