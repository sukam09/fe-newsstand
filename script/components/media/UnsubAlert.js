import { MSG } from '../../constants.js';

const ActionButton = (alertElement, text, textClass, action) => {
  const actionButton = document.createElement('button');

  actionButton.classList.add(
    'alert_button',
    'hover_medium16',
    'surface_alt',
    textClass
  );
  actionButton.innerText = text;
  actionButton.addEventListener('click', e => {
    alertElement.remove();
    if (action) action();
  });
  return actionButton;
};

const UnsubAlertActions = (alertElement, id, action) => {
  const actionWrapper = document.createElement('div');

  actionWrapper.classList.add('alert_actions');
  actionWrapper.appendChild(
    ActionButton(alertElement, MSG.ALERT_UNSUB, 'text_default', () =>
      action(id)
    )
  );
  actionWrapper.appendChild(
    ActionButton(alertElement, MSG.ALERT_NO, 'text_strong')
  );

  return actionWrapper;
};

const UnsubAlert = (id, name, action) => {
  const alertElement = document.createElement('div');
  const alertMsg = document.createElement('div');

  alertElement.classList.add('alert', 'surface_default', 'shadow', 'fade_in');
  alertMsg.classList.add('alert_msg');
  alertMsg.innerHTML = `<span class=text_strong display_bold16>${name}</span><span class=text_default display_medium16>을(를)<br>구독해지하시겠습니까?</span>`;
  alertElement.appendChild(alertMsg);
  alertElement.appendChild(UnsubAlertActions(alertElement, id, action));
  return alertElement;
};

export default UnsubAlert;
