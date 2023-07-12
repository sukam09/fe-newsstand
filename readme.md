# fe-newsstand

## HTML 레이아웃 설계

### 1. 기본 상단 영역 → header

뉴스스탠드 아이콘 & 제목이랑 오늘 날짜를 각각 div로 분리

뉴스스탠드 아이콘과 제목을 각각 span으로 분리

### 2. 최신 뉴스 자동롤링 영역 → section

뉴스 헤드라인 2개를 각각 div로

### 3. 언론사별 기사들을 확인하는 영역 → section

```html
<section>
  <div>
    <ul>
      <li></li>
      <li></li>
    </ul>
    <div>
      <span></span>
      <span></span>
    </div>
  </div>
  <div>
    <ul>
      <li></li>
      <li></li>
      ...
      <li></li>
    </ul>
  </div>
</section>
```

## 프로젝트 구조

```
fe-newsstand
├─ README.md
├─ asset
│  ├─ fonts
│  │  ├─ Pretendard-Black.woff
│  │  ├─ Pretendard-Bold.woff
│  │  ├─ Pretendard-ExtraBold.woff
│  │  ├─ Pretendard-ExtraLight.woff
│  │  ├─ Pretendard-Light.woff
│  │  ├─ Pretendard-Medium.woff
│  │  ├─ Pretendard-Regular.woff
│  │  ├─ Pretendard-SemiBold.woff
│  │  └─ Pretendard-Thin.woff
│  ├─ icons
│  │  ├─ grid-view.svg
│  │  ├─ left-button.png
│  │  ├─ list-view.svg
│  │  ├─ newsstand.svg
│  │  ├─ right-button.png
│  │  └─ thumbnail.png
│  └─ logos
│     ├─ press1.png
│     ├─ press10.png
│     ├─ press11.png
│     ├─ press12.png
│     ├─ press13.png
│     ├─ press14.png
│     ├─ press15.png
│     ├─ press16.png
│     ├─ press17.png
│     ├─ press18.png
│     ├─ press19.png
│     ├─ press2.png
│     ├─ press20.png
│     ├─ press21.png
│     ├─ press22.png
│     ├─ press23.png
│     ├─ press24.png
│     ├─ press25.png
│     ├─ press26.png
│     ├─ press27.png
│     ├─ press28.png
│     ├─ press29.png
│     ├─ press3.png
│     ├─ press30.png
│     ├─ press31.png
│     ├─ press32.png
│     ├─ press33.png
│     ├─ press34.png
│     ├─ press35.png
│     ├─ press36.png
│     ├─ press37.png
│     ├─ press38.png
│     ├─ press39.png
│     ├─ press4.png
│     ├─ press40.png
│     ├─ press41.png
│     ├─ press42.png
│     ├─ press43.png
│     ├─ press44.png
│     ├─ press45.png
│     ├─ press46.png
│     ├─ press47.png
│     ├─ press48.png
│     ├─ press49.png
│     ├─ press5.png
│     ├─ press50.png
│     ├─ press51.png
│     ├─ press52.png
│     ├─ press53.png
│     ├─ press54.png
│     ├─ press55.png
│     ├─ press56.png
│     ├─ press57.png
│     ├─ press58.png
│     ├─ press59.png
│     ├─ press6.png
│     ├─ press60.png
│     ├─ press61.png
│     ├─ press62.png
│     ├─ press63.png
│     ├─ press64.png
│     ├─ press65.png
│     ├─ press66.png
│     ├─ press67.png
│     ├─ press68.png
│     ├─ press69.png
│     ├─ press7.png
│     ├─ press70.png
│     ├─ press71.png
│     ├─ press72.png
│     ├─ press73.png
│     ├─ press74.png
│     ├─ press75.png
│     ├─ press76.png
│     ├─ press77.png
│     ├─ press78.png
│     ├─ press79.png
│     ├─ press8.png
│     ├─ press80.png
│     ├─ press81.png
│     ├─ press82.png
│     ├─ press83.png
│     ├─ press84.png
│     ├─ press85.png
│     ├─ press86.png
│     ├─ press87.png
│     ├─ press88.png
│     ├─ press89.png
│     ├─ press9.png
│     ├─ press90.png
│     ├─ press91.png
│     ├─ press92.png
│     ├─ press93.png
│     ├─ press94.png
│     ├─ press95.png
│     └─ press96.png
├─ data
│  └─ press-info.json
├─ index.html
├─ src
│  ├─ App.js
│  ├─ components
│  │  ├─ AutoRollingNews.js
│  │  ├─ Header.js
│  │  ├─ Headline.js
│  │  ├─ PressGridview.js
│  │  ├─ PressListView.js
│  │  └─ PressTab.js
│  ├─ constants.js
│  └─ main.js
└─ styles
   ├─ reset.css
   └─ style.css

```
