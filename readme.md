# 📰 fe-newsstand

> **현대자동차그룹 소프티어부트캠프 2기** <br/> **개발기간: 2023.07.06 ~ 2023.07.28**

<br />

## ⛓ 레이아웃 구조

```bash

news_stand__container
│
├── header__wrapper
│
├── latest_news__wrapper
│     ├── latest_news__wrapper-left
│     └── latest_news__wrapper-right
│
├── press__wrapper
│     ├── press__header
│     ├── arrows__wrapper-grid
│     └── arrows__wrapper-list
│
├── snack-bar
└── alert

```

<br />

## ✂️ 파일 구조

### news-stand-header

```js
initNewsStandHeader() : 뉴스스탠드 헤더의 설정
setHeader() : 뉴스스탠드 헤더의 동적 생성 (템플릿 리터럴)

setHeaderButton() : 뉴스스탠드 로고의 이벤트 설정 (리로드)

getHeaderTime() : 뉴스스탠드 헤더의 시간 포멧 반환
setHeaderTime(dataFormat) : 뉴스스탠드 헤더의 시간 설정
```

### latest-news

```js
initLatestNews() : 최신 뉴스 롤링 설정 (async)
divideNews(latestNews, side) : 최신 뉴스 나누기 (왼쪽 / 오른쪽)
setNews(latestNews, side) : 최신 뉴스 롤링 생성

getWrapper(side) : 해당 side의 Wrapper 반환
setWrapper(latestNews, side) : 최신 뉴스 롤링의 동적 생성 (템플릿 리터럴)
setWrapperElement(newsWrapper, news) : 최신 뉴스 롤링의 반복 Element 생성

setHover(side) : 최신 뉴스 롤링 Hover 이벤트 설정
setHoverOver(side) : 최신 뉴스 롤링 정지
setHoverOut() : 최신 뉴스 롤링 시작

setRolling(side) : 최신 뉴스의 롤링 시작
setRollingName(side) : 최신 뉴스의 롤링 설정
setRollingPrev(side) : 이전 뉴스 설정
setRollingCurrent(side) : 현재 뉴스 설정
setRollingNext(side) : 다음 뉴스 설정

setInterval(side) : Interval 설정 함수
setRolling(side) : 최신 뉴스 롤링의 1초 차이설정
```

### light-dark-mode

```js
initLightDarkMode() : 라이트/다크모드 설정
setMode() : 라이트/다크모드 생성

toggleMode() : 라이트/다크모드 변경
changeStyle() : 라이트/다크모드 CSS 변경
changeIcon() : 라이트/다크모드 Icon 변경
```

### press-header

```js
initPressHeader() : 언론사 헤더 설정 (async)
setNav(pressElement) : 언론사 헤더의 동적 생성 (템플릿 리터럴)
getNavLeft() : 언론사 헤더의 왼쪽 Element 생성
getNavLRight() : 언론사 헤더의 오른쪽 Element 생성

setNavClick(pressData) : 언론사 헤더 이벤트 설정
entireEvent(pressData) : 전체 언론사 헤더 이벤트 설정
subscribeEvent(pressData) : 구독 언론사 헤더 이벤트 설정
listEvent(pressData) : 리스트 보기 헤더 이벤트 설정
gridEvent(pressData) : 그리드 보기 헤더 이벤트 설정
```

### press-grid

