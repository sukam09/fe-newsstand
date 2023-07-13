import { mainNews } from "./mainNews.js";
import { subNews } from "./subNews.js";

export function newsBody(categoryNews) {
  const newsBody = `
    <div class="flex_row">
      ${mainNews(categoryNews)}
      ${subNews(categoryNews.subTitleList)}
    </div>
    `;

  return newsBody;
}
