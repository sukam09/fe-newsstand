import { html } from "../../lib/jsx.js";
const SnackBar = () => html `
  <div class="snack-bar popup">내가 구독한 언론사에 추가되었습니다.</div>
`;
// component("div", { class: "snack-bar popup" }, [
//   "내가 구독한 언론사에 추가되었습니다.",
// ]);
const useSnackBar = () => {
    const $snackBar = SnackBar();
    const show = () => {
        $snackBar.classList.add("show");
        setTimeout(() => {
            $snackBar.classList.remove("show");
        }, 3000);
    };
    return { $snackBar, show };
};
