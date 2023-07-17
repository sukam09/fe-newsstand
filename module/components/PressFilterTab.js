const Tabs = document.querySelector(".tab-and-viewer .tabs");
const EntirePressBtn = Tabs.querySelector(".all-press-btn");
const SubscribePressBtn = Tabs.querySelector(".all-press-btn");
const layout = document.querySelector("main");

export function PressFilterTab() {
  EntirePressBtn.addEventListener("click", () => {
    layout.innerHTML = ``;
  });
  SubscribePressBtn.addEventListener("click", () => {
    layout.innerHTML = ``;
  });
}
