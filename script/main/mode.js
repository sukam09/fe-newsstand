const modeInit = () => {
  const checkbox = document.querySelector('#toggle');

  checkbox.addEventListener('change', function() {
    if(this.checked) {
        console.log('체크박스 설정');
    } else {
        console.log('체크박스 해제');
    }
  });
}

export default modeInit;