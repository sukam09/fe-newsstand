import createStore from './createStore.js';
import { GridController,PageController } from '../main/gridView.js';
import { listViewInit,setNewsData } from '../main/listView.js';
import { toggleClass } from '../main/selector.js';
export const pageStore = createStore(0);
pageStore.setObserver(() => {
  GridController.setLogoList();
  PageController.setArrowVisible();
});

export const subscribedStore = createStore([0,1,2,3,4,5,6,7,8,9,10,11]);
subscribedStore.setObserver( () => {
  GridController.setLogoList();
  listViewInit();
})

export const mode = createStore('All');
mode.setObserver( () => {
  GridController.setLogoList();
  toggleClass();
  listViewInit();
})

export const category_page = createStore(0);
category_page.setObserver ( () => {
  setNewsData();
})

export const media_page = createStore(0);
media_page.setObserver( () => {
  setNewsData();
})

export const view = createStore('Grid');

export const viewMode = createStore('light');
viewMode.setObserver(()=>{
  GridController.setLogoList();
  listViewInit();
  setNewsData();
})