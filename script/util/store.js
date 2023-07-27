import createStore from './createStore.js';
import { GridController,PageController } from '../main/gridView.js';
import { listViewInit,setNewsData } from '../main/listView.js';
import { toggleClass } from '../main/selector.js';
import { removeAlertUnsubscribe } from '../main/subscribe.js';
export const pageStore = createStore(0);
pageStore.setObserver(() => {
  GridController.setLogoList();
  PageController.setArrowVisible();
});

export const subscribedStore = createStore([0,1,2,3,4,5,6,7,8,9,10,11]);
subscribedStore.setObserver( () => {
  GridController.setLogoList();
  setNewsData();
  // listViewInit();
})

export const mode = createStore('All');
mode.setObserver( () => {
  GridController.setLogoList();
  toggleClass();
  listViewInit();
})

export const category_page = createStore(0);
category_page.setObserver ( () => {
  // setNewsData();
  removeAlertUnsubscribe();
})

export const media_page = createStore(0);
media_page.setObserver( () => {
  // setNewsData();
  removeAlertUnsubscribe();
})

export const view = createStore('Grid');
view.setObserver( () => {
  listViewInit();
})
export const viewMode = createStore('light');
viewMode.setObserver(()=>{
  GridController.setLogoList();
  setNewsData();
})

export const progressedIdx = createStore(0);