import { HEADER_CLASS, MESSESE, NUMBER } from '../constants/press-header/press-popup.js';
import { LIST } from '../constants/press-header/press-data.js';
import pressHeaderStore from '../components/press-header/press-header.js';

const getSnackBar = () => {
  const snackBar = document.querySelector(`.${HEADER_CLASS.SNACK_BAR}`);
  snackBar.innerText = MESSESE.SUBSCRIBE;
  showPopup(snackBar);

  setTimeout(() => {
    hidePopup(snackBar);
    pressHeaderStore.setState({ isEntire: false, isGrid: false });
  }, NUMBER.TIMEOUT);
};

const getAlert = (pressIds, pressName) => {
  const alert = document.querySelector(`.${HEADER_CLASS.ALERT}`);
  renderAlert(alert, pressName);
  renderAlertEvent(alert, pressIds, pressName);
};

const renderAlertEvent = (alert, pressIds, pressName) => {
  const alertYes = alert.querySelector(`.${HEADER_CLASS.ALERT_YES}`);
  const alertNo = alert.querySelector(`.${HEADER_CLASS.ALERT_NO}`);
  showPopup(alert);

  alertNo.addEventListener('click', () => hidePopup(alert));
  alertYes.addEventListener('click', () => {
    hidePopup(alert);
    pressHeaderStore.setState({ isEntire: LIST.SUBSCRIBE_NAME.includes(pressName) ? true : false });
  });
};

const renderAlert = (alert, pressName) => {
  const alertElement = `
    <article class=${HEADER_CLASS.ALERT_INFO}>
      <div class=${HEADER_CLASS.ALERT_PRESS}>
        <h4 class=${HEADER_CLASS.ALERT_NAME}>${pressName}</h4>
        <p class=${HEADER_CLASS.ALERT_INTO}>${MESSESE.INTO}</p>
      </div>
      <p class=${HEADER_CLASS.ALERT_UNSUBSCRIBE}>${MESSESE.UNSUBSCRIBE}</p>
    </article>

    <div class=${HEADER_CLASS.ALERT_YES_NO}>
      <p class=${HEADER_CLASS.ALERT_YES}>${MESSESE.YES}</p>
      <p class=${HEADER_CLASS.ALERT_NO}>${MESSESE.NO}</p>
    </div>
  `;
  alert.innerHTML = alertElement;
};

const showPopup = (element) => {
  element.classList.add(HEADER_CLASS.SHOW);
  element.classList.remove(HEADER_CLASS.HIDDEN);
};

const hidePopup = (element) => {
  element.classList.add(HEADER_CLASS.HIDDEN);
  element.classList.remove(HEADER_CLASS.SHOW);
};

export { getSnackBar, getAlert };
