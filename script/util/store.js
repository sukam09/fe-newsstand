import createStore from './createStore.js';
import { GridController,PageController } from '../main/gridView.js';
import { listViewInit } from '../main/listView.js';
import { toggleClass } from '../main/selector.js';
export const pageStore = createStore(0);
pageStore.setObserver(() => {
  GridController.setLogoList();
  PageController.setArrowVisible();
});

export const subscribedStore = createStore([0,1,2,3,4,5,6,7,8,9,10,11,12]);
subscribedStore.setObserver( () => {
  console.log(subscribedStore);
  GridController.setLogoList();
})

export const mode = createStore('All');
mode.setObserver( () => {
  GridController.setLogoList();
  toggleClass();
  listViewInit();
})