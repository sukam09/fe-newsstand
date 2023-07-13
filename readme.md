# 📌 TODO

목표 : 하나의 index.html파일에 js DOM API를 이용하여 news stand를 완성한다.

## 📌 폴더 구조

- src 폴더: js 로직 및 필요한 이미지를 관리하는 폴더
- commponent 폴더: js 컴포넌트 로직 관리
- header 폴더: 헤더 태그 컴포넌트 관리
- lastestNews 폴더: 최신 뉴스 컴포넌트 관리
- allNews 폴더: 전체 언론사 컴포넌트 관리
- common 폴더: 공통 컴포넌트 관리
- asset 폴더: 필요한 이미지 관리
- constants 폴더: 상수 관리
- utils 폴더: 유틸 관리

## 📌 2주차 설계

1. `LatestNews` 컴포넌트의 rolling 기능 구현

- [x] 타이머 기능 구현
- [x] css애니메이션 구현

2. `allNews` 의 리스트 보기 기능 구현

- [ ] 타이머 기능 구현
- [ ] 언론사의 정보를 json 형태로 저장
- [ ] 정해진 시간 이후에 내용을 표시

3. 카테고리 이동 기능 구현
4. querySelector 구현

-> 이후 타이머의 경우 hooks로 구현 가능
-> css 모듈화도 가능

## 📌 image

<img width="100%" alt="스크린샷 2023-07-06 오후 5 55 46" src="https://github.com/bae-sh/fe-newsstand/assets/37887690/4418874b-6403-4cd5-95ed-33343edeb69c">

```
fe-newsstand
│  ├─ components
│  │  ├─ App.js
│  │  ├─ allNews
│  │  │  ├─ AllNewHeader.js
│  │  │  ├─ AllNewsGridView.js
│  │  │  ├─ AllNewsListView.js
│  │  │  ├─ ArrowButton.js
│  │  │  └─ index.js
│  │  ├─ common
│  │  │  ├─ Alert.js
│  │  │  ├─ Button.js
│  │  │  └─ Icon.js
│  │  ├─ core
│  │  │  └─ Component.js
│  │  ├─ header
│  │  │  └─ index.js
│  │  └─ latestNews
│  │     ├─ LatestNewsComponent.js
│  │     └─ index.js
│  ├─ constants
│  │  └─ index.js
│  ├─ index.js
│  └─ utils
│     └─ index.js
└─ styles
   ├─ color.css
   ├─ components
   │  ├─ alert.css
   │  ├─ allNews.css
   │  ├─ header.css
   │  └─ latestNews.css
   ├─ reset.css
   └─ typography.css

```
