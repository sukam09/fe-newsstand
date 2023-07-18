import { NavBar } from "../NavBar/navBar.js";
import { NewsGrid } from "../NewsGrid/newsGrid.js";
import { NewsList } from "../NewsList/newsList.js";
import { useEffect, useState } from "../../core/index.js";
import { constants } from "../../Data/constants.js";

export function News() {
  const [showType, setShowType] = useState(constants.SHOW_GRID);

  window.showList = () => setShowType(constants.SHOW_LIST);
  window.showGrid = () => setShowType(constants.SHOW_GRID);

  useEffect(() => {
    console.log(showType);
  }, [showType]);

  return `
    <main class="news">
      ${NavBar({ showType: showType })}
      ${NewsGrid({ showType: showType })}
      ${NewsList({ showType: showType })}
    </main>
  `;
}
