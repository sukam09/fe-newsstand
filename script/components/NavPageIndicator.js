import Icon from './Icon.js';

const NavPageIndicator = ({ index, total }) => {
  const navPageIndicator = document.createElement('div');

  navPageIndicator.classList.add('indicator');
  navPageIndicator.innerHTML = `
      <div class="display_bold12 text_white_default">${index + 1}</div>
      ${Icon.division}
      <div class="display_bold12 text_white_weak">${total}</div>
  `;
  return navPageIndicator;
};

export default NavPageIndicator;
