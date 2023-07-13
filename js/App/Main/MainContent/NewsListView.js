/*
기사 컨텐츠 컴포넌트
카테고리 변경시 MainContents의 lastPage변경
*/

import CategoryNav from "./NewsListView/CategoryNav.js";
import Contents from "./NewsListView/Contents.js";

let subTitles = [
  `"위스키 사려고 이틀전부터 줄 섰어요"`,
  `'방시혁 제국'이냐 '카카오 왕국'이냐…K엔터 누가 거머쥘까`,
  `사용후핵연료 저장시설 포화…이대론 7년 뒤 원전 멈춘다`,
  `[단독] 원희룡 "해외건설 근로자 소득공제 월 500만원으로 상향할 것"`,
  `태평양에는 우영우의 고래만 있는게 아니었다 [로비의 그림]`,
  `LG엔솔, 폴란드 자동차산업협회 가입…“유럽서 목소리 키운다”`,
];

const editDate = "2023.02.10 18:27 편집";

export default function NewsListView($target, props) {
  const categoryNavProps = {
    pressType: props.pressType,
    currentPage: props.currentPage,
    lastPage: props.lastPage,
    category: props.category,
    setContentState: props.setContentState,
    timerArr: props.timerArr,
  };

  const contentsProps = {
    headerData: {
      pressLogo: `./assets/newspaper/${props.mode}/${
        props.indexArr[props.currentPage - 1] + 1
      }.png`,
      editDate: editDate,
    },
    newsData: {
      mainNewsData: {
        mainThumbnail: "https://picsum.photos/320/200",
        mainNewsTitle: `또 국민연금의 몽니…현대百 지주사 불발 ${
          props.indexArr[props.currentPage - 1]
        }`,
      },
      subNewsData: {
        subTitles: subTitles,
        press: "서울경제",
      },
    },
  };

  this.render = () => {
    let $div = document.querySelector(".news-container");

    if ($div) {
      $target.removeChild($div);
    }

    $div = document.createElement("div");
    $div.setAttribute("class", "news-container");

    new CategoryNav($div, categoryNavProps);
    new Contents($div, contentsProps);

    $target.innerHtml = "";
    $target.appendChild($div);
  };

  this.render();
}
