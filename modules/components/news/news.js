import { newsBody } from "./newsBody/newsBody.js";
import { newsHeader } from "./newsHeader/newsHeader.js";

export function news(press, page) {
  const news = `
    <div class="news news_${page} flex_column">
      ${newsHeader(press)}
      ${newsBody(press)}
    </div>
    `;

  return news;
}
