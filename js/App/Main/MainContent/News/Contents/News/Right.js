/* 
리스트 뉴스 컨테이너 컴포넌트
*/

export default function Right($target, props) {
  this.state = "light";

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const $div = document.createElement("div");
    const $ul = document.createElement("ul");

    $div.setAttribute("class", "sub-news");

    $ul.innerHTML = `
    <li>"위스키 사려고 이틀전부터 줄 섰어요"</li>
    <li>'방시혁 제국'이냐 '카카오 왕국'이냐…K엔터 누가 거머쥘까</li>
    <li>사용후핵연료 저장시설 포화…이대론 7년 뒤 원전 멈춘다</li>
    <li>[단독] 원희룡 "해외건설 근로자 소득공제 월 500만원으로 상향할 것"</li>
    <li>태평양에는 우영우의 고래만 있는게 아니었다 [로비의 그림]</li>
    <li>LG엔솔, 폴란드 자동차산업협회 가입…“유럽서 목소리 키운다”</li>
    <li class="caption">서울경제 언론사에서 직접 편집한 뉴스입니다.</li>
    `;
    $div.appendChild($ul);
    $target.appendChild($div);
  };

  this.render();
}
