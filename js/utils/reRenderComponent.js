import { initNewsStandGrid } from '../main/newsstnadGrid.js';

function reRenderComponent(KEY) {
  switch (KEY) {
    case 'GRID_ALL':
      initNewsStandGrid();
  }
}
export { reRenderComponent };
