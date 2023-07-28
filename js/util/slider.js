import { clickSubListNav } from "../subscribe/subscribeList.js";

const slider = document.querySelector(".sub-list-nav");
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener("mousedown", e => {
  const $li = document.querySelectorAll(".sub-list-nav li");
  $li.forEach(li => li.removeEventListener("click", clickSubListNav));
  isDown = true;
  slider.classList.add("active");
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener("mouseleave", () => {
  isDown = false;
  slider.classList.remove("active");
});

slider.addEventListener("mouseup", () => {
  const $li = document.querySelectorAll(".sub-list-nav li");
  $li.forEach(li => li.addEventListener("click", clickSubListNav));
  isDown = false;
  slider.classList.remove("active");
});

slider.addEventListener("mousemove", e => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = x - startX;
  slider.scrollLeft = scrollLeft - walk;
});
