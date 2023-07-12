function initEvent() {
  eventNewsTabList();
}

const eventNewsTabList = () => {
  document.querySelector('.newsstand—btn-list').addEventListener('click', () => {
    console.log('aa');
  });
};

export { initEvent };
