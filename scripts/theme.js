import { appStore, themeStore, useSelector } from "../store/index.js";
import { changeTheme, initTheme } from "../store/reducer/theme.js";
import { getLocalStorageItem } from "../utils/local-storage.js";
import { getReplacedSrcByTheme, setTheme } from "../utils/theme.js";
import { THEME, VIEW_TYPE } from "../constants/index.js";
import { $gridView, $listView } from "./doms.js";

export function initAppTheme() {
  let theme = getLocalStorageItem("theme");

  const isUserPreferDarkTheme =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  // theme 설정이 없을 시 사용자의 OS 테마 설정을 따름
  if (!theme && isUserPreferDarkTheme) {
    theme = THEME.DARK;
  }

  // 위의 케이스가 모두 해당하지 않을 시 기본 테마를 light로 설정
  if (!theme) {
    theme = THEME.LIGHT;
  }

  themeStore.dispatch(initTheme(theme));
  setTheme();
}

export function addEventHandlerOnThemeButton() {
  const $themeButton = document.querySelector(".theme-btn");

  $themeButton.addEventListener("click", () => {
    themeStore.dispatch(changeTheme());
    setTheme();
  });
}

function changeBrandMarkSrcByTheme() {
  const theme = useSelector({
    store: themeStore,
  });
  const viewType = useSelector({
    store: appStore,
    selector: (state) => state.page.viewType,
  });

  console.log(viewType);
  const isGridView = viewType === VIEW_TYPE.GRID;

  const $marks = isGridView
    ? $gridView.querySelectorAll(".brand-mark")
    : $listView.querySelectorAll(".brand-mark");

  $marks.forEach(($mark) => {
    $mark.src = getReplacedSrcByTheme($mark.src, theme);
  });
}

themeStore.subscribe(changeBrandMarkSrcByTheme);
