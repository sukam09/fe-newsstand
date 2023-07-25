/**
 뉴스스탠드 로고 클릭하면 새로고침
 */
function handleClickLogo() {
  const $logo = document.querySelector('.title-icon');
  $logo.addEventListener('click', function () { location.reload() });
}

export default handleClickLogo;