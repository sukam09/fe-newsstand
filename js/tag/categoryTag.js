const category = [
  "종합/경제",
  "방송/통신",
  "IT",
  "영자지",
  "스포츠/연예",
  "매거진/전문지",
  "지역",
];

export function makeCategoryTag() {
  const parentNode = document.querySelector(".newsstand__news-nav");
  category.map((item) => {
    const li = `<li style="padding: 16px">
      <div></div>
      <span>${item}</span>
      <span></span>
    </li>`;
    parentNode.innerHTML += li;
  });
}
