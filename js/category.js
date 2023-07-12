import categoryData from "../json/category.json" assert { type: "json" };

function addInitCategory() {
  let categoryHtml = `<div class="wrap"><ul>`;
  categoryData[0].category.forEach((value) => {
    categoryHtml += `<li>${value}</li>`;
  });
  categoryHtml += `</ul></div>`;
  document.getElementById("category").innerHTML = categoryHtml;
}

export { addInitCategory };
