import { initNewsStandGrid } from '../main/newsstnadGrid.js';
import { initNewsStandList } from '../main/newsstandList.js';

function reRenderComponent(KEY) {
  switch (KEY) {
    case 'GRID_ALL':
      initNewsStandGrid();
      break;
    case 'LIST_ALL':
      initNewsStandList();
      break;
  }
}
export { reRenderComponent };
