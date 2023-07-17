function snackBar(e) {
  const snackBarElement = document.createElement("div");
  snackBarElement.className = "snack-bar";
  snackBarElement.innerHTML = `<span class="snack-bar-text display-medium16">내가 구독한 언론사에 추가되었습니다.</span>`;
  const gridMain = document.querySelector(".grid");
  gridMain.appendChild(snackBarElement);

  setTimeout(() => {
    gridMain.removeChild(snackBarElement);
  }, 5000);
}

export function DoSubScribe(btnElement, pressName) {
  btnElement.addEventListener("click", (e) => {
    snackBar(e);
    console.log(pressName);
  });
}
