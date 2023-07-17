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

export { setDisplay, removeDisplay };
