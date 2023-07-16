# 설계

- 2주차부터는 리액트 컴포넌트 방식을 도입하여 state가 바뀌면 리렌더링이 일어나는 식으로 구현했습니다.
- 현재 전체 언론사 그리드뷰를 제외하고 data fetch는 이루어지지 않습니다. 임시로 mock data를 App 컴포넌트로부터 주입하거나 해당 컴포넌트에 직접 선언하여 사용했습니다.

## 리액트 컴포넌트 방식 설명

### 변수

- `$target`: 해당 컴포넌트가 추가될 DOM 노드를 가리킵니다.
- `initialState`: 해당 컴포넌트의 초기 상태를 의미합니다. 구조 분해 할당을 위해서 object로 선언합니다.
- `this.state`: 해당 컴포넌트의 모든 state 변수를 담고 있습니다. 리액트의 `useState()`에 대응합니다. 마찬가지로 구조 분해 할당과 spread operator와 같은 편리한 사용을 위해 객체로 선언합니다.
- `this.nonState`: 해당 컴포넌트가 가진 인스턴스 변수이며 state가 아니기 때문에 렌더링에는 관여하지 않습니다. 리액트의 `useRef()`에 대응합니다.

### 메소드

- `this.state = initialState`: 해당 컴포넌트가 최초 렌더링될 때 초기 상태를 세팅해줍니다. 리액트의 `useState(initialValue)`에 대응합니다.
- `this.setState()`: 해당 컴포넌트의 state를 바꿀 때 사용합니다. 해당 함수에 this.render 함수가 선언되어 있기 때문에 리렌더링이 같이 일어납니다. 리액트의 `setState()`에 대응합니다.
- `this.render()`: 해당 컴포넌트가 최초 선언될 때와 state가 변경될 때 리렌더링을 일으킵니다. 클래스형 컴포넌트 방식을 쓰는 구 리액트의 `render()`에 대응합니다.

## 컴포넌트 구조

<img width="1048" alt="Header js" src="https://github.com/softeerbootcamp-2nd/fe-newsstand/assets/26896018/2e515140-a116-4b4e-a8d1-46b1322c674d">

## 컴포넌트 설명

- `main.js`: index.html에서 app 클래스에 접근하게 해주는 entry point이며 해당 main 태그와 script 태그를 제외한 모든 DOM 조작은 컴포넌트에서 이루어집니다. 따라서 body 태그에는 이 둘밖에 없습니다.
- `App.js`: 메인 화면을 구성하는 컴포넌트입니다. `Header.js`, `AutoRollingNews.js`, `PressTab.js`, `PressGridView.js`, `PressListView.js`를 불러와서 렌더링합니다.
- `Header.js`: 뉴스스탠드 아이콘과 제목, 오늘 날짜를 렌더딩합니다.
- `AutoRolling.js`: 무한 자동 롤링 뉴스 배너를 렌더링하며 하위 컴포넌트인 `Headline.js`에 타이머를 세팅해주는 역할 또한 담당합니다.
  - `Headline.js`: 좌우 롤링 뉴스 배너 각각을 렌더링하는 컴포넌트이며, 컴포넌트로 설계한 덕분에 `Headline.js` 컴포넌트만 가지고 롤링 뉴스에 들어갈 내용과 타이머만 상위 컴포넌트에서 세팅해 주면 손쉽게 구현이 가능합니다.
