const setProgressed = () => {
  // 모든 category_item 요소를 가져옵니다.
  var categoryItems = document.querySelectorAll('.category_item');

  // progressed 클래스가 추가되거나 변경될 때마다 실행될 함수입니다.
  function updateProgressBar() {
  // 현재 progressed 클래스를 가진 요소를 찾습니다.
  var progressed = document.querySelector('.category_item.progressed');

  // progress_bar를 찾습니다.
  var progressBar = document.querySelector('.progress_bar');

  // progressed가 없거나 progressBar가 없으면 함수를 종료합니다.
  if (!progressed || !progressBar) return;

  // progressed의 위치를 가져옵니다.
  var rect = progressed.getBoundingClientRect();

  // progressBar의 위치를 progressed의 위치에 맞춥니다.
  progressBar.style.position = 'absolute';
  progressBar.style.top = rect.top + 'px';  // top 위치 조정
  progressBar.style.left = rect.left + 'px';  // left 위치 조정

  // 필요하다면 right, bottom도 조정할 수 있습니다.
  }

  // 모든 category_item에 대해 클릭 이벤트 리스너를 추가합니다.
  // 클릭 시 progressed 클래스를 추가/제거하고, progress_bar의 위치를 업데이트합니다.
  for (var i = 0; i < categoryItems.length; i++) {
  categoryItems[i].addEventListener('click', function(event) {
    // 모든 category_item에서 progressed를 제거합니다.
    for (var j = 0; j < categoryItems.length; j++) {
      categoryItems[j].classList.remove('progressed');
    }

    // 클릭된 요소에 progressed를 추가합니다.
    event.currentTarget.classList.add('progressed');

    // progress_bar의 위치를 업데이트합니다.
    updateProgressBar();
  });
  }

}


const listViewInit = () => {
  setProgressed();
}

export default listViewInit;