import { viewMode } from "../util/store.js";
const modeInit = () => {
  const checkbox = document.querySelector('#toggle');
  document.documentElement.setAttribute('color-theme', 'light');
  checkbox.addEventListener('change', function() {
    if(this.checked) {
        document.documentElement.setAttribute('color-theme', 'dark');
        viewMode.setState('dark');
    } else {
        document.documentElement.setAttribute('color-theme', 'light');
        viewMode.setState('light');
    }
  });
}

export default modeInit;