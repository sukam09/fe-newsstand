const headerApp = () => {
  const setHeader = () => {
    const headerElement = document.querySelector('.title_wrapper');

    document.eventManager.register('click', headerElement, () => {
      location.reload();
    });
  };

  const setDate = () => {
    const timeElement = document.querySelector('time');
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      weekday: 'long',
    };
    timeElement.innerHTML = Intl.DateTimeFormat('ko-KR', options).format(
      new Date()
    );
  };

  setHeader();
  setDate();
};

export default headerApp;
