import listViewInit from "./listView.js";
const viewSelector = () => {
  const listBtn = document.querySelector('.view_select img[src$="list_gray.svg"]');
  const gridBtn = document.querySelector('.view_select img[src$="grid_blue.svg"]');
  const gridWrapper = document.querySelector('.grid_wrapper');
  const listWrapper = document.querySelector('.list_wrapper');

  listBtn.addEventListener('click', () => {
    gridWrapper.classList.remove('selected');
    listWrapper.classList.add('selected');
    
    listBtn.src = "assets/images/list_blue.svg";
    gridBtn.src = "assets/images/grid_gray.svg";
    listViewInit();
  });

  gridBtn.addEventListener('click', () => {
    listWrapper.classList.remove('selected');
    gridWrapper.classList.add('selected');

    listBtn.src = "assets/images/list_gray.svg";
    gridBtn.src = "assets/images/grid_blue.svg";
  });
}

const selectorInit = () => {
  viewSelector();
}
export default selectorInit;