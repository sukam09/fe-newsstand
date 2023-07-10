// 카테고리 메뉴 전환
function categoryClicked(e) {
  const targetOn = document.querySelector(`#${e.id}`);
  const targetOff = document.querySelector(".category_list--clicked");
  targetOff.classList.remove("category_list--clicked");
  targetOn.classList.add("category_list--clicked");
}

function appendCategory() {}
