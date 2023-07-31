# 설계

- 구독하기/해지하기 액션에만 옵저버 패턴을 적용
  - 옵저버 패턴을 적용하기 위해 별도의 파일을 만들지 않고 이미 구현한 store에 notify 로직만 추가해서 구현
- 전역 상태관리(store)의 사용을 최대한 줄이고 웬만한 모든 로직은 props를 통해 구현
- 구독 버튼, 스낵바, 알럿을 컴포넌트로 만들어서 재사용성을 극대화
- 전체 언론사 탭/내가 구독한 언론사 탭을 별도의 컴포넌트로 만드는 대신 예외처리를 통해 이미 존재하는 그리드뷰/리스트뷰 컴포넌트를 재활용

# 개발

## 리팩토링

- store.js 안에 있는 dispatch 함수에 nofity 함수를 등록하여 옵저버 패턴 구현
- PressGridView.js, PressListView.js에서 store.subscribe를 통해 구독해지 action이 일어났을 때 실행한 렌더 함수 구독
- 각 컴포넌트에서 fetch하지 않고 App.js에서 필요한 모든 데이터를 한번만 fetch해서 props로 내려주도록 구현 방식 변경
- store에 pid, pressName이 객체 형태로 같이 보관하게끔 변경
- store에 pid가 number 형태로 들어가게 변경

## 기능 구현

- 구독 버튼, 스낵바, 알럿 창 구현
- 구독하기 버튼을 누르면 해지하기로 스타일 바뀌도록 구현
- 구독하기 버튼 누르면 5초간 스낵바가 뜨게끔 구현
- 리스트뷰에서 구독하기 버튼 누르면 5초 뒤에 내가 구독한 언론사 탭으로 이동하게 구현
- 구독해지 버튼 누르면 알럿 뜨게 구현
  - 알럿에서 아니오 누르면 창이 닫히게 구현
  - 알럿에서 예 누르면 해당 언론사 구독해지되게 구현
- 그리드뷰에서 구독해지하여 현재 페이지가 전체 페이지 수보다 커졌을 때 현재 페이지를 하나 줄게끔 구현
- 내가 구독한 언론사가 없다면 내가 구독한 언론사 탭으로 넘어가지 못하게 구현
- 내가 구독한 언론사 탭에서 구독해지하여 내가 구독한 언론사가 하나도 없어지면 전체 언론사 탭으로 이동하게 구현

# Store & 옵저버 패턴

- Redux의 flux 패턴을 참고하여 class형으로 구현했습니다.
- store와 handler를 class constructor 안에 let 변수로 선언해서 클로저처럼 사용했으며, 이를 통해 외부에서 state, handler 변수에 접근하지 못하게끔 구현했습니다.
- action으로 'subscribe'와 'unsubscribe'를 두어 각각 구독하기와 해지하기 버튼을 누르면 trigger되게 하였으며 dispatch를 통해 action이 일어나도록 하여 store와 view를 느슨하게 구성했습니다.
- handler에 있는 함수들을 실행하는 로직을 notify 함수로 분리했습니다.
- dispatch 함수 내에서 action의 type이 'unsubscribe'일때만 notify가 일어나게끔 하였습니다.
- 옵저버 패턴에서 구독은 각 컴포넌트별로 store.subscribe 함수를 통해 컴포넌트를 구독하는 방식으로 진행합니다.
- 각 컴포넌트에 해당하는 view가 아니거나 press가 all일 때 update가 일어나지 않도록 예외처리를 진행했습니다.
- 내가 구독한 언론사가 하나도 없을 때 구독해지 액션에 따른 뷰의 변화가 일어나지 않고 내가 구독한 언론사 탭을 벗어나도록 예외처리를 진행했습니다.

# 컴포넌트

## 컴포넌트 구조

<img width="1028" alt="image" src="https://github.com/softeerbootcamp-2nd/fe-newsstand/assets/26896018/b03dffe5-5919-4f1c-b965-51d6b5dbf756">

## 컴포넌트 설명

- `main.js`: index.html에서 app 클래스에 접근하게 해주는 entry point이며 해당 main 태그와 script 태그를 제외한 모든 DOM 조작은 컴포넌트에서 이루어집니다. 따라서 body 태그에는 이 둘밖에 없습니다.
- `App.js`: 메인 화면을 구성하는 컴포넌트입니다. `Header.js`, `AutoRollingNews.js`, `PressTab.js`, `PressGridView.js`, `PressListView.js`를 불러와서 렌더링합니다.
- `Header.js`: 뉴스스탠드 아이콘과 제목, 오늘 날짜를 렌더링합니다.
- `AutoRolling.js`: 무한 자동 롤링 뉴스 배너를 렌더링하며 하위 컴포넌트인 `Headline.js`에 타이머를 세팅해주는 역할 또한 담당합니다.
  - `Headline.js`: 좌우 롤링 뉴스 배너 각각을 렌더링하는 컴포넌트이며, 컴포넌트로 설계한 덕분에 `Headline.js` 컴포넌트만 가지고 롤링 뉴스에 들어갈 내용과 타이머만 상위 컴포넌트에서 세팅해 주면 손쉽게 구현이 가능합니다.
