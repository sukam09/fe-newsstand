# 🗞️ 뉴스스탠드

## 1주차

### 기본 화면

- [x] 기본 상단 영역 (왼쪽: 뉴스스탠스 로고 + 새로고침 / 오른쪽: 시스템 날짜)
- [x] 최신 뉴스 자동롤링 영역
- [x] 언론사별 기사들을 확인하는 영역 (전체 언론사의 그리드 보기가 기본 상태)
- [x] 그리드 보기 (6\*4 테이블) + 언론사 브랜드 마크 중앙 배치
- [x] 새로고침 될 때 마다, 랜덤으로 언론사 브랜드 마크 배치
- [x] 그리드의 좌우에는 화살표를 배치하여 페이지 전환 가능
- [x] 가장 첫 페이지와 끝 페이지에는 화살표가 표시 되지 않음 (최대 4페이지)

<img width="1275" alt="기본 화면" src="https://github.com/DaeHee99/fe-newsstand/assets/100769596/b76d9978-2859-4bee-8a54-64f55203e11f">

## 2주차

### 최신 뉴스 자동 롤링

- [x] 왼쪽 바와 오른쪽 바는 각각 다른 최신 뉴스의 헤드라인 5개가 5초마다 자동으로 무한 롤링
- [x] 좌우 영역의 시간차를 1초로 하여 두 영역의 뉴스가 동시에 롤링되지 않도록 구현
- [x] 롤링 시, 바 영역 안에서 제목이 위로 넘어가는 애니메이션 적용
- [x] 각 영역에 마우스를 호버하면, 무한 롤링을 일시정지하고, 헤드라인에 밑줄 표시
- [x] 마우스 호버와 상관없이 좌우 영역의 롤링 시간차를 1초로 항상 유지

https://github.com/DaeHee99/fe-newsstand/assets/100769596/a793894c-dd85-4633-a0ea-42245117822b

### 리스트 보기 (전체 언론사)

- [x] 리스트 보기 기본 UI 구현
- [x] 리스트 보기, 그리드 보기 전환
- [x] 선택된 카테고리의 이름 옆에 해당 카테고리에 속해있는 언론사의 개수와 현재 언론사의 순서 표시
- [x] 화면 새로고침마다 언론사의 순서는 랜덤으로 배치
- [x] 20초 동안 현재 순서의 언론사 내용 표시 후, 다음 언론사의 내용 표시
- [x] 20초 progress bar 구현
- [x] 현재 카테고리의 마지막 언론사가 20초간 보여진 후에는, 다음 카테고리로 자동 전환
- [x] 가장 마지막 언론사가 보여진 후에는, 처음 카테고리의 첫 언론사로 돌아가기
- [x] 좌우 화살표를 통해서도 즉시 이전과 다음 언론사로 넘어가기

https://github.com/DaeHee99/fe-newsstand/assets/100769596/7da3fb98-635a-4490-ab2e-db4fe1a0bca6

### 신경쓰고 노력한 부분

- [x] 최대한 함수 단위로 개발하기 + 함수는 하나의 역할만 부여
- [x] 모듈화 (ES Modules)
- [x] 명확하고 깔끔한 디렉토리 구조에 대한 고민
- [x] 깃 커밋 컨벤션 지키기
- [x] JSON 데이터 정리 + fetch
- [x] 매직 넘버 최소화
- [x] template literal 적극 활용
- [x] 고차함수 적극 활용

### 앞으로 더 개선할 점, 목표

- [x] 디렉토리와 파일 구조 고민하고 개선하기
- [x] html에 작성한 임시 데이터 모두 지우고, JSON 데이터를 통해 동적으로 할당하기

## 3주차

### 그리드 보기 - 언론사 구독

- [x] 각 언론사 브랜드마크가 있는 셀에 마우스를 올리면 "구독하기" 버튼이 보임
- [x] 이미 구독하고 있는 언론사의 경우, "해지하기" 버튼이 보임
- [x] 언론사 구독을 하면, 구독 관련 스토어에 해당 언론사 정보를 저장
- [x] 언론사 구독을 해지하면, 구독 관련 스토어에 해당 언론사 정보 삭제

