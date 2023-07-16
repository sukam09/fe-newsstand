import AllNews from "./allNews/index.js";
import Header from "./header/index.js";
import LatestNews from "./latestNews/index.js";

export default class App {
  constructor() {
    this.$app = document.getElementById("root");
    this.render();
  }

  render() {
    this.$app.appendChild(new Header());
    this.$app.appendChild(new LatestNews());
    this.$app.appendChild(new AllNews());
  }
}
