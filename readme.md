# fe-newsstand

## 네이밍 컨벤션

- 단어 사이를 언더바(-)로 구분한다.
- 의미에 맞는 시맨틱태그를 사용한다.

## #1 프로그래밍 요구사항

- DOM, Event 를 활용한다.
- 의미에 맞는 태그를 사용한다. 단순히 wrapping하는 역할은 div를 사용해도 좋다.
- DOM 조작과정에서 template literal 문법을 반드시 사용한다.
- DOM 조작과정에서 createElement, appendChild , insertBefore 등의 다양한 DOM APIs 를 활용해본다.
- addEventListener 를 사용한 이벤트 처리를 한다.
- 데이터는 json형태의 객체리터럴을 만들고, 객체 데이터를 접근해서 사용한다.

## #2 프로그래밍 요구사항

- 가급적 Class 와 같은 객체 형태를 지양하고 함수단위로만 개발해본다.
- 함수는 하나의 역할을 한다.
- 함수의 이름은 동사+명사로 짓는다.
- 객체별로 별도 파일의 모듈을 나누고 ES Modules에 따라 import/export 사용해서 의존성 관리

## 프로그래밍 설계

### 2P 최신 뉴스 자동 롤링

- [x] 최신 뉴스의 헤드라인 5개가 5초마다 자동으로 무한 롤링 CSS
- [x] 좌우 영역의 시간차를 1초로 설정
- [x] 마우스 호버시, 무한 롤링을 일시정지하고 헤드라인에 밑줄을 표시

### 5P 리스트 보기

- [x] 리스트 아이콘으로 리스트 <-> 그리드 전환
- [x] 각 분야 카테고리에서 언론사의 기사를 확인할 수 있도록 개발

### 6P 카테고리 프로그래스바 효과

- [x] 해당 카테고리에 속해있는 언론사의 갯수, 현재 언론사의 순서 표시
- [x] 언론사의 순서는 화면이 새로고침 될 때마다 랜덤으로 설정
- [x] 현재 순서의 언론사 내용을 표시
- [x] 20초 간 화면이 보여지고, 프로그래스바가 초마다 색이 차오르도록 애니메이션 적용

### 7P 카테고리 이동 (자동이동&버튼기반이동)

- [x] 카테고리의 마지막 언론사가 20초 보여진 후에는, 다음 카테고리로 넘어가도록
- [x] 가장 마지막 카테고리의 마지막 언론사가 보여진 후에는 처음 카테고리로 돌아오도록
- [x] 좌우의 화살표를 통해서 이전, 다음 언론사로 넘어갈 수 있도록

## 레이아웃 구조

```bash

news_stand__container
│
├── header__wrapper
│
├── latest_news__wrapper
│     ├── latest_news__wrapper-left
│     └── latest_news__wrapper-right
│
└── press__wrapper
      ├── press__header
      ├── arrows__wrapper-grid
      └── arrows__wrapper-list

```

## 폴더 구조

[🔗 Front-end 개발 프로젝트 폴더 구조](https://sennieworld.tistory.com/67)

```bash

/src
│
├── /assets
│     ├── /data
│     │    ├── latest-news.json
│     │    └── total-press.json
│     ├── /fonts
│     ├── /icons
│     └── /images
│          ├── /dark-press-logo
│          └── /light-press-logo
│
├── /components
│     ├── latest-news.js
│     ├── news-stand-header.js
│     ├── press-grid.js
│     ├── press-header.js
│     └── press-list.js
│
└── /styles
│     ├── /components
│     │     ├── latest-news.css
│     │     ├── news-stand-header.css
│     │     ├── press-grid.css
│     │     ├── press-header.css
│     │     └── press-list.css
│     ├── design.css
│     ├── index.css
│     └── reset.css
│
├── index.html
└── index.js
```
