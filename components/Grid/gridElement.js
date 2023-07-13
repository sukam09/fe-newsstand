// Grid 내에 list를 추가
export const makeGrid = (data) => {
  const li = document.createElement("li");

  if (data) {
    const img = document.createElement("img");
    li.appendChild(img);

    const btn = document.createElement("button");
    btn.innerText = "test";

    btn.className = "agency-btn-hover";

    li.addEventListener("mouseenter", () => {
      li.appendChild(btn);
    });

    li.addEventListener("mouseleave", () => {
      li.removeChild(btn);
    });

    img.src = data.logo;
  }
  document.querySelector(".agency-grid").appendChild(li);
};