- `PressTab.js`: 전체 언론사/내가 구독한 언론사를 선택할 수 있는 탭이 있고(현재는 동작하지 않습니다), 그리드뷰/리스트뷰를 선택할 수 있는 아이콘이 있는 컴포넌트입니다. 그리드뷰/리스트뷰 아이콘을 클릭하면 어떤 아이콘을 클릭했는지를 나타내는 문자열이 `App.js`로 전송되어 App 컴포넌트의 리렌더링이 일어나게 되어 메인 화면 하단의 뷰 타입이 바뀌고 동시에 PressTab 컴포넌트의 리렌더링 또한 일어나서 선택한 아이콘의 색깔이 바뀌게 됩니다.
- `PressGridView.js`: 전체 언론사 탭의 그리드 뷰를 렌더링하는 컴포넌트입니다. `press-info.json`을 fetch API를 통해 받아와서 `shuffleArray()`를 통해 섞어준 다음 페이지에 맞게 뿌려주는 역할을 합니다.
- `PressListView.js`: 전체 언론사 탭의 리스트 뷰를 렌더링하는 컴포넌트입니다. 다음과 같은 변수를 가지고 있습니다.
  - state
    - `index`: 현재 보고 있는 카테고리의 인덱스입니다.
    - `present`: 현재 보고 있는 언론사의 순서입니다.
    - `entire`: 현재 보고 있는 카테고리의 전체 언론사 수이며 원래는 카테고리별로 달라야 하지만 현재는 고정값을 사용하고 있습니다.
    - `categories`: 카테고리 이름을 순서대로 담고 있는 배열입니다.
  - non-state
    - `timer`: 프로그레스바를 16.66ms마다 조절하는 역할을 하는 `setInterval()`의 timer ID입니다. 다음 카테고리로 넘어갈 때 타이머를 초기화할 때 사용됩니다.
    - `$currentButton`: 현재 선택된 카테고리 버튼을 저장해 두어 프로그레스 바의 위치가 바뀔 때 이전 버튼을 초기화하기 위해 사용되는 DOM 노드 변수입니다.
    - `percentage`: 현재 프로그레스 바가 100% 대비 몇 %에 위치한지를 나타내는 변수로 프로그레스 바의 초기화 및 생성과 프로그레스 바의 진행이 각각 다른 함수(`initProgressBar()`, `setProgressBar()`)에서 일어나므로 두 함수 사이에서 변수를 공유하고자 `this` 키워드를 이용해서 선언했습니다.

# 데모 영상

[뉴스스탠드 2주차 데모 영상](https://www.youtube.com/watch?v=6SibOmpjpzE)

# 개발

## 리팩토링

- [x] 함수형 컴포넌트로 리팩토링 하기
- [x] 좌우 헤드라인 타이머 분리하기
- [x] 컴포넌트 파일 별도의 폴더로 분리하기
- [x] css 파일 별도의 폴더로 분리하기
- [x] 상수 별도의 폴더로 분리하기
- [x] 컴포넌트명 Figma와 일치하도록 변경
- [x] +, /, 화살표 등의 심볼 이미지를 모두 svg로 변경
- [x] 바뀌어도 리렌더링이 일어나지 않는 모든 변수들을 state로부터 분리
- [x] PressTab 컴포넌트에서 viewType state를 바꾸는 부분을 상위 컴포넌트인 App 컴포넌트에 위임하고 App 컴포넌트에서 App, PressTab 컴포넌트의 viewType state를 모두 관리하게끔 변경

## 구현

- [x] 최신 뉴스 헤드라인 5초마다 무한 롤링되게 하기
- [x] 좌우 영역 시간차 1초로 하기
- [x] 무한 롤링에 제목이 위로 넘어가는 애니메이션 적용하기
- [x] 마우스 호버할 시 헤드라인에 밑줄 표시하기
- [x] 마우스 호버할 시 무한롤링 일시정지하고 해당 영역을 벗어날 경우 무한롤링 재개하기
- [x] 좌우 헤드라인 중 하나를 멈췄다가 다시 롤링할 때도 좌우 시간차가 1초가 나게끔 구현하기
- [x] 전체 언론사 리스트뷰 레이아웃 만들기
- [x] 전체 언론사의 각 분야 카테고리에서 언론사의 기사 확인할 수 있게 하기
- [x] 선택된 카테고리 언론사 개수와 순서 표시하기
- [x] 언론사 카테고리 프로그레스 바 구현하기
- [x] 언론사 카테고리 프로그레스 바가 꽉차면(20초) 다음 언론사로 넘어가기
- [x] 카테고리의 마지막 언론사가 20초 보여진 후에 다음 카테고리로 넘어가기
- [x] 위 상황에서 만약 마지막 카테고리인 경우 처음 카테고리로 이동하기
- [x] 좌우 화살표 통해 언론사 이동하기

# 폴더 구조

```
fe-newsstand
├─ data
│  └─ press-info.json
├─ index.html
├─ readme.md
├─ src
│  ├─ app.js
│  ├─ components
│  │  ├─ AutoRollingNews.js
│  │  ├─ Header.js
│  │  ├─ Headline.js
│  │  ├─ PressGridview.js
│  │  ├─ PressListView.js
│  │  └─ PressTab.js
│  ├─ constants.js
│  ├─ main.js
│  └─ utils.js
└─ styles
   ├─ reset.css
   └─ style.css

```
