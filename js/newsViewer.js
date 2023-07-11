const $listButton = document.querySelector(".news-navbar_content__list");
const $gridButton = document.querySelector(".news-navbar_content__grid");
const $listSection = document.querySelector(".news-section-list");
const $gridSection = document.querySelector(".news-section-grid");

const clickList = () => {
  $listButton.childNodes[1].childNodes[1].setAttribute("fill", "#4362D0");
  $gridButton.childNodes[1].childNodes[1].setAttribute("fill", "#879298");
  $gridSection.style.display = "none";
  $listSection.style.display = "block";
};

const clickGrid = () => {
  $listButton.childNodes[1].childNodes[1].setAttribute("fill", "#879298");
  $gridButton.childNodes[1].childNodes[1].setAttribute("fill", "#4362D0");
  $gridSection.style.display = "block";
  $listSection.style.display = "none";
};

const setViewerEvent = () => {
  $listButton.addEventListener("click", clickList);
  $gridButton.addEventListener("click", clickGrid);
};

export { setViewerEvent };
