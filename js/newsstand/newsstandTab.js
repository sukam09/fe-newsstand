const VIEW_DISABLED = "view-disabled";

export function newsstandListTab() {
  const [listButton] = document.getElementsByClassName("newsstand—btn-list");
  const [thumbButton] = document.getElementsByClassName("newsstand-btn-thumb");
  const [gridArea] = document.getElementsByClassName("newsstand__media-area");
  const listArea = document.getElementById("newsstand__news-area");

  hanlderNewsTabListener(listButton, thumbButton, listArea, gridArea);
}

function hanlderNewsTabListener(listButton, thumbButton, listArea, gridArea) {
  listButton.addEventListener("click", () => {
    listArea.classList.remove(VIEW_DISABLED);
    gridArea.classList.add(VIEW_DISABLED);
  });

  thumbButton.addEventListener("click", () => {
    gridArea.classList.remove(VIEW_DISABLED);
    listArea.classList.add(VIEW_DISABLED);
  });
}
