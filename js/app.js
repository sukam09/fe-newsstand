import { date } from './header/date.js';
import { initNewsStandGrid } from './main/newsstnadGrid.js';
import { initSubView } from './main/rollingSubView.js';
//import { initEvent } from './events.js';
import { initNewsStandList } from './main/newsstandList.js';
import { initNavEvent } from './navigateEvent.js';
import { initNewsTabEvent } from './newsTabEvent.js';

// 기능
headerRender();
mainRender();
//initEvent();
initNewsTabEvent();
function headerRender() {
  date();
}

function mainRender() {
  initNewsStandGrid();
  initNewsStandList();
  initSubView();
  initNavEvent('전체언론_그리드_인덱스');
}

//탭을 누르면

// 처음부터 다시 그려짐
// 그리드
// 뉴스스탠드 리스트

// 전체 or 내가 구독한 언런사 누르면
// 처음부터 다시 그려짐
// 그리드
// 리스트
