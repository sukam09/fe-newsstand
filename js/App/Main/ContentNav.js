/* 
Main 컴포넌트의 컨텐츠를 변경하는 네비게이션 컴포넌트
props: mode, viewer, pressType, setViewer, setPressType
*/

import PressType from "./ContentNav/PressType.js";
import ViewerType from "./ContentNav/viewerType.js";

export default function ContentNav($target, props) {
  this.render = () => {
    const $nav = document.createElement("nav");
    $nav.setAttribute("class", "news-navbar");

    new PressType($nav, {
      mainContentType: props.pressType,
      setPressType: props.setPressType,
    });
    new ViewerType($nav, {
      mainContentType: props.viewerType,
      setViewerType: props.setViewerType,
    });

    $target.appendChild($nav);
  };

  this.render();
}