```js
initPressGrid(pressData, pressList) : 언론사 그리드 설정
setGrid() : 언론사 그리드의 동적 생성 (템플릿 리터럴)
setGridFrame() : 언론사 그리드의 Frame 생성

setGridArrow(pressData, pressIds) : 언론사 그리드의 화살표 이벤트 설정
setGridArrowNone(pressIds) : 언론사 그리드의 화살표 NONE 처리

setGridLogo(pressData, pressIds) : 언론사 로고의 설정
getGridLogo(pressData, pressIds) : 언론사 로고의 반환

changeIcon() : 언론사 아이콘의 라이트/다크모드 이벤트 처리
toggleMode() : 언론사 아이콘의 라이트/다크모드 경로 변경
changeSrc(logo) : 언론사 아이콘의 경로(라이트/다크모드) 반환

setGridButton(pressData, pressIds) : 언론사 그리드의 구독하기 버튼 설정
getSubscribeState(li) : 해당 언론사의 구독 상태 반환
setGridButtonChange(isSubscribe, li) : 구독하기/해지하기 버튼 변경
setGridButtonHover(li) : 그리드 호버 이벤트 설정
setGridButtonClick(pressData, pressIds, li) : 그리드 클릭 이벤트 설정
setSubscribe(pressData, pressIds, pressName, isSubscribe) : 알림창/스낵바 설정
```

<br />

## 🗂 폴더 구조