### 리스트 보기 (전체 언론사)

- [x] 선택된 카테고리 외의 다른 카테고리에는 마우스를 올리면 밑줄이 생김
- [x] 각 카테고리를 누르면 해당 카테고리로 바로 이동
- [x] 언론사 기사 영역에는 다음과 같은 요소들이 들어감
    * 언론사 브랜드마크
    * 최종 편집 일시
    * "구독하기" 버튼
    * 썸네일이 있는 메인 뉴스 1건
    * 타이틀만 있는 서브 뉴스 6건
    * 편집권에 대한 안내 문구
- [x] 메인 뉴스에 마우스를 올리면, 썸네일은 5% 확대되고, 뉴스 타이틀에는 밑줄이 생김
- [x] 각 서브 뉴스 타이틀에도 마우스를 올리면 밑줄이 생김
- [x] "구독하기" 버튼을 누르면, ```내가 구독한 언론사에 추가되었습니다.``` 라는 스낵바가 5초간 유지
- [x] 스낵바가 사라지면, 즉시 내가 구독한 언론사 탭의 리스트 보기 화면으로 이동

### 리스트 보기 (내가 구독한 언론사)

- [x] '내가 구독한 언론사의 리스트 보기' 화면은 '전체 언론사의 리스트 보기' 화면과 동일
- [x] 카테고리들이 나열되어있던 가로 탭에 언론사의 이름과 > 화살표 아이콘이 보임
- [x] 언론사가 많아서 탭의 가로 영역을 넘어가는 경우, 드래그를 통해 가로로 스크롤이 됨
- [x] 언론사는 구독한 순서대로 배치
- [x] 전체 언론사 탭 상태에서는 그리드 보기가 기본인 것처럼, 내가 구독한 언론사 탭 상태에서는 리스트 보기가 기본
- [x] "구독해지" 버튼을 누르면 ```[언론사이름]을(를) 구독해지 하시겠습니까?```라는 알럿이 뜸
- [x] 알럿의 "예, 해지합니다" or "아니오" 버튼에 마우스를 올리면 텍스트에 밑줄이 생김
- [x] "예, 해지합니다"를 선택하면 즉시 구독이 해지되고, 목록의 다음 순서 언론사가 바로 나타남

### 신경쓰고 노력한 부분

- [x] 최대한 리액트와 비슷하게 컴포넌트 단위로 개발하기
- [x] 컴포넌트 단위로 디렉토리와 파일 구조 정리
- [x] 모든 컴포넌트는 클래스 형태로 만들어서 아래 Component를 상속 받기
    ```javascript
    export default class Component {
      $target;
      $props;
      $state;
      constructor($target, $props) {
        this.$target = $target;
        this.$props = $props;
        this.setup();
        this.setEvent();
        this.render();
      }
      setup() {}
      mounted() {}
      template() {
        return "";
      }
      render() {
        this.$target.innerHTML = this.template();
        this.mounted();
      }
      setEvent() {}
      setState(newState, render = true) {
        this.$state = { ...this.$state, ...newState };
        if (render) this.render();
      }
      addEvent(eventType, selector, callback) {
        this.$target.addEventListener(eventType, (event) => {
          if (!event.target.closest(selector)) return false;
          callback(event);
        });
      }
    }
    ```

### 앞으로 더 개선할 점, 목표

- [x] 다양한 store를 통해 view와의 응집도 낮추기

## 4주차

### 그리드 보기 (내가 구독한 언론사)

- [x] 내가 구독한 언론사의 그리드 보기 화면은 '전체 언론사의 그리드 보기' 화면과 동일
- [x] 사용자가 구독을 누른 언론사의 브랜드마크만 보이고, 나머지 칸은 비어 있음
- [x] 구독 중인 언론사의 브랜드마크 셀에 마우스를 올리면 "구독해지' 버튼이 나타남
- [x] 리스트 보기 상태에서 구독해지를 하는 것과 동일하게, 알럿이 뜸
- [x] 구독이 해지되는 즉시 그리드에서 해당 언론사의 브랜드마크가 사라짐

