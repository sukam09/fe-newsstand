import { mainNews } from "./mainNews.js";
import { subNews } from "./subNews.js";

export function newsBody(categoryNews) {
  const newsBody = `
    <div class="flex_row">
      ${mainNews(categoryNews)}
      <div>
        ${subNews(categoryNews.subTitleList)} 
        <span class="caption">${categoryNews.caption}</span>
      </div>
    </div>
    `;

  return newsBody;
}
