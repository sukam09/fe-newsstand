import NewsStand from "./src/NewsStand.js";
import setDate from "./src/SetDate.js";
import recentNews from "./src/RecentNews.js";
import main from "./src/main/Main.js";
import mainHeader from "./src/MainHeader.js";
import { getGridJSON, getListJSON} from "./src/Api/api.js";
import newsData from "./src/state/newsData.js";

async function App(){
    const gridArticle = await getGridJSON();
    const listArticle = await getListJSON();
    newsData.setGridArticle(gridArticle);
    newsData.setListArticle(listArticle);
    NewsStand();
    setDate();
    recentNews();
    mainHeader();
    main("all", "grid", 1, 0);
}

App();