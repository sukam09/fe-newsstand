# 프로젝트 이름

뉴스스탠드 웹

## 디렉토리 구조

```
dev
├─ assets
│  ├─ latest-news.json
│  ├─ news.json
│  └─ press.json
├─ css
│  ├─ color.css
│  ├─ components
│  │  ├─ gridView.css
│  │  ├─ header.css
│  │  ├─ listView.css
│  │  └─ rollingNews.css
│  ├─ index.css
│  └─ reset.css
├─ html
│  └─ index.html
├─ images
├─ js
│  ├─ app.js
│  ├─ feature
│  │  ├─ addEvent.js
│  │  ├─ changeView.js
│  │  ├─ eventHandlers.js
│  │  └─ subscribe.js
│  ├─ header
│  │  ├─ getDate.js
│  │  ├─ header.js
│  │  └─ refreshPage.js
│  ├─ main
│  │  ├─ gridView
│  │  │  ├─ makeGridView.js
│  │  │  ├─ manipulateSubPress.js
│  │  │  └─ renderGridView.js
│  │  ├─ listView
│  │  │  ├─ handleAnimation.js
│  │  │  ├─ handleBtnEvent.js
│  │  │  ├─ handleCategoryEvent.js
│  │  │  ├─ handleNewsData.js
│  │  │  ├─ manipulateNews.js
│  │  │  └─ renderListView.js
│  │  ├─ main.js
│  │  ├─ newsRolling
│  │  │  └─ newsRolling.js
│  │  └─ render.js
│  ├─ store
│  │  ├─ initSubscribe.js
│  │  ├─ observer.js
│  │  └─ store.js
│  └─ utils
│     ├─ constant.js
│     └─ fetchData.js

```

## 프로젝트 정보

- 프로젝트 버전 : v1.0.0
- 작성 언어 : html , css , javascript

## 설치 및 실행 방법

1. 프로젝트 클론

   git clone https://github.com/Wongilk/fe-newsstand.git

2. 프로젝트 디렉토리로 이동
3. 브라우저에서 index.html 열기

## 주요 기능 설명

### 기능 1 : 자동 롤링 뉴스

왼쪽, 오른쪽 영역이 5초마다 자동으로 무한 롤링되고,
마우스 호버시 정지한다.

![자동 롤링 뉴스](https://github.com/Wongilk/fe-newsstand/assets/108254103/447d1636-3b0b-42a7-a90d-1a4116b1ca6e)

### 기능 2-1 : 그리드 보기 (전체 언론사)

24개의 언론사를 한 페이지에 보여주고, 버튼을 통해 다음 페이지로 이동 가능하다. 또한 마우스 호버시 구독 or 해제 버튼을 통해 구독 리스트에 추가 및 삭제를 할 수 있다.

![그리드 뷰 전체 언론사](https://github.com/Wongilk/fe-newsstand/assets/108254103/116735ed-cc0f-4c2a-9d9b-d14f2b0ae58e)

### 기능 2-2 : 그리드 보기 (구독 언론사)

구독한 언론사들을 볼 수 있다. 마찬가지로 구독 or 해제 버튼으로 추가 삭제가 가능하다.

![그리드 뷰 구독 언론사](https://github.com/Wongilk/fe-newsstand/assets/108254103/036d814e-cd5f-4ab7-abeb-36ab741a23b6)

### 기능 3-1 : 리스트 보기 (전체 언론사)

전체 언론사 리스트 보기의 경우 뉴스의 카테고리에 따라 언론사들이 정렬되어 있다.
프로그래스 바를 클릭하거나 버튼을 클릭해 다음 혹은 이전 언론사의 뉴스를 확인할 수 있으며, 20초 간격으로 자동으로 넘어간다.
또한 구독 or 해제 버튼도 사용 가능하다.

![리스트 뷰 전체 언론사](https://github.com/Wongilk/fe-newsstand/assets/108254103/00e01e36-8df6-4613-932f-f4f71c02f866)

### 기능 3-2 리스트 보기 (구독 언론사)

3-1에서 카테고리별로 뉴스를 보여주었다면, 3-2에서는 구독한 언론사별로 뉴스를 보여준다.

![리스트 뷰 구독 언론사](https://github.com/Wongilk/fe-newsstand/assets/108254103/855b5b80-e55b-4e7a-b8d1-f376d8a7f6de)


### 기능 4-1 다크 모드

화면 우측 하단의 다크 모드 버튼을 통해 다크 모드를 사용할 수 있다.

![다크 모드](https://github.com/Wongilk/fe-newsstand/assets/108254103/c4f29f9e-5ad1-4272-9c4c-bc10ee6393a2)
