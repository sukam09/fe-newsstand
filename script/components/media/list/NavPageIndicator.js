import Icon from '../../Icon.js';

const NavPageIndicator = data => {
  const navPageIndicator = document.createElement('div');

  navPageIndicator.classList.add('indicator');
  if (!data) {
    navPageIndicator.innerHTML = Icon.chevronRight;
    navPageIndicator.classList.add('subscribed_indicator');
    return navPageIndicator;
  }
  navPageIndicator.innerHTML = `
    <div class="display_bold12 text_white_default">${data.index + 1}</div>
      ${Icon.division}
    <div class="display_bold12 text_white_weak">${data.total}</div>`;
  return navPageIndicator;
};

export default NavPageIndicator;
