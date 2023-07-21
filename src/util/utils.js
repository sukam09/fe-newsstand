//style.display = ""
function setDisplay(element, display_style) {
  document.querySelector(element).style.display = display_style;
}

function setDisplayWithIdx(element, idx, display_style) {
  document.querySelectorAll(element)[idx].style.display = display_style;
}

export { setDisplay, setDisplayWithIdx };
