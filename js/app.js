document.documentElement.setAttribute("color-theme", "light"); //임시로 라이트모드

import { Header } from "./components/header.js";

import { RecentNews } from "./components/recentNews.js";

import { MainView } from "./components/mainView.js";

function App() {
  Header();
  RecentNews();
  MainView();
}

App();
