function renderSubscribeTypeButton(subscribeMode) {
  const mainHtml = document.getElementById("main-left");
  mainHtml.innerHTML = "";
  let tempHtml;
  if (subscribeMode === "subscribed") {
    tempHtml = `
        <input type="radio" id="main-left-radio-01" name="subscribe" />
        <label for="main-left-radio-01" id="allNews">
          <i>전체구독사</i>
        </label>
        <input type="radio" id="main-left-radio-02" name="subscribe" checked />
        <label for="main-left-radio-02" id="subscribedNews">
          <i>내가 선택한 구독사</i>
        </label>`;
  } else {
    tempHtml = `
        <input type="radio" id="main-left-radio-01" name="subscribe" checked />
        <label for="main-left-radio-01" id="allNews">
          <i>전체구독사</i>
        </label>
        <input type="radio" id="main-left-radio-02" name="subscribe" />
        <label for="main-left-radio-02" id="subscribedNews">
          <i>내가 선택한 구독사</i>
        </label>`;
  }
  mainHtml.innerHTML = tempHtml;
}

export { renderSubscribeTypeButton };
