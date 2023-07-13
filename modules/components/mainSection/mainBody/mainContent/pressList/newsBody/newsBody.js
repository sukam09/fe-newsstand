import { mainNews } from "./mainNews.js";
import { subNews } from "./subNews.js";

export function newsBody(newsData) {
  const newsBody = `
    <div class="flex_row">
      ${mainNews(newsData)}
      ${subNews(newsData)}
    </div>
    `;

  return newsBody;
}
