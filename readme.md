## 디렉토리 구조

```
fe-newsstand
├─ .gitignore
├─ Data
│  ├─ News_Data.json
│  └─ Rolling_News.json
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
│  ├─ SymbolPlus.svg
│  ├─ SymbolX.svg
│  ├─ basic
│  │  ├─ news_logo1.svg
│  │  ├─ ...
│  │  └─ news_logo96.svg
│  └─ dark
│     ├─ d_news_logo1.svg
│     ├─ ...
│     └─ d_news_logo96.svg
├─ img
│  ├─ thumbnail1.jpg
│  ├─ ...
│  └─ thumbnail96.jpg
├─ module
│  ├─ api.js
│  ├─ app.js
│  ├─ grid.js
│  ├─ list.js
│  ├─ rolling.js
│  ├─ util.js
│  └─ variable.js
├─ style
│  ├─ reset.css
│  ├─ style.css
│  ├─ typography.css
│  └─ variable.css
├─ datagenerator.js
├─ index.html
└─ readme.md
```

## 3주차 To Do List

### 1. [2주차 코드 리팩토링](https://github.com/tommya98/fe-newsstand/issues/1#issue-1806831166)

- [x] 화살표 함수 간략화
- [x] 배열 swap시 구조 분해 할당 사용
- [x] 반복문 대신 카테고리 대응 구조체 사용
- [x] 클래스 삭제후 추가가 아닌 한 번에 세팅

### 2. [전체 언론사 그리드뷰 구독/해지 버튼 구현](https://github.com/tommya98/fe-newsstand/issues/3#issue-1806931887)

- [x] 브랜드마크 셀에 마우스를 올리면 [구독하기] / [해지하기] 버튼 나타내기.
- [x] 구독/해지 여부 확인 함수 구현
- [x] 구독/해지 설정 함수 구현
- [ ] [구독하기] 버튼 클릭 시 나오는 스낵바 구현
- [ ] [해지하기] 버튼 클릭 시 나오는 알럿 구현
- [ ] 구독 상태에 따른 NEWS_DATA 업데이트
- [ ] 구독/해지 버튼 재사용 가능하도록 리팩토링

###

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
