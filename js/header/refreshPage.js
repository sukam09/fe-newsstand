function refreshPage(className) {
  function handleLogoClick() {
    window.location.reload();
  }
  const target = document.querySelector(className);
  target.addEventListener("click", handleLogoClick);
}
export { refreshPage };
