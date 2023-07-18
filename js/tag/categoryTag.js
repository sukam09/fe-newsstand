export function makeCategoryTag(category) {
  const parentNode = document.querySelector(".newsstand__news-nav");
  category.map((item) => {
    const li = `<li style="padding: 16px">
      <div></div>
      <span>${item}</span>
      <span></span>
      <span></span>
    </li>`;
    parentNode.innerHTML += li;
  });
}
