## 디렉토리 구조

```
fe-newsstand
├─ .git
│  ├─ ...
├─ .github
│  ├─ ...
├─ .gitignore
├─ Data
│  ├─ News_Data.json
│  └─ Rolling_News.json
├─ datagenerator.js
├─ icons
│  ├─ GridButton-Blue.svg
│  ├─ GridButton.svg
│  ├─ LeftButton.svg
│  ├─ ListButton-Blue.svg
│  ├─ ListButton.svg
│  ├─ NewsLogo.svg
│  ├─ RightButton.svg
│  ├─ SymbolArrow.svg
│  ├─ SymbolDivision.svg
│  ├─ SymbolMoon.svg
│  ├─ SymbolPlus.svg
│  ├─ SymbolSun.svg
│  ├─ SymbolX.svg
│  ├─ basic
│  │  ├─ news_logo1.svg
│  │  ├─ ...
│  │  └─ news_logo96.svg
│  └─ dark
│     ├─ d_news_logo1.svg
│     ├─ d_news_logo10.svg
│     ├─ ...
│     └─ d_news_logo96.svg
├─ img
│  ├─ thumbnail1.jpg
│  ├─ ...
│  └─ thumbnail96.jpg
├─ index.html
├─ readme.md
├─ src
│  ├─ app.js
│  ├─ controller
│  │  ├─ arrowBtnController.js
│  │  ├─ componentController.js
│  │  ├─ fieldTabController.js
│  │  ├─ gridController.js
│  │  ├─ listController.js
│  │  ├─ mainController.js
│  │  ├─ myQuerySelector.js
│  │  ├─ observer.js
│  │  ├─ rollingController.js
│  │  ├─ subscribeController.js
│  │  └─ tabAndViewerController.js
│  ├─ model
│  │  ├─ model.js
│  │  ├─ store.js
│  │  └─ variable.js
│  └─ view
│     ├─ alert.js
│     ├─ arrowBtn.js
│     ├─ fieldTab.js
│     ├─ grid.js
│     ├─ header.js
│     ├─ init.js
│     ├─ list.js
│     ├─ rollingBar.js
│     ├─ snackBar.js
│     ├─ subscribe.js
│     └─ tabAndViewer.js
└─ style
   ├─ alert.css
   ├─ arrowBtn.css
   ├─ fieldTab.css
   ├─ grid.css
   ├─ header.css
   ├─ list.css
   ├─ reset.css
   ├─ rollingBar.css
   ├─ snackBar.css
   ├─ style.css
   ├─ tabAndViewer.css
   ├─ typography.css
   └─ variable.css
```

## 4주차 To Do List

<details>
<summary>4주차 To Do List 정리</summary>
<div markdown="1">

### 1. [기존 state 기반 옵저버 패턴 구현](https://github.com/tommya98/fe-newsstand/issues/12#issue-1817450483)

- [x] 함수형 옵저버 패턴 구현을 위한 함수 작성
- [x] 옵저버 패턴을 통해 구독할 데이터 세팅
- [x] view의 draw 함수 옵저버 구독
- [x] 기존의 draw를 위한 state 삭제

### 2. [코드 리팩토링 및 버그 수정](https://github.com/tommya98/fe-newsstand/issues/14#issue-1817757931)

- [x] 함수에서 하나의 동작만 수행하도록 함수 나누기
- [x] 기획서와 다른 동작 수정
- [x] 버그 수정

### 3. [다크모드 구현](https://github.com/tommya98/fe-newsstand/issues/15#issue-1817887807)

- [x] 다크모드를 위한 css 구현
- [x] 다크모드를 위한 js 구현
- [x] 다크모드 스토어 구현
- [x] 다크모드 토글을 위한 아이콘 추가

### 4. [전역변수 옵저버 패턴으로 적용](https://github.com/tommya98/fe-newsstand/issues/18#issue-1819373455)

- [x] 그리드 페이지 옵저버 적용
- [x] 리스트 페이지 옵저버 적용
- [x] 뷰 모드 옵저버 적용
- [x] 다크모드 옵저버 단순화 적용
- [x] 구독 뉴스 수 옵저버 적용

### 5. [나만의 querySelector 구현](https://github.com/tommya98/fe-newsstand/issues/20#issue-1819863416)

- [x] 태그 이름으로 querySelector구현
- [x] 클래스로 querySelector구현
- [x] 아이디로 querySelector구현
- [x] 여러 요소를 합쳐서 querySelector구현
- [x] 기존 querySelector와 myQuerySelector가 호환되도록 구현

</div>
</details>

## 3주차 To Do List

<details>
<summary>3주차 To Do List 정리</summary>
<div markdown="1">

### 1. [2주차 코드 리팩토링](https://github.com/tommya98/fe-newsstand/issues/1#issue-1806831166)

- [x] 화살표 함수 간략화
- [x] 배열 swap시 구조 분해 할당 사용
- [x] 반복문 대신 카테고리 대응 구조체 사용
- [x] 클래스 삭제후 추가가 아닌 한 번에 세팅

