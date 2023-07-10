export function rolling() {
  const rollingList = document.querySelectorAll(".rolling_list_item");
  let rafId;

  console.log(rollingList);

  let viewIdx = 0;
  let nextIdx = 1;
  let y = 0;
  const list_len = 5;
  const rollingAnimation = () => {
    const viewItem = document.getElementsByClassName("view")[0];
    const nextItem = document.getElementsByClassName("next")[0];
    const topItem = document.getElementsByClassName("top")[0];
    console.log(topItem);
    viewItem.className = "top";
    nextItem.className = "view";
    topItem.className = "next";
  };

  setInterval(rollingAnimation, 2000);
}