- `PressTab.js`: 전체 언론사/내가 구독한 언론사를 선택할 수 있는 탭이 있고(현재는 동작하지 않습니다), 그리드뷰/리스트뷰를 선택할 수 있는 아이콘이 있는 컴포넌트입니다. 그리드뷰/리스트뷰 아이콘을 클릭하면 어떤 아이콘을 클릭했는지를 나타내는 문자열이 `App.js`로 전송되어 App 컴포넌트의 리렌더링이 일어나게 되어 메인 화면 하단의 뷰 타입이 바뀌고 동시에 PressTab 컴포넌트의 리렌더링 또한 일어나서 선택한 아이콘의 색깔이 바뀌게 됩니다.
- `PressGridView.js`: 전체 언론사 탭의 그리드 뷰를 렌더링하는 컴포넌트입니다. `press-info.json`을 fetch API를 통해 받아와서 `shuffleArray()`를 통해 섞어준 다음 페이지에 맞게 뿌려주는 역할을 합니다.
- `PressListView.js`: 전체 언론사 탭의 리스트 뷰를 렌더링하는 컴포넌트입니다.
- common: 그리드 뷰, 리스트 뷰에서 쓰이는 공통 컴포넌트를 보관하는 폴더입니다. 구독 버튼, 스낵바, 알럿 창을 각각 컴포넌트로 구현하여 중복을 줄이고 재사용성을 올려 컴포넌트 기반 설계의 이점을 최대화했습니다.
  - `SubscribeButton.js`: 구독 버튼 컴포넌트입니다. type을 통해 'grid'인지 'list'인지를 전달받고 isSubscribed를 통해 구독을 했는지 여부를 전달받아 구독버튼 컴포넌트의 state가 바뀔때마다 버튼의 스타일이 바뀝니다.
  - `Snackbar.js`: 스낵바 컴포넌트입니다. isShow와 text를 인자로 가지며 isShow가 true일 때만 표시됩니다.
  - `Alert.js`: 알럿 창입니다. isShow와 pressName을 인자로 가지며 마찬가지로 isShow가 true일 때만 표시됩니다.

# 4주차 가장 어려웠던 일

## 문제

사용자가 보는 화면에는 문제가 없는데 개발자 도구로 봤을 때 콘솔 창에 로그가 실시간으로 엄청나게 빨리 찍히는 현상이 발생했습니다. 여기서 cannot read property of undefined 에러가 지속적으로 발생했고 결국 실제 서비스에도 버그가 생기게 되어 중대한 이슈라고 판단하였습니다. fe-newsstand 프로젝트에서 이정도로 빠른 것은 프로그레스 바밖에 없다고 가정하고 프로그레스 바를 문제의 원인으로 지목했습니다.

## 해결 방안

리스트뷰에서 그리드뷰로 이동하거나 전체 언론사 탭/내가 구독한 언론사 탭 사이를 이동할 때 타이머가 초기화되지 않는 것이 문제인 것 같아서 우선 프로그레스 바에서 타이머를 세팅해줄 때 saveTimer 함수를 통해 App.js에 보관해준 다음에 그리드뷰, 리스트뷰에서 각각 렌더 함수가 실행될 때 clearTimer 함수를 통해 App.js에 저장해둔 timerId를 받아서 초기화해주는 식으로 처리했습니다. 덕분에 프로그레스 바가 올라갈 때 하나의 타이머만 작동하게 하여 이런 문제를 해결할 수 있었습니다.

# 데모 영상

[뉴스스탠드 4주차 데모 영상](https://youtu.be/2e51obn2cJM)

# 폴더 구조

```
fe-newsstand
├─ core
│  └─ store.js
├─ data
│  ├─ list-view.json
│  └─ press-info.json
├─ index.html
├─ readme.md
├─ src
│  ├─ api.js
│  ├─ app.js
│  ├─ components
│  │  ├─ AutoRollingNews.js
│  │  ├─ Header.js
│  │  ├─ Headline.js
│  │  ├─ PressGridview.js
│  │  ├─ PressListView.js
│  │  ├─ PressTab.js
│  │  └─ common
│  │     ├─ Alert.js
│  │     ├─ SnackBar.js
│  │     └─ SubscribeButton.js
│  ├─ constants.js
│  ├─ main.js
│  └─ utils.js
└─ styles
   ├─ reset.css
   └─ style.css

```
