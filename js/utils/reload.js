export function reload() {
  const mainLogo = document.querySelector(".title");
  mainLogo.addEventListener("click", () => document.location.reload());
}
