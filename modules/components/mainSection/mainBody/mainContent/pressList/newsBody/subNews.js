export function subNews(newsData) {
  let newsList = "";
  console.log(newsData[0]);
  for (let j = 0; j < newsData[0].subTitleList.length; j++) {
    newsList += `<li>${newsData[0].subTitleList[j].title}</li>`;
  }
  const subNews = `
    <ul class="sub_news">
      ${newsList}
    </ul>`;

  return subNews;
}
