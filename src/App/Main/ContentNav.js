/* 
Main 컴포넌트의 컨텐츠를 변경하는 네비게이션 컴포넌트
*/

import PressType from "../ContentNav/PressType.js";
import ViewerType from "../ContentNav/viewerType.js";

export default function ContentNav($target, props) {
  const pressTypeProps = {
    mainContentType: props.pressType,
    setPressType: props.setPressType,
  };

  const viewerTypeProps = {
    mainContentType: props.viewerType,
    setViewerType: props.setViewerType,
  };

  this.render = () => {
    const $nav = document.createElement("nav");
    $nav.setAttribute("class", "news-navbar");

    new PressType($nav, pressTypeProps);
    new ViewerType($nav, viewerTypeProps);

    $target.appendChild($nav);
  };

  this.render();
}
