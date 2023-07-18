/**
 * 메인 컨튼츠의 컨테이너 컴포넌트
 */
import ContentNav from "./Main/ContentNav.js";
import MainContent from "./Main/MainContent.js";
import fetchNews from "../api/fetchNews.js";

const newsData = await fetchNews();

export default function Main($target, props) {
  let $main = document.querySelector(".news");

  this.state = {
    viewerType: "grid",
    pressType: "all",
  };

  this.setViewerType = (viewerType) => {
    this.state = { ...this.state, viewerType: viewerType };
    this.render();
  };

  this.setPressType = (pressType) => {
    this.state = { ...this.state, pressType: pressType };
    this.render();
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    if ($main) {
      $main.innerHTML = "";
    } else {
      $main = document.createElement("main");
      $main.setAttribute("class", "news");
    }

    new ContentNav($main, {
      mode: props.mode,
      ...this.state,
      setViewerType: this.setViewerType,
      setPressType: this.setPressType,
    });
    new MainContent($main, { ...props, ...this.state });

    $target.appendChild($main);
  };

  this.render();
}
