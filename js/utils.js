import presses from "../assets/light-media.js";

function setDisplay(element, type, display) {
  //display = ['none' , 'block', 'flex']
  switch (type) {
    case "id":
      document.getElementById(element).style.display = display;
      break;
    case "query":
      document.querySelector(element).style.display = display;
      break;
  }
}

function removeDisplay() {
  setDisplay(".press-list-section", "query", "none");
  setDisplay(".sub-press-list-section", "query", "none");
  setDisplay(".press-grid", "query", "none");
  setDisplay(".press-grid-sub", "query", "none");
  setDisplay(".no-sub-item-div", "query", "none");
}

function findPress(type, target) {
  if (type === "src") {
    let $target_src = target.getElementsByTagName("img")[0].src;
    $target_src = ".." + $target_src.split("5500")[1];
    const press_name = presses.find(press => press.src === $target_src).name;
    return press_name;
  } else if (type === "name") {
    return presses.find(press => press.name === target.textContent); // 객체반환
  }
}

function findSpanNearby(element) {
  var parentElement = element.parentNode;

  // 최대 5단계까지 부모 요소를 탐색하여 <span> 태그를 찾음
  var maxDepth = 5;
  var depth = 0;

  while (parentElement && depth < maxDepth) {
    var spanElement = parentElement.querySelector("span");

    if (spanElement) {
      return spanElement;
    }

    parentElement = parentElement.parentNode;
    depth++;
  }

  return null; // 근처에 <span> 태그가 없을 경우 null 반환
}

export { setDisplay, removeDisplay, findPress, findSpanNearby };
