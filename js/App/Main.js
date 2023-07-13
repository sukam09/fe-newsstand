/**
 * 메인 컨튼츠의 컨테이너 컴포넌트
 * props: mode
 * state: viewer(grid/list), pressType(subscription/all)
 */
import ContentNav from "./Main/ContentNav.js";
import MainContent from "./Main/MainContent.js";

export default function Main($target, props) {
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
    let $main = document.querySelector(".news");

    if ($main) {
      $main.innerHTML = "";
    } else {
      $main = document.createElement("main");
      $main.setAttribute("class", "news");
    }

    new ContentNav($main, {
      ...props,
      ...this.state,
      setViewerType: this.setViewerType,
      setPressType: this.setPressType,
    });
    new MainContent($main, { ...props, ...this.state });

    $target.appendChild($main);
  };

  this.render();
}
