## 📰 FE- NEWSSTAND

> **현대자동차그룹 소프티어부트캠프 2기 웹 프론트엔드 박지혜** </br> **- 바닐라 자바스크립트로 뉴스스탠드 구현하기**

## 📌 CSS 고려사항

- 재사용성을 위해 자주 사용되는 폰트 속성을 묶어서 사용

```
.font-init {
  color: var(--text-text-default, #5f6e76);
  font-family: Pretendard;
  font-style: normal;
}

.bold-font-init {
  color: var(--text-text-strong, #14212b);
  font-family: Pretendard;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
```

- 프로그레스바는 keyframe 애니메이션을 사용하여 구현

```.progress-bar {
  background: var(--progress-before);
  display: flex;
  width: 166px;
  height: 40px;
  padding: 0px 16px;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  flex-shrink: 0;
  color: white !important;
  position: relative;
  z-index: 2;
}

.progress-bar:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 40px;
  width: 0;
  background: var(--progress-after);
  animation: progress 20s linear;
  z-index: -1;
}

@keyframes progress {
  0% {
    width: 0px;
  }
  100% {
    width: 100%;
  }
}

```

- 롤링 모션을 위해 transition을 사용
  (./src/components/rollingBanner.js에서 추가적인 구현 진행하였음)

```
.rollingbanner li.prev {
  top: 17px;
  transition: top 0.5s linear;
}
```

- 다크 모드 구현을 위해 global.css에 var()를 사용하여 root와 dark를 나누어 색상 정의 (./src/changeView.js에서 추가적인 구현 진행하였음)

```
ex)

.dark {
  --text-strong: var(--gray-scale-white);
  --text-bold: var(--gray-scale-50);
  --text-default: var(--gray-scale-100);
  --text-weak: var(--gray-scale-white-alt);
}

:root {
  --text-strong: var(--gray-scale-black);
  --text-bold: var(--gray-scale-500);
  --text-default: var(--gray-scale-400);
  --text-weak: var(--gray-scale-200);
}
```

## 📌 JAVASCRIPT 모듈 설명

#### 1. `bringDate.js - 날짜를 불러오는 모듈`

- 날짜를 가져올 때 0을 더해주는 함수를 추가하였음

```
function addZero(date) {
  if (date < 10) {
    const zeroDate = ("00" + date).slice(-2);
    return zeroDate;
  }
  return date;
}
```

#### 2. `changeView.js - 뷰 변경 모듈`

- 아래와 같이 style.display = "none" / "block"을 사용하여 구현하였음

```
function changeToGridView() {
  document.getElementsByClassName("list-selected")[0].style.display = "none";
  document.getElementsByClassName("grid-selected")[0].style.display = "block";
  document.getElementsByClassName("press-list-section")[0].style.display =
    "none";
  document.getElementsByClassName("press-grid")[0].style.display = "block";
  grid_view_selected = true;
}
```

#### 3. `initialDisplay.js - 초기화면 세팅 모듈`

- 마찬가지로 style.display = "none"을 사용하여 작성하였음

### [Components directory]

#### 1. `gridView.js - 그리드 뷰를 그리는 모듈`

- ❗️ Observer Pattern 적용

```
import { setState, getState } from "../observer/observer.js";
import {
  isLight, gridPageIdx,isMySubView,
  subGridPageIdx, subscribedPress,
} from "../store/store.js";
```

- Math.random()을 사용하여 언론사 사진을 셔플하였음

```
const shuffle = () => Math.random() - 0.5;
let shuffled_presses = [...presses].sort(shuffle);
```

#### 2. `listNews.js - html에 리스트뷰 아티클을 추가해주는 모듈`

- html을 복잡하게 만들지 않기 위해 listNews.js에서 news-article 섹션을 그려주는 함수를 구현하였음
- innerHTML 조작 및 템플릿 리터럴을 사용하여 구현하였습니다.

#### 3. `progressBar.js - 프로그레스바 관련 모듈`

- progress-bar 클래스를 제거하고, 더해주는 방식으로 구현하였습니다.
- 프로그레스바 구현 시 그리드 뷰에서 리스트 뷰로 돌아오면 처음으로 초기화 될 수 있도록 progressBar.js에 initializeProgress 함수를 구현하였습니다.

#### 4. `subListNews.js - 내가 구독한 언론사 리스트뷰 관련 모듈`

- listNews.js의 구조와 거의 동일

#### 5. `subProgressBar.js - 내가 구독한 언론사 리스트뷰 프로그레스바 관련 모듈`

- progressBar.js의 구성와 거의 동일

#### 6. `rollingBanner.js - 무한 롤링 배너 관련 모듈`

- 무한 롤링 구현 시 prev, current, next와 같은 클래스를 제거하고, 더해주는 방식으로 구현하였습니다.
- 이벤트리스너를 추가하여 호버 시 멈춤을 구현하였습니다.

### [Observer directory & Store directory]

#### 1. `observer.js`

```
initState, getState, setState, subscribe, notify 함수 작성
```

#### 2. `subscriber.js - 구독을 한번에 처리해주는 모듈`

#### 3. `store.js - 디폴트 상태 세팅`

```
ex)
export const isLight = initState({
  key: "isLight",
  defaultState: true,
});
```

