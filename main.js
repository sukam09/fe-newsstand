import { NewArticlePrint } from "./module/components/NewArticle.js";
import { printGrid } from "./module/view/GridView.js";
import SelectViewStyle from "./module/ViewStyle.js";

function initDate() {
  const date = new Date();
  const week = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
  const todaystr = `${date.getFullYear()}. ${String(date.getMonth() + 1).padStart(2, "0")}. ${String(date.getDate()).padStart(2, "0")}. ${week[date.getDay()]}`;
  document.querySelector(".today").innerHTML = todaystr;
}

function main() {
  initDate(); // 오늘 날짜
  NewArticlePrint(); // 롤링
  printGrid();
  SelectViewStyle(); // 뷰 선택
}

main();
