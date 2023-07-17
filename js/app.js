import { Header } from "./Components/Header/header.js";
import { Headline } from "./Components/Headline/headline.js";
import { News } from "./Components/News/news.js";

export const App = () => `
  <div id="app">
    ${Header()}
    ${Headline()}
    ${News()}
  </div>
`;
