import showDate from "./Components/Header/date.js";
import handleClickLogo from "./Components/Header/titleLogo.js"
import rollNews from "./Components/RollingNews/RollingNews.js";
import { initPressImg } from "./Components/PressGrid/pressLogos.js"
import { clickchangeViewBtn, initView } from "./Components/PressTab/pressTab.js";
import { initNews } from "./Components/PressList/pressNews.js";
initView();
initNews();
showDate();
handleClickLogo();
rollNews();
clickchangeViewBtn();
initPressImg();



