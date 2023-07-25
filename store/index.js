//store
import { PressStore } from './Press.js';
import { ViewModeStore } from './View.js';
import { PageStore } from './Page.js';

const pressStore = new PressStore();
const viewStore = new ViewModeStore();
const pageStore = new PageStore();

export { pressStore, viewStore, pageStore };
