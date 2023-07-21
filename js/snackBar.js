import { rollingTime } from "../utils/constants.js";
const snackBar = (notice) => {
  const snackbar = document.querySelector(".snackbar");
  snackbar.innerText = notice;
  snackbar.style.opacity = "1";
  setTimeout(() => {
    snackbar.style.opacity = "0";
    setTimeout(() => {}, 1000);
  }, rollingTime);
};

export { snackBar };
