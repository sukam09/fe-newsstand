export function focusToAllPublisher(mySubscribe, allPublisher) {
  // 전체 언론사에 포커스 효과주기
  mySubscribe.classList.remove("newsstand—text-clicked");
  mySubscribe.classList.add("newsstand—text-unclicked");
  allPublisher.classList.add("newsstand—text-clicked");
  allPublisher.classList.remove("newsstand—text-unclicked");
}

export function focusToMyPubliser(mySubscribe, allPublisher) {
  // 현재 구독중인 리스트에 포커스 효과주기
  mySubscribe.classList.add("newsstand—text-clicked");
  mySubscribe.classList.remove("newsstand—text-unclicked");
  allPublisher.classList.remove("newsstand—text-clicked");
  allPublisher.classList.add("newsstand—text-unclicked");
}
