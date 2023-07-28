import { handleElementClass } from "./util.js";

export function focusToAllPublisher(mySubscribe, allPublisher) {
  // 전체 언론사에 포커스 효과주기
  const mySubTag = [
    ["remove", "newsstand—text-clicked"],
    ["add", "newsstand—text-unclicked"],
  ];
  const allSubTag = [
    ["add", "newsstand—text-clicked"],
    ["remove", "newsstand—text-unclicked"],
  ];
  mySubTag.forEach((att) => handleElementClass(mySubscribe, att[0], att[1]));
  allSubTag.forEach((att) => handleElementClass(allPublisher, att[0], att[1]));
}

export function focusToMyPubliser(mySubscribe, allPublisher) {
  // 현재 구독중인 리스트에 포커스 효과주기
  const mySubTag = [
    ["add", "newsstand—text-clicked"],
    ["remove", "newsstand—text-unclicked"],
  ];
  const allSubTag = [
    ["remove", "newsstand—text-clicked"],
    ["add", "newsstand—text-unclicked"],
  ];
  mySubTag.forEach((att) => handleElementClass(mySubscribe, att[0], att[1]));
  allSubTag.forEach((att) => handleElementClass(allPublisher, att[0], att[1]));
}
