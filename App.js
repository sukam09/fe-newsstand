import NewsStand from "./src/NewsStand.js";
import setDate from "./src/SetDate.js";
import recentNews from "./src/RecentNews.js";
import main from "./src/main/Main.js";
import mainHeader from "./src/MainHeader.js";

function App(){
    NewsStand();
    setDate();
    recentNews();
    mainHeader();
    main("all", "grid", 1, 0);
}

App();