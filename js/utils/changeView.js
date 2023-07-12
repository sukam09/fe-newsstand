const grid_view = `
    <div class="grid-view">
              <button id="left-btn">
                <img id="left" src="../assets/icons/left-btn.svg" />
              </button>
              <div class="main-list">
                <ul class="main-list-ul"></ul>
              </div>
              <button id="right-btn">
                <img id="right" src="../assets/icons/right-btn.svg" />
              </button>
            </div>
    `;

const list_view = `<div class="list-view">
<button id="left-btn">
  <img id="left" src="../assets/icons/left-btn.svg" />
</button>
<div class="main-list">
  
  <div
  class="field-tab">
  <ul>
    <li><div>
    종합/경제
  </div></li>
  <li><div>
    방송/통신
  </div></li>
  <li><div>
    IT
  </div></li>
  <li><div>
   영자지
  </div></li>
  <li><div>
    스포츠/연예
  </div></li>
  <li><div>
    매거진/전문지
  </div></li>
  <li><div>
    지역
  </div></li>
</ul>
</div>

<div class="press-news">
<div class="press-info"><img id = "press-logo" alt="press-logo" src="../assets/images/logo/light/img96.svg"/>
  <span class="edit-date">2023.07.12 16:52 편집</span>
  <button id = "subscribe"><img src="../assets/icons/plus.svg"/><span>구독하기<span></button>
</div>
<div class = "news-content">
  <div class="main-news">
    <img src="https://picsum.photos/320/200" alt="thumbnail"/>
    <p class="thumbnail-title">또 국민연금의 몽니…현대百 지주사 불발</p>
  </div>
  <div class = "sub-news">
    <ul class = "sub-news-ul">
      <li>
      위스키 사려고 이틀 전부터 줄 섰어요
    </li>
    <li>
    '방시혁 제국'이냐 '카카오 왕국'이냐…K엔터 누가 거머쥘까
    </li>
    <li>
    사용후핵연료 저장시설 포화…이대론 7년 뒤 원전 멈춘다
    </li>
    <li>
    [단독] 원희룡 "해외건설 근로자 소득공제 월 500만원으로 상향할 것"
    </li>
    <li>
    태평양에는 우영우의 고래만 있는게 아니었다 [로비의 그림]
    </li>
    <li>
    LG엔솔, 폴란드 자동차산업협회 가입…“유럽서 목소리 키운다”
    </li>
    <li id="caption">
     서울경제 언론사에서 직접 편집한 뉴스입니다.
    </li>
  </ul>
   
  </div>
</div>
</div>


</div>


<button id="right-btn">
  <img id="right" src="../assets/icons/right-btn.svg" />
</div>
</button>
</div>
`;
export function changeView(target) {
  const view_content = document.querySelector(".view-content");

  const grid_btn = document.getElementById("grid-btn");
  const list_btn = document.getElementById("list-btn");
  if (target === "grid") {
    view_content.innerHTML = grid_view;
    grid_btn.src = "../assets/icons/grid-view-clicked.svg";
    list_btn.src = "../assets/icons/list-view.svg";
  } else {
    view_content.innerHTML = list_view;
    grid_btn.src = "../assets/icons/grid-view.svg";
    list_btn.src = "../assets/icons/list-view-clicked.svg";
  }
}
