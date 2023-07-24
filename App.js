import NewsStand from "./src/NewsStand.js";
import setDate from "./src/SetDate.js";
import recentNews from "./src/RecentNews.js";
import renderMain from "./src/main/renderMain.js";
import mainHeader from "./src/MainHeader.js";
import { getPressJSON } from "./src/api/api.js";
//import getPressData from "./src/api/api.js"
import NewsData from "./src/store/NewsStore.js";

async function App(){
    // const gridArticle = await getGridJSON(); // promise all, 블로킹을 하지 않고 병렬적으로 불러올 수 있는 코드 고민
    // const listArticle = await getListJSON();
    const pressData = await getPressJSON();
    // NewsData.setGridArticle(gridArticle);
    // NewsData.setListArticle(listArticle);
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