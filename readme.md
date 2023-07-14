## 📰 뉴스스탠드 구현 과제 - 2주차

## 🖥 화면

#### 1. 최신 뉴스 자동 롤링 영역

![무한 롤링 시연](https://github.com/jhyep/fe-newsstand/assets/80496795/31ba835b-aab4-4770-8df2-97a1ebdea259)

#### 2. 전체 언론사: 그리드 보기

https://github.com/jhyep/fe-newsstand/assets/80496795/876793f7-9553-4e93-b19a-b1c99fa062f4

#### 3. 전체 언론사: 리스트 보기

https://github.com/jhyep/fe-newsstand/assets/80496795/df0374d9-cabf-4e4d-bf44-136d2d4fb798

## 🗂 디렉토리 구조

```
fe-newsstand
├─ assets
│  ├─ dark
│  ├─ light
│  └─ others
├─ data
│  └─ newsContents.js
├─ icons
│  ├─ .DS_Store
│  ├─ darkmode_logo
│  ├─ others
│  └─ press_logo
├─ main-style.css
├─ main.html
├─ app.js
└─ src
   ├─ bringDate.js
   ├─ changeView.js
   ├─ initialDisplay.js
   ├─ listNews.js
   ├─ progressBar.js
   ├─ randomGrid.js
   └─ rollingBanner.js
```

## 📌 CSS 고려사항

- 재사용성을 위해 자주 사용되는 폰트 속성을 묶어서 사용하였습니다.

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

- 프로그레스바는 keyframe 애니메이션을 사용하여 구현하였습니다.

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

- 롤링 모션을 위해 transition을 사용하였습니다.
  (./src/rollingBanner.js에서 추가적인 구현 진행하였음)

```
.rollingbanner li.prev {
  top: 17px;
  transition: top 0.5s linear;
}
```

## 📌 JAVASCRIPT 모듈 설명

### 1. `bringDate.js - 날짜를 불러오는 모듈`

- 날짜를 가져올 때 0을 더해주는 함수를 추가하였습니다.

```
function addZero(date) {
  if (date < 10) {
    const zeroDate = ("00" + date).slice(-2);
    return zeroDate;
  }
  return date;
}
```

### 2. `changeView.js - 그리드뷰 <-> 리스트뷰 이동 모듈`

- 아래와 같이 style.display = "none" / "block"을 사용하여 구현하였습니다.

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

### 3. `initialDisplay.js - 초기화면 세팅 모듈`

- 마찬가지로 style.display = "none"을 사용하여 작성하였습니다.

### 4. `listNews.js - html에 리스트뷰 아티클을 추가해주는 모듈`

- html을 복잡하게 만들지 않기 위해 listNews.js에서 news-article 섹션을 그려주는 함수를 구현하였습니다.
- innerHTML을 조작하여 구현하였습니다.

### 5. `progressBar.js - 프로그레스바 관련 모듈`

- progress-bar 클래스를 제거하고, 더해주는 방식으로 구현하였습니다.
- 프로그레스바 구현 시 그리드 뷰에서 리스트 뷰로 돌아오면 처음으로 초기화 될 수 있도록 progressBar.js에 initializeProgress 함수를 구현하였습니다.

### 6. `randomGrid.js - 언론사 그리드 관련 모듈`

- Math.random()을 사용하여 언론사 사진을 셔플하였습니다.

```
const shuffle = () => Math.random() - 0.5;
let shuffled_presses = [...presses].sort(shuffle);
```

### 7. `rollingBanner.js - 무한 롤링 배너 관련 모듈`

- 무한 롤링 구현 시 prev, current, next와 같은 클래스를 제거하고, 더해주는 방식으로 구현하였습니다.
- 이벤트리스너를 추가하여 호버 시 멈춤을 구현하였습니다.

## 어려웠던 점 / 고민했던 점

- 무한 롤링 구현시 두가지 배너 사이에 1초 간격을 만들어내야했는데, setTimeout과 setInterval을 적절히 사용하여 구현하는 것이 어려웠습니다.

- 프로그레스바 구현 시 처음에만 바가 다 채워지지 않고 돌아가는 현상이 발생되어 원인을 찾는 것이 쉽지 않았습니다.

  - 초기 화면이 그리드뷰이기 때문에 그 동안에 interval의 시간이 지나가고 있어 해당 현상이 벌어졌던 것이었습니다. 이는 간단히 리스트뷰로 바꾸었을 때 프로그레스바를 작동시키는 방식으로 해결하였습니다.

- 프로그레스바 구현 시 카운트를 올릴 때 프로그레스바 애니메이션이 다시 생기게 하기 위해서 클래스 제거/추가문 사이에 void currentCategory.offsetWidth;라는 라인을 추가하였습니다.

  - 클래스 제거/추가만 해주면 브라우저는 아무런 변화가 없으므로 렌더링을 하지 않습니다. 따라서 해당 구문을 추가함에 따라 브라우저에 dom에 대한 정보(width)를 요청하면서 강제로 브라우저에게 일을 시키면 브라우저는 해당 구문으로 인해 계산을 진행하게 되고, 클래스를 지웠을 때의 로직 또한 바로 적용되게 됩니다.

- ESM을 처음 적용해보았는데, import/export를 쓰는 것이 생소했지만 외부에서 어떤 변수나 클래스, 함수를 사용할지 명시적으로 알려줄 수 있기 때문에 의존성 관리가 된다는 큰 장점이 있어 좋았습니다.

## 그룹 활동에서 배운 점

- 피어세션과 스쿼드세션을 거치며 설계의 중요성을 깨달았습니다. 좋은 설계로 인해 개발에 걸리는 시간이 크게 줄어들기도 하고, 기능 구현과 리팩토링을 쉽고 빠르게 할 수 있다는 것을 알게되었습니다.
- 다른 분들의 디렉토리 구조 구성 방식, 코드 작성 방식 등을 보며 클린 코드에 대한 많은 깨우침을 얻었습니다.

## 아쉬운 점 / 개선할 점

- 기능 구현에 급급해서 설계를 꼼꼼히 하지 못했습니다. 이로 인해서 기능 구현을 할 때 더 많은 시간이 걸렸으며, 앞으로 리팩토링에 더 많은 시간을 투자해야할 것으로 예상됩니다.

- 스크립트 파일과 css도 더 세분화하여 나눌 수 있었으나 시간 부족으로 인해 해당 부분까지는 진행하지 못하였습니다.
