import Button from "./Main/MainContent/Button.js";
import ContentNav from "./Main/ContentNav.js";
import MainContent from "./Main/MainContent.js";

export default function Main($target, props) {
  const mode = props.mode;

  this.state = { mainContent: "newspaper", renderContent: "all", page: 0 };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    let $main = document.querySelector(".news");

    if ($main) {
      $main.innerHTML = "";
    } else {
      $main = document.createElement("main");
      $main.setAttribute("class", "news");
    }

    new ContentNav($main, { renderContent: this.state.renderContent });
    new MainContent($main, { ...this.state, mode: mode }, this.setState);

    $target.appendChild($main);
  };

  this.render();
}
