import newsStand from "./src/component/newsStand.js";
import setDate from "./src/component/setDate.js";
import recentNews from "./src//component/recentNews.js";
import renderMain from "./src/component/main/renderMain.js";
import mainHeader from "./src/component/mainHeader.js";
import { getPressJSON } from "./src/api/api.js";
import NewsData from "./src/store/NewsStore.js";

async function App(){
    const pressData = await getPressJSON(); // 흐름이 끈김... 
    NewsData.setPressData(pressData);
    NewsData.makeListCategory();
    NewsData.makeListArticle();

    
    newsStand();
    setDate();
    recentNews();
    mainHeader();
    renderMain();
}

App();