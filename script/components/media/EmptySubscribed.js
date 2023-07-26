import { MSG } from '../../constants.js';

const EmptySubscribed = () => {
  const emptySubscribed = document.createElement('div');
  const leftArrow = document.querySelector('#left_arrow');
  const rightArrow = document.querySelector('#right_arrow');

  leftArrow.style.display = 'none';
  rightArrow.style.display = 'none';
  emptySubscribed.classList.add('empty_subscribed');
  emptySubscribed.innerHTML = `
    <div class="display_bold24 text_strong">${MSG.NOSUB_TITLE}</div>
    <div class="display_medium14 text_default">${MSG.NOSUB_MSG}</div>`;
  return emptySubscribed;
};

export default EmptySubscribed;
