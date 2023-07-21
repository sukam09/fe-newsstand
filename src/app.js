import Header from "./header/Header.js";
import NewsBar from "./news-bar/NewsBar.js";
import NewsDisplay from "./news-display/NewsDisplay.js";

export const $app = document.querySelector(".root");

new Header($app.querySelector(".news-stand-header"));
new NewsBar($app.querySelector(".news-bar-container"));
new NewsDisplay($app.querySelector(".news-press-display"));
