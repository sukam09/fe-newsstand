export const fillGridView = (newsData) => {
  const $gridView = document.querySelector(".grid-view");
  $gridView.innerHTML = "";

  for (let i = 0; i < newsData.length; i++) {
    const $li = document.createElement("li");
    $li.className = "grid-cell";

    const $button = document.createElement("button");

    const $img = document.createElement("img");
    $img.className = "grid-cell_news-img";

    $img.src = newsData[i].src;
    $img.alt = newsData[i].name;

    $button.appendChild($img);
    $li.appendChild($button);

    $gridView.appendChild($li);
  }
};
