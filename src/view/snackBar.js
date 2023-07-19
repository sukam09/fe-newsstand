function initSnackBar(parentNode) {
  const dom = `<div class="snack-bar display-medium16">내가 구독한 언론사에 추가되었습니다.</div>`;

  parentNode.innerHTML += dom;
}

function drawSnackBar() {
  return 0;
}

export { initSnackBar, drawSnackBar };
