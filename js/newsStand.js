function clickNewsStand(newsStand) {
  newsStand.addEventListener("click", () => {
    window.location.reload();
  });
}

export { clickNewsStand };
