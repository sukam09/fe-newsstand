export default function Header({ $target }) {
  const $header = document.createElement('header');

  $target.appendChild($header);

  const addLeadingZero = number => (number < 10 ? `0${number}` : number);

  const getDate = () => {
    const $date = $header.querySelector('.date');

    const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const weekDay = weekDays[today.getDay()];

    const dateString = `${year}. ${addLeadingZero(month)}. ${addLeadingZero(day)}. ${weekDay}요일`;
    $date.textContent = dateString;
  };

  let isInit = false;

  const handleClickTitleIcon = () => location.reload();

  this.render = () => {
    $header.innerHTML = `
      <div class="title">
        <div class="title-icon">
          <img src="./asset/icons/newsstand.svg" alt="뉴스스탠드" />
        </div>
        <div>뉴스스탠드</div>
      </div>
      <div class="date"></div>
    `;

    getDate();

    if (!isInit) {
      const $titleIcon = $header.querySelector('.title-icon');
      $titleIcon.addEventListener('click', handleClickTitleIcon);

      isInit = true;
    }
  };

  this.render();
}
