import { createMainNews } from "./mainNews.js";
import { createSubNews } from "./subNews.js";

export function createNewsBody(categoryNews) {
  const newsBody = `
    <div class="flex_row">
      ${createMainNews(categoryNews)}
      <div>
        ${createSubNews(categoryNews.subTitleList)} 
        <span class="caption">${categoryNews.caption}</span>
      </div>
    </div>
    `;

  return newsBody;
}
