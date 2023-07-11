// 카테고리 메뉴 전환
function categoryClicked(item) {
  const targetOn = document.querySelector(`#category${item.id}`);
  const targetOff = document.querySelector(".category_list--clicked");
  targetOff.classList.remove("category_list--clicked");
  targetOn.classList.add("category_list--clicked");
}

// 카테고리 리스트 추가
export function appendCategoryList() {
  const categoryListContainer = document.getElementsByClassName(
    "category_list_container"
  );
  const suffledCategory = shuffleArray(categoryList);
  categoryList.forEach((item, idx) => {
    const newCategory = createCategoryList(item, idx);
    categoryListContainer[0].appendChild(newCategory);
  });
}

// 카테고리 리스트 태그 생성
function createCategoryList(item, idx) {
  // li 생성
  const newList = document.createElement("li");
  if (idx == 0) {
    newList.className = "category_list category_list--clicked";
  } else {
    newList.className = "category_list";
  }
  newList.addEventListener("click", () => {
    categoryClicked(item);
  });
  newList.id = `category${item.id}`;

  // 제목 생성
  const title = document.createElement("span");
  title.className = "category_list__title";
  title.innerHTML = `${item.name}`;
  newList.appendChild(title);

  // 페이지 카운터 생성
  const counterContainer = document.createElement("wrapper");
  counterContainer.className = "page_count_wrapper";
  const nowPage = document.createElement("span");
  const allPage = document.createElement("span");
  nowPage.className = "now_page";
  nowPage.innerHTML = "1 ";
  allPage.className = "all_page";
  allPage.innerHTML = `/ ${item.tabs}`;
  counterContainer.appendChild(nowPage);
  counterContainer.appendChild(allPage);
  newList.appendChild(counterContainer);

  // 프로그레스 바 생성
  const progressBar = document.createElement("div");
  progressBar.className = "progressbar";
  newList.appendChild(progressBar);
  return newList;
}
