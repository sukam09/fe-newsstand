const modeInit = () => {
  const checkbox = document.querySelector('#toggle');
  document.documentElement.setAttribute('color-theme', 'light');
  checkbox.addEventListener('change', function() {
    if(this.checked) {
        console.log('체크박스 설정');
        document.documentElement.setAttribute('color-theme', 'dark');
    } else {
        console.log('체크박스 해제');
        document.documentElement.setAttribute('color-theme', 'light');
    }
  });
}

export default modeInit;