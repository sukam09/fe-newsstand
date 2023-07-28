function subProgressBar() {
  const snackbar = document.getElementById('snackbar');

  snackbar.style.display = 'block';
  setTimeout(() => {
    snackbar.style.display = 'none';
  }, 1000);
}

export { subProgressBar };