### 2. [전체 언론사 그리드뷰 구독/해지 버튼 구현](https://github.com/tommya98/fe-newsstand/issues/3#issue-1806931887)

- [x] 브랜드마크 셀에 마우스를 올리면 [구독하기] / [해지하기] 버튼 나타내기.
- [x] 구독/해지 여부 확인 함수 구현
- [x] 구독/해지 설정 함수 구현
- [x] [구독하기] 버튼 클릭 시 나오는 스낵바 구현
- [x] [해지하기] 버튼 클릭 시 나오는 알럿 구현
- [x] 구독 상태에 따른 NEWS_DATA 업데이트
- [ ] 구독/해지 버튼 재사용 가능하도록 리팩토링

### 3. [리스트 보기 UI 구현](https://github.com/tommya98/fe-newsstand/issues/5#issue-1809114998)

- [x] 프로그래스바에서 카테고리 마우스 호버 효과 및 이동 구현
- [x] 리스트 모드 언론사 기사 영역 구현
- [x] [구독하기] 버튼 클릭시 스낵바 등장 및 내부 뉴스 데이터 업데이트
- [x] [x] 버튼 클릭시 알림창 등장 및 해지 기능 구현

### 4. [MVC패턴으로 코드 작성](https://github.com/tommya98/fe-newsstand/issues/7#issue-1811566272)

- [x] 알럿창 이벤트 리스너 구현
- [x] 리스트모드 페이지 이동 구현
- [x] 리스트모드 구독 기능 구현
- [x] 그리드뷰 구독시 즉시 구독버튼이 바뀌도록 구현
- [x] 그리드뷰 내가 구독한 언론사 예외 처리
- [x] 리스트뷰 내가 구독한 언론사 최대 페이지 처리
- [x] 기본 프로그래스바 구현
- [x] 내가 구독한 언론사용 프로그래스바 그리는 함수 작성
- [x] 내가 구독한 언론사 프로그래바 이동 구현

### 5. [코드 리팩토링 및 오류 수정](https://github.com/tommya98/fe-newsstand/issues/10#issue-1815224147)

- [x] 구독 버튼 커서 포인터 css 설정
- [x] 구독하고 바로 취소시 타임아웃 삭제
- [x] 리스트뷰 내가 구독한 언론사 마지막 언론사 삭제시 발생하는 오류 수정
- [x] 내가 구독한 언론사 프로그래스바가 길 때 발생하는 오류 수정

</div>
</details>

## 2주차 To Do List

<details>
<summary>2주차 To Do List 정리</summary>
<div markdown="1">

### 1. 1주차 코드 리팩토링

- [x] svg 파일 추가
- [x] html svg 태그 img태그로 교체
- [x] typography.css 오타 수정
- [x] style.css 정리
- [x] tab-and-viewer 글자색 조절을 위한 class 추가
- [x] js파일 모듈화 및 상수화

### 2. 뉴스 롤링 데이터 fetch 구현

- [x] JSON 파일 작성
- [x] JSON 파일 fetch

### 3. 뉴스 롤링 애니메이션 구현

- [x] DOM API를 이용해 뉴스 롤링 영역 HTML 구조 설계
- [x] CSS와 JS를 통해 뉴스 롤링 애니메이션 구현
- [x] 뉴스 제목 문자열 전처리 알고리즘 구현
- [x] 호버시 일시정지 구현
- [x] setInterval 대신 setTimeout 재귀적으로 사용

### 4. 리스트 모드 틀 구현

- [x] 리스트 모드 틀 HTML 및 CSS 구현
- [x] 그리드 모드, 리스트 모드 토글 구현
- [x] 리스트 모드 DOM 조작 구현
- [x] 화살표 리스트 모드 페이지 이동 구현
- [x] 네비게이션바 리스트 모드 페이지 이동 구현
- [x] 기사 마우스 호버시 효과 구현

### 5. 리스트 모드 프로그래스바 애니메이션 구현

- [x] 프로그래스바 기본 구조 구현
- [x] 프로그래스바 애니메이션 기본 동작 구현
- [x] 페이지 이동시 애니메이션 설정 및 초기화 구현
- [x] 프로그래스바 마우스 호버시 효과 구현

### 6. 리스트 모드 데이터 fetch 구현

- [x] 리스트 모드 데이터 JSON 파일 작성
- [x] 리스트 모드 JSON 파일 fetch
- [x] 리스트 모드 JSON 파일 main-title 수정
- [x] 뉴스 이미지 정리

### 7. 리스트 모드 언론사 내용 DOM 구현

- [x] DOM API로 뉴스 데이터 html에 추가

### 8. 리스트 모드 좌우 화살표 동작 구현

- [x] 리스트 모드, 그리드 모드 화살표 초기화
- [x] 화살표 이동시 DOM 및 애니메이션 리셋 후 세팅

### 9. 기타 구현 및 리팩토링

- [x] 아이콘 및 이미지 절대경로 상수화
- [x] 글로벌 네임스페이스 사용
- [x] 뉴스 데이터 JSON 생성 프로그램 구현
- [x] 반복되는 동작 함수로 정리
- [x] 카테고리 별로 자료구조 개선

</div>
</details>
