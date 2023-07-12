import categoryData from "../json/category.json" assert { type: "json" };

function addInitCategory() {
  const categories = categoryData[0].category;
  let categoryHtml = `<div class="wrap"><ul>`;
  for (const category in categories) {
    categoryHtml += `<div id="${category} categoryItem"><li>${category}</li></div>`;
  }
  categoryHtml += `</ul></div>`;
  document.getElementById("category").innerHTML = categoryHtml;
}

export { addInitCategory };
