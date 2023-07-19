export function makeCategoryTag(categoryParent, category) {
  categoryParent.innerHTML = category.reduce((acc, item) => {
    return (
      acc +
      `<li style="padding: 16px">
        <div></div>
        <span>${item}</span>
        <span></span>
        <span></span>
      </li>`
    );
  }, "");
}