### [Util directory]

#### 1. `path.js - 전역으로 이미지 소스 관리`

#### 2. `utils.js `

- document.querySelector(element).style.display = display_style; 와 같이 긴 코드를 짧게 처리하였음
- classList remove, add도 유틸 함수로 작성하여 짧게 처리해주었습니다.

## 어려웠던 점 / 고민했던 점

- 무한 롤링 구현시 두가지 배너 사이에 1초 간격을 만들어내야했는데, setTimeout과 setInterval을 적절히 사용하여 구현하는 것이 어려웠습니다.

- 프로그레스바 구현 시 처음에만 바가 다 채워지지 않고 돌아가는 현상이 발생되어 원인을 찾는 것이 쉽지 않았습니다.

  - 초기 화면이 그리드뷰이기 때문에 그 동안에 interval의 시간이 지나가고 있어 해당 현상이 벌어졌던 것이었습니다. 이는 간단히 리스트뷰로 바꾸었을 때 프로그레스바를 작동시키는 방식으로 해결하였습니다.

- 프로그레스바 구현 시 카운트를 올릴 때 프로그레스바 애니메이션이 다시 생기게 하기 위해서 클래스 제거/추가문 사이에 void currentCategory.offsetWidth;라는 라인을 추가하였습니다.

  - 클래스 제거/추가만 해주면 브라우저는 아무런 변화가 없으므로 렌더링을 하지 않습니다. 따라서 해당 구문을 추가함에 따라 브라우저에 dom에 대한 정보(width)를 요청하면서 강제로 브라우저에게 일을 시키면 브라우저는 해당 구문으로 인해 계산을 진행하게 되고, 클래스를 지웠을 때의 로직 또한 바로 적용되게 됩니다.

- ESM을 처음 적용해보았는데, import/export를 쓰는 것이 생소했지만 외부에서 어떤 변수나 클래스, 함수를 사용할지 명시적으로 알려줄 수 있기 때문에 의존성 관리가 된다는 큰 장점이 있어 좋았습니다.

- fetch를 해오는 과정에서 사용되는 async와 await, promise, then의 이해가 어려웠습니다. 특히 배열을 처리하는 과정에서 promise pending 상태가 자주 발생하여 곤란했던 경험이 있습니다.

- 스토어라는 것을 처음 알게 되어 적용을 해보았습니다. '상태를 관리하는 데이터 저장소'라는 것이 생소했지만 컴포넌트들 간에 상태를 공유하고 업데이트 할 때 편리하게 처리할 수 있다는 장점이 있다는 것을 알게되었습니다.

## 그룹 활동에서 배운 점

- 피어세션과 스쿼드세션을 거치며 설계의 중요성을 깨달았습니다. 좋은 설계로 인해 개발에 걸리는 시간이 크게 줄어들기도 하고, 기능 구현과 리팩토링을 쉽고 빠르게 할 수 있다는 것을 알게되었습니다.
- 다른 분들의 디렉토리 구조 구성 방식, 코드 작성 방식 등을 보며 클린 코드에 대한 많은 깨우침을 얻었습니다.

## 아쉬운 점 / 개선할 점

- 기능 구현에 급급해서 설계를 꼼꼼히 하지 못했습니다. 이로 인해서 기능 구현을 할 때 더 많은 시간이 걸렸으며, 리팩토링에 많은 시간을 할애하여야 했습니다.

- 스크립트 파일과 css도 더 구조적으로 세분화하여 나눌 수 있었으나 시간 부족으로 인해 해당 부분은 진행하지 못하였습니다.

- 원래는 굳이 동적으로 리스트뷰의 카테고리를 추가할 필요가 없다고 생각해서
  main.html에 정적으로 카테고리를 넣어놓았었습니다. 옵저버 패턴 적용을 시도하면서 sub-press-list section을 지우고 하나의 press-list-section에서 일반 리스트뷰와 구독 리스트뷰를 관리하고자 하였으나, 카테고리를 동적으로 추가하니 쿼리 셀렉터로 카테고리 엘리먼트를 받아올 수가 없어서 원래 작성했던 프로그레스바 코드에 문제가 생기게 되었습니다.

- 리스트 뷰 하나에서만 timeout을 돌릴땐 문제가 없었는데, sub-list에서 같이 프로그레스바를 돌리니 많은 문제가 생겨났습니다. 클리어 타임아웃을 해주는 위치가 중요한데 setTimeout 함수에 대한 이해가 부족하다보니 이런 상황이 발생하였다고 생각합니다.

- 따라서 시간 안에 옵저버로의 리팩토링을 진행하지 못했고, 프로그레스바 작동에 지대한 문제가 발생하게 되었습니다. 리스트뷰에 완전한 옵저버를 적용하지 못해 많이 아쉽지만, 그리드뷰에서라도 옵저버 패턴을 적용해보며 해당 패턴에 대한 이해도를 높일 수 있어 의미있는 경험이었습니다.

## 앞으로의 계획

- 리스트뷰에 옵저버 패턴을 적용해보는 것을 꼭 성공시키고 싶고, 리액트와 타입스크립트로 짜면 어떻게 짤 수 있을지 탐구해보고 싶습니다.

- 코드 리뷰 때 받은 피드백을 적용하고 싶습니다.
