const RadioInput = ({ id, name, defaultChecked = false, onChange }) => {
  const inputElement = document.createElement('input');

  inputElement.type = 'radio';
  inputElement.id = id;
  inputElement.name = name;
  inputElement.className = name;
  inputElement.defaultChecked = defaultChecked;
  inputElement.addEventListener('change', onChange);
  return inputElement;
};

const RadioLabel = ({ id, innerHTML }) => {
  const labelElement = document.createElement('label');

  labelElement.htmlFor = id;
  labelElement.classList.add('text_weak', 'available_medium16');
  labelElement.innerHTML = innerHTML;
  return labelElement;
};

const RadioInputWrapper = ({ selectData, name }) => {
  const { id, onChange, innerHTML, defaultChecked } = selectData;
  const inputWrapper = document.createElement('div');

  inputWrapper.appendChild(RadioInput({ id, name, onChange, defaultChecked }));
  inputWrapper.appendChild(RadioLabel({ id, innerHTML }));
  return inputWrapper;
};

export default RadioInputWrapper;
