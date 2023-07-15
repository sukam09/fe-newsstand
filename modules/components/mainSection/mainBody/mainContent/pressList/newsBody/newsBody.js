import { createMainNews } from "./mainNews.js";
import { createSubNews } from "./subNews.js";

export function createNewsBody(press) {
  console.log(press);
  const newsBody = `
    <div class="flex_row">
      ${createMainNews(press)}
      <div>
        ${createSubNews(press.data.subTitleList)} 
        <span class="caption">${press.data.caption}</span>
      </div>
    </div>
    `;

  return newsBody;
}
