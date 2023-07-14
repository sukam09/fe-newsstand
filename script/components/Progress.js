const ListProgressBar = ({ progress }) => {
  const listProgressBar = document.createElement('div');

  listProgressBar.id = 'list_progress';
  listProgressBar.classList.add('surface_brand_default');
  listProgressBar.style.width = `${progress * 100}%`;
  return listProgressBar;
};

export default ListProgressBar;
