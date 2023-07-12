export function subNews(press) {
  let newsList = "";
  for (let j = 0; j < press.subTitleList.length; j++) {
    newsList += `<li>${press.subTitleList[j].title}</li>`;
  }
  const subNews = `
    <ul class="sub_news">
      ${newsList}
    </ul>`;

  return subNews;
}
