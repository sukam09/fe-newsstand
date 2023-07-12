export function checkPage(page) {
  const path = new URL(document.getElementById("grid-btn").src).pathname;
  const isClicked = path.includes("clicked");
  if (isClicked) {
    const left_btn = document.getElementById("left-btn");
    const right_btn = document.getElementById("right-btn");
    if (page === 1) left_btn.style.visibility = "hidden";
    else if (page === 4) right_btn.style.visibility = "hidden";
    else {
      left_btn.style.visibility = "visible";
      right_btn.style.visibility = "visible";
    }
  }
}
