function clickNewsStand() {
  const newsStand = document.getElementById("header-div-01");
  newsStand.addEventListener("click", () => {
    window.location.replace("index.html");
  });
}

export { clickNewsStand };
