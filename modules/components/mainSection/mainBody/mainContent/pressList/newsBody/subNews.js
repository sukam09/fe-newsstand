export function createSubNews(subTitleList) {
  let newsList = "";
  for (let i = 0; i < subTitleList.length; i++) {
    newsList += `<li>${subTitleList[i].title}</li>`;
  }
  const subNews = `
    <ul class="sub_news">
      ${newsList}
    </ul>
    `;

  return subNews;
}
