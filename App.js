import NewsStand from "./src/NewsStand.js";
import setDate from "./src/SetDate.js";
import recentNews from "./src/RecentNews.js";
import mainNews from "./src/main/mainNews.js";
import mainHeader from "./src/MainHeader.js";
import { getGridJSON, getListJSON} from "./src/api/api.js";
import NewsData from "./src/state/NewsData.js";

async function App(){
    const gridArticle = await getGridJSON();
    const listArticle = await getListJSON();
    NewsData.setGridArticle(gridArticle);
    NewsData.setListArticle(listArticle);
    NewsStand();
    setDate();
    recentNews();
    mainHeader();
    mainNews();
}

App();