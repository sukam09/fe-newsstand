import categoryData from "../json/category.json" assert { type: "json" };

function addInitCategory() {
  let categoryHtml = `<div class="categoryWrap"><ul>`;
  for (const category of categoryData) {
    for (const key in category) {
      categoryHtml += `<div class="categoryItem" id="${key}"><li><label><input type="radio" name="category">${key}</label></li><span class="categoryCnt">${category[key]}</span></div>`;
    }
  }
  categoryHtml += `</ul></div>`;
  document.getElementById("category").innerHTML = categoryHtml;
}

// function addSpanEvent(){
//   const spanTag = document.querySelector(".categoryCnt");
//   spanTag.addEventListener("click",()=>{

//   })
// }

// addSpanEvent();
export { addInitCategory };
