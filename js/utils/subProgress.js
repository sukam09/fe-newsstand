function subProgressBar() {
  const snackbar = document.getElementById('snackbar');

  snackbar.style.display = 'block';
  setTimeout(() => {
    snackbar.style.display = 'none';
  }, 2000);
}

export { subProgressBar };
