import listViewInit from "./listView.js";
import { pageStore,mode,view } from "../util/store.js";
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
    view.setState('List');
  });

  gridBtn.addEventListener('click', () => {
    listWrapper.classList.remove('selected');
    gridWrapper.classList.add('selected');

    listBtn.src = "assets/images/list_gray.svg";
    gridBtn.src = "assets/images/grid_blue.svg";
    view.setState('Grid');
  });
}
export const toggleClass = () => {
  let selected,unselected;
  const [allMediaDiv, subscribeMediaDiv] = document.querySelectorAll('.media_select');
  if(mode.getState() === 'All'){
    selected = allMediaDiv;
    unselected = subscribeMediaDiv;
  }
  else{
    selected = subscribeMediaDiv;
    unselected = allMediaDiv;
  }
  selected.classList.replace('text-weak','text-strong');
  selected.classList.replace('available-medium16','selected-bold16');
  unselected.classList.replace('text-strong','text-weak');
  unselected.classList.replace('selected-bold16','available-medium16');
};
const modeSelector = () => {
  const [allMediaDiv, subscribeMediaDiv] = document.querySelectorAll('.media_select');
  allMediaDiv.addEventListener('click', function() {
    mode.setState('All');
    pageStore.setState(0);
    toggleClass();
  });
  subscribeMediaDiv.addEventListener('click', function() {
    mode.setState('Sub');
    pageStore.setState(0);
    toggleClass();
  });
}

const selectorInit = () => {
  viewSelector();
  modeSelector();
}
export default selectorInit;