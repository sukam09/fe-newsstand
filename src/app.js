import showDate from "./Components/Header/date.js";
import handleClickLogo from "./Components/Header/titleLogo.js"
import rollNews from "./Components/RollingNews/RollingNews.js";
import { initPressImg } from "./Components/PressGrid/pressLogos.js"
import { initView } from "./Components/PressTab/pressTab.js";
handleClickLogo();
showDate();
initView();
initPressImg();

rollNews();



