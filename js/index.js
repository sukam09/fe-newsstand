document.documentElement.setAttribute("color-theme", "light");

//변수
const mainLogo = document.querySelector(".title");

//함수
const reload = () => {
  window.location.reload();
};

//이벤트 리스너
mainLogo.addEventListener("click", reload);
