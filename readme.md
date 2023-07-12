## 디렉토리 구조

```
fe-newsstand
├─ .gitignore
├─ Data
│  └─ Rolling_News.json
├─ Thumbnail.png
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
│     ├─ ...
│  │  └─ news_logo96.svg
│  └─ dark
│     ├─ d_news_logo1.svg
│     ├─ ...
│     └─ d_news_logo96.svg
├─ index.html
├─ module
│  ├─ api.js
│  ├─ app.js
│  ├─ grid.js
│  ├─ rolling.js
│  └─ util.js
├─ readme.md
└─ style
   ├─ reset.css
   ├─ style.css
   ├─ typography.css
   └─ variable.css

```

## 2주차 To Do List

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
- [ ] 두개의 뉴스 롤링 1초 차이 맞추기

### 4. 리스트 모드 틀 구현

- [x] 리스트 모드 틀 HTML 및 CSS 구현
- [x] 그리드 모드, 리스트 모드 토글 구현
- [ ] 리스트 모드 페이지 이동 구현

### 5. 리스트 모드 프로그래스바 애니메이션 구현

- [x] 프로그래스바 기본 구조 구현
- [x] 프로그래스바 애니메이션 기본 동작 구현
- [ ] 페이지 이동시 애니메이션 설정 및 초기화 구현

### 6. 리스트 모드 데이터 fetch 구현

- [ ] 리스트 모드 데이터 JSON 파일 작성
- [ ] 리스트 모드 JSON 파일 fetch
- [ ] 뉴스 이미지 정리

### 7. 리스트 모드 언론사 내용 DOM 구현

### 8. 리스트 모드 좌우 화살표 동작 구현

### 9. 기타 구현 및 리팩토링

- [x] 아이콘 및 이미지 절대경로 상수화
- [x] 글로벌 네임스페이스 사용
- [ ] fetch함수 promise로 병렬적으로 수행
