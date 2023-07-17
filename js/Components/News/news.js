import { NavBar } from "../NavBar/navBar.js";
import { NewsGrid } from "../NewsGrid/newsGrid.js";
import { NewsList } from "../NewsList/newsList.js";

export function News() {
  return `
    <main class="news">
      ${NavBar()}
      ${NewsGrid()}
      ${NewsList()}
    </main>
  `;
}
