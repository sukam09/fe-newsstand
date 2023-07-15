import { MEDIA } from '../../constants.js';

const GridItem = () => {
  const gridItem = document.createElement('li');
  const gridItemImage = document.createElement('img');

  gridItemImage.classList.add('media_logo');
  gridItem.appendChild(gridItemImage);
  return gridItem;
};

const MediaGrid = () => {
  const gridElement = document.createElement('ul');

  gridElement.classList.add('media_view_grid');
  Array.from({ length: MEDIA.PAGE_SIZE }, _ => {
    gridElement.appendChild(GridItem());
  });
  return gridElement;
};

export default MediaGrid;
