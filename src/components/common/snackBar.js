import { create } from "../../utils/createElement.js";

export function createSnackBar() {
    const $container = create.div({
        className: "snack-bar display-medium16",
        txt: "내가 구독한 언론사에 추가되었습니다.",
    });
    return $container;
}
