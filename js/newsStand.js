function clickNewsStand(newsStand) {
  newsStand.addEventListener("click", () => {
    window.location.replace("index.html");
  });
}

export { clickNewsStand };
