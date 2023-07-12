function initReload() {
  const mainLogo = document.querySelector(".title");
  function handleLogoClick() {
    window.location.reload();
  }
  mainLogo.addEventListener("click", handleLogoClick);
}
export { initReload };
