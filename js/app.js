document.documentElement.setAttribute("color-theme", "light"); //임시로 라이트모드

import { Header } from "./sections/header.js";

import { RecentNews } from "./sections/recentNews.js";

import { MainView } from "./sections/mainView.js";

function App() {
  Header();
  RecentNews();
  MainView();
}

App();