### 다크모드

- [x] Foundation의 컬러 팔레트 정보를 활용해 다크모드 테마 적용
- [x] 다크모드로 전환시, 로고들도 다크모드 버전으로 일괄 전환
- [x] 다크모드를 ON/OFF 할 수 있는 버튼 추가

### 신경쓰고 노력한 부분

- [x] 옵저버 패턴을 적용하여 스토어 만들기
- [x] 스토어의 state가 변경되면 구독하고 있던 컴포넌트는 재랜더링
- [x] 구독, 뉴스 뷰, 다크모드 관련 스토어 구성
```javascript
// 최상위 Observable 클래스

export default class Observable {
  constructor() {
    this._observers = new Set();
  }
  subscribe(observer) {
    this._observers.add(observer);
  }
  unsubscribe(observer) {
    this._observers.delete(observer);
  }
  notify(data) {
    this._observers.forEach((observer) => observer(data));
  }
}
```
```javascript
// 구독 스토어 예시

import Observable from "../core/Observable.js";

export default class SubscribeStore extends Observable {
  constructor() {
    super();
    this.subscribeList = [];
  }

  subscribeNews(news) {
    this.subscribeList.push(news);
    this.notify(this.subscribeList);
  }

  unSubscribeNews(news) {
    this.subscribeList = this.subscribeList.filter(
      (item) => item.id !== news.id
    );
    this.notify(this.subscribeList);
  }

  unSubscribeNewsByName(newspaperName) {
    this.subscribeList = this.subscribeList.filter(
      (item) => item.name !== newspaperName
    );
    this.notify(this.subscribeList);
  }
}
```
```javascript
// 컴포넌트가 아래와 같이 구독하면, 해당 스토어의 state가 변경되었을 때 해당 컴포넌트가 재렌더링됨

this.SubscribeStore.subscribe(() => this.render());
this.ModeStore.subscribe(() => this.render());
```

## 구조

```bash
.
├── assets
│   ├── font
│   │   ├── woff
│   │   └── woff2
│   ├── icons
│   ├── images
│   │   └── thumbnail
│   └── logo
│       ├── dark
│       └── light
├── index.html
├── package.json
├── readme.md
├── src
│   ├── App.js
│   ├── Components
│   │   ├── Button
│   │   │   └── ModeToggleButton.js
│   │   ├── Header
│   │   │   └── Header.js
│   │   ├── Headline
│   │   │   ├── Headline.js
│   │   │   ├── HeadlineContent.js
│   │   │   └── RollingItem.js
│   │   ├── MyNewsGrid
│   │   │   └── MyNewsGrid.js
│   │   ├── MyNewsList
│   │   │   ├── MyNewsList.js
│   │   │   └── PressNews.js
│   │   ├── NavBar
│   │   │   └── NavBar.js
│   │   ├── News
│   │   │   └── News.js
│   │   ├── NewsGrid
│   │   │   ├── NewsGrid.js
│   │   │   └── NewsGridItems.js
│   │   └── NewsList
│   │       ├── NewsList.js
│   │       └── PressNews.js
│   ├── Data
│   │   ├── RollingNews.json
│   │   ├── constants.js
│   │   └── pressNews.json
│   ├── Store
│   │   ├── ModeStore.js
│   │   ├── SubscribeStore.js
│   │   └── ViewStore.js
│   ├── core
│   │   ├── Component.js
│   │   └── Observable.js
│   └── index.js
└── style
    ├── Basic
    │   ├── color.css
    │   ├── font.css
    │   ├── global.css
    │   └── reset.css
    ├── Components
    │   ├── alert.css
    │   ├── darkButton.css
    │   ├── header.css
    │   ├── headline.css
    │   ├── navBar.css
    │   ├── newsGrid.css
    │   ├── newsList.css
    │   └── pageButton.css
    └── app.css
```
