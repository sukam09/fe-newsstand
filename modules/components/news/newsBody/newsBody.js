import { mainNews } from "./mainNews.js";
import { subNews } from "./subNews.js";

export function newsBody(press) {
  const newsBody = `
    <div class="flex_row">
      ${mainNews(press)}
      ${subNews(press)}
    </div>
    `;

  return newsBody;
}
