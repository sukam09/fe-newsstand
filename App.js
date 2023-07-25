import NewsStand from "./src/NewsStand.js";
import setDate from "./src/SetDate.js";
import recentNews from "./src/RecentNews.js";
import renderMain from "./src/main/renderMain.js";
import mainHeader from "./src/MainHeader.js";
import { getPressJSON } from "./src/api/api.js";
import NewsData from "./src/store/NewsStore.js";

async function App(){
    const pressData = await getPressJSON();
    NewsData.setPressData(pressData);
    NewsData.makeListCategory();
    NewsData.makeListArticle();

    NewsStand();
    setDate();
    recentNews();
    mainHeader();
    renderMain();
}

App();