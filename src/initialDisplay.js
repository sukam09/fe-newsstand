/***** 초기 화면 *****/
function initDisplay() {
  document.querySelector(".list-selected").style.display = "none";
  document.querySelector(".press-list-section").style.display = "none";
  document.getElementById("grid-prev").style.display = "none";
  document.querySelectorAll(".count").forEach((count) => {
    count.style.display = "none";
  });
  document.querySelector(".count").style.display = "block";
}

export { initDisplay };
