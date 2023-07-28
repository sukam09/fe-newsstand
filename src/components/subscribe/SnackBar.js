import { html } from "../../lib/jsx.js";
const SUBSCRIBE_SNACKBAR_MESSAGE = "내가 구독한 언론사에 추가되었습니다.";
const SNACKBAR_DURATION = 3000;
const SNACKBAR_TRANSITION_DURATION = 150;
const Snackbar = html `
  <div class="snack-bar popup">${SUBSCRIBE_SNACKBAR_MESSAGE}</div>
`;
Snackbar.style.opacity = "0";
let tid;
const removeSnackbar = () => {
    Snackbar.style.opacity = "0";
    setTimeout(() => Snackbar.remove(), SNACKBAR_TRANSITION_DURATION);
    // Snackbar.remove();
};
const useSnackBar = ($parent) => () => {
    console.log(document.body.getElementsByClassName("snack-bar"));
    if (document.querySelector(".snack-bar") === null) {
        $parent.append(Snackbar);
        setTimeout(() => {
            Snackbar.style.opacity = "1";
        }, 0);
    }
    else {
        console.log("clearTimeout");
        clearTimeout(tid);
    }
    tid = setTimeout(removeSnackbar, SNACKBAR_DURATION);
};
export { useSnackBar };
