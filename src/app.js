import showDate from "./Components/Header/date.js";
import handleClickLogo from "./Components/Header/titleLogo.js"
import rollNews from "./Components/RollingNews/RollingNews.js";
import { initPressImg } from "./Components/PressGrid/pressLogos.js"
import changeView from "./Components/PressTab/pressTab.js";
import { initNews } from "./Components/PressList/pressNews.js";

initNews();
showDate();
handleClickLogo();
rollNews();
initPressImg();
changeView();