[🔗 Front-end 개발 프로젝트 폴더 구조](https://sennieworld.tistory.com/67)

```bash

/src
│
├── /assets
│     ├── /data
│     │    ├── latest-news.json
│     │    └── press-news.json
│     ├── /fonts
│     ├── /icons
│     └── /images
│          ├── /dark-press-logo
│          ├── /light-press-logo
│          └── /main-press
│
├── /components
│     ├── latest-news.js
│     ├── light-dark-mode.js
│     ├── news-stand-header.js
│     ├── press-grid.js
│     ├── press-header.js
│     └── press-list.js
│
├── /constants
│     ├── latest-news.js
│     ├── light-dark-mode.js
│     ├── news-stand-header.js
│     ├── press-data.js
│     ├── press-grid.js
│     ├── press-header.js
│     └── press-list.js
│
├── /styles
│     ├── /components
│     │     ├── latest-news.css
│     │     ├── light-dark-mode.css
│     │     ├── news-stand-header.css
│     │     ├── press-grid.css
│     │     ├── press-header.css
│     │     └── press-list.css
│     │
│     ├── dark.css
│     ├── design.css
│     ├── global.css
│     ├── light.css
│     └── reset.css
│
├── /utils
│     ├── fetch.js
│     ├── popup.js
│     └── shuffle.js
│
├── index.html
└── index.js
```

<br />

## #1 프로그래밍 요구사항

- [x] DOM, Event 를 활용한다.
- [x] 의미에 맞는 태그를 사용한다. 단순히 wrapping하는 역할은 div를 사용해도 좋다.
- [x] DOM 조작과정에서 template literal 문법을 반드시 사용한다.
- [x] DOM 조작과정에서 createElement, appendChild , insertBefore 등의 다양한 DOM APIs 를 활용해본다.
- [x] addEventListener 를 사용한 이벤트 처리를 한다.
- [x] 데이터는 json형태의 객체리터럴을 만들고, 객체 데이터를 접근해서 사용한다.

## #2 프로그래밍 요구사항

- [x] 개발 feature를 GitHub issue에 관리한다.
- [x] 가급적 Class 와 같은 객체 형태를 지양하고 함수단위로만 개발해본다.
- [x] 함수는 하나의 역할을 한다.
- [x] 함수의 이름은 동사 + 명사로 짓는다.
- [x] 객체별로 별도 파일의 모듈을 나누고 ES Modules에 따라 import/export 사용해서 의존성 관리
- [x] JavaScript로 CSS속성을 제어하면서 자유롭게 구현한다.
- [ ] querySelector API를 활용하지 않고, 직접 구현한다.

## #3 프로그래밍 요구사항

- [x] feature 개발이 끝나면 dev 브랜치로 머지한다.
- [x] fetch API 요청시 then, async/await를 활용한다.
- [ ] store 레이어를 별도로 만들어서 view와 역할을 분리한다.
- [ ] store 영역은 ES Classes 문법을 사용한다.
- [ ] Store 와 View의 관계를 느슨하게 하는 방법을 고민해서 구현해본다.
- [ ] 기존에 개발한 구독하기/해지하기 기능에 대해서 store/view 를 분리한다.
- [ ] 여러가지 방법이나 패턴을 찾아보고 이를 실험해보자.
- [ ] Promise 객체를 만들어본다.

<br />

## 프로그래밍 설계 🛠

### ✅ 1P 기본 화면

- [x] 기본 상단 영역
- 뉴스스탠드 로고를 클릭하면 새로고침 `setNewsStandHeader()`
- 오른쪽에는 시스템 날짜를 표시 `setHeaderTime()`
- [x] 최신 뉴스 자동롤링 영역
- [x] 언론사별 기사를 확인하는 영역
- 전체 언론사의 그리드가 기본상태

### ✅ 2P 최신 뉴스 자동 롤링

- [x] 최신 뉴스의 헤드라인 5개가 5초마다 자동으로 무한 롤링 CSS
- 각각 다른 최신 뉴스의 헤드라인 5개가 5초마다 자동으로 롤링되도록
- 좌우 영역의 시간차를 1초로 설정
- 두 영역의 뉴스가 동시에 롤링되지 않도록 한다.
- [x] 호버를 했을 때, 애니메이션을 숨긴채로 돌아가도록 설정해서 시간차를 1초로 고정
- [x] 마우스 호버시, 무한 롤링을 일시정지하고 헤드라인에 밑줄을 표시
- [x] 호버시 일시정지하는 함수를 Left / Right 통합하기

### ✅ 3P 전체 언론사

- [x] 그리드에 6\*4 테이블이 들어가도록 한다.
- 각 테이블의 셀에는 언론사 브랜드 마크가 중앙에 배치하도록 한다.
- 언론사 브랜드 마크의 순서는 랜덤으로 배치되도록 한다.
- [x] 그리드의 좌우에는 화살표를 배치하여 넘길 수 있도록 한다.
- 가장 첫 페이지와 가장 끝 페이지에서 Disabled 되는 화살표는 표시하지 않도록 한다.
- [x] 페이지는 4페이지까지만 표시되도록 수정

### ✅ 4P 전체 언론사

- [x] 각 언론사 브랜드마크가 있는 셀에 마우스를 올리면 [구독하기]버튼이 보이도록 한다.
- 이미 구독하는 있는 언론사의 경우 [해지하기]버튼이 보이도록 한다.
- 8, 10페이지 참고

### ✅ 5P 리스트 보기

- [x] 각 분야 카테고리에서 언론사의 기사를 확인할 수 있도록 개발
- [x] category-news, total-press의 json 파일 통합 필요

### ✅ 6P 리스트 보기

- [x] 해당 카테고리에 속해있는 언론사의 갯수, 현재 언론사의 순서 표시
- 언론사의 순서는 화면이 새로고침 될 때마다 랜덤으로 설정
- [x] 랜덤으로 설정하는 함수는 grid, list에서 둘다 쓰이니 util로 따로 빼기
- [x] 현재 순서의 언론사 내용을 표시
- 20초 간 화면이 보여지고, 프로그래스바가 초마다 색이 차오르도록 애니메이션 적용
- 20초가 되면 다음 언론사의 내용이 나타나도록 한다.
- [x] 다음 언론사의 내용이 나타나는 함수도 카테고리 클릭, 버튼 클릭, 20초 후에 변경에서 사용되니 util로 따로 빼기

### ✅ 7P 리스트 보기

- [x] 카테고리의 마지막 언론사가 20초 보여진 후에는, 다음 카테고리로 넘어가도록
- [x] 가장 마지막 카테고리의 마지막 언론사가 보여진 후에는 처음 카테고리로 돌아오도록
- [x] 판단하는 함수는 따로 빼기
- [x] 좌우의 화살표를 통해서 이전, 다음 언론사로 넘어갈 수 있도록
- [x] 이전언론사, 다음언론사 함수를 따로 빼기

### ✅ 8P 리스트 보기

- [x] 카테고리에 마우스를 올리면 밑줄이 생기도록
- 카테고리를 누르면 해당 카테고리로 이동한다.
- [x] 언론사 기사 영역에는 아래 요소들이 들어가도록
- [x] 메인 뉴스에 마우스를 올리면, 썸네일이 5% 확대됨
- [x] 뉴스 타이틀에는 밑줄이 생기도록
- [x] 각 서브 뉴스 타이틀도 마우스를 올리면 밑줄이 생기도록 한다.
- [x] [구독하기] 버튼을 누르면, '내가 구독한 언론사에 추가되었습니다.'라는 스낵바 유지
- 스낵바는 5초간 유지한다.
- 5초 후에는 즉시 내가 구독한 언론사 탭의 리스트 보기 화면으로 이동하도록 한다.
- [x] 구독하기 데이터를 한 파일에서 관리하기 ! 중요

### ✅ 9P 리스트 보기

- [x] 내가 구독한 언론사의 리스트 보기 화면
- [x] 전체 언론사의 리스트 보기 화면과 동일함
- [x] 카테고리들이 나열되어있던 가로 탭에 언론사의 이름과 > 화살표 아이콘이 보이도록 변경
- [x] 언론사가 많아서 탭의 가로 영역을 넘어가는 경우, 드래그를 통해 가로 스크롤이 되도록 한다.
- [x] 언론사는 구독한 순서대로 배치되도록 한다. ‼️
- [x] 전체 언론사 탭 상태에서는 그리드 보기가 기본인 것처럼, 내가 구독한 언론사 탭 상태에서는 리스트 보기가 기본이다. ‼️

### ✅ 10P 리스트 보기

- [x] [구독해지]버튼을 누르면 "{언론사 이름}"을 구독해지하시겠습니까? 아는 alert이 뜨도록 한다.
- [x] 각 버튼에도 마우스를 올리면 텍스트에 밑줄이 생기도록 한다.
- [x] 마우스를 올리면 텍스트에 밑줄이 생기는 함수를 util로 따로 빼기
- [x] '예, 해지합니다' 선택하면 즉시 구독이 해지되고, 목록의 다음 순서 언론사가 바로 나타나도록 한다.

### ✅ 11P 그리드 보기

- [x] 내가 구독한 언론사의 그리드 보기 화면은 '전체 언론사의 그리드 보기' 화면과 동일하다
- 사용자가 구독을 누른 언론사의 브랜드마크만 보이고, 나머지 칸은 비어있도록 한다.
- [x] 넘어가는 화살표가 안보여야 한다. 이것도 따로 함수로 만들면 좋을 듯
- [x] 구독중인 언론사의 브랜드마크 셀에 마우스를 올리면 [구독해지] 버튼이 나타난다.
- 리스트보기 상태에서 구독해지를 하는 것과 동일하게, alert이 뜨도록한다.
- [x] 리스트 보기와 마찬가지롤 재사용 함수로 만들면 좋을 듯
- [x] 구독이 해지되는 즉시 그리드에서 해당 언론사의 브랜드마크가 사라지도록 한다.

### ✅ 12P 다크모드

- [x] Foundation의 컬러 팔레트 정보를 활용해 다크모드 테마를 자율적으로 만들어보자.
- [x] 다크모드로 전환 시, 로고들도 다크 모드 버전으로 일관 전환되어야한다.
- [x] 다크모드 버튼을 원하는 곳에 배치해본다.
- [x] 다크모드를 고려해서 isLightMode를 사용할지, json파일을 좀 통합해야할지 찾아보면 좋을듯.

### ✅ 전체적으로 해야할 일

- [x] 수업자료 꼼꼼히 살펴보고 정리해보기
- [x] 전체적인 리팩토링 진행하기
- [x] 다크모드 구현에 대해서 고민해보기
- [x] Commit 단위를 더 세세하기 쪼개보기
- [x] GitHub Issues 사용하기
- [x] 함수 분리, 네이밍 고민 많이하기
