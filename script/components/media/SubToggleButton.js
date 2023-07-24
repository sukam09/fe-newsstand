import { getNewsData } from '../../fetch/getNewsData.js';
import Button from '../Button.js';

const SubButtonArea = ({ id, navStore, viewStore }) => {
  const subButtonArea = document.createElement('div');

  getNewsData(id).then(({ name }) => {
    subButtonArea.appendChild(
      Button(navStore.buttonData({ id, name, viewStore }))
    );
  });
  subButtonArea.classList.add('media_hover', 'surface_alt');
  return subButtonArea;
};

export default SubButtonArea;
