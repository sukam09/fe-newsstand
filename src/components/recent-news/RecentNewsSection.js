import { html } from "../../lib/jsx.js";
import NewsRollingBar from "./NewsRollingBar.js";
const RecentNewsSection = () => {
    const $template = html `
    <section class="recent-news">
      <h2 class="recent-news__title screen-reader-only">최신 뉴스</h2>
      <div class="recent-news__content">
        ${NewsRollingBar(0)} ${NewsRollingBar(1)}
      </div>
    </section>
  `;
    return $template;
};
export default RecentNewsSection;
