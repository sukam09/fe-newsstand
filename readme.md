# fe-newsstand

### 프로젝트 설계 구조

<img src="https://github.com/kimdaye77/fe-newsstand/assets/63107805/ac2742db-5734-43f2-976b-34ea1a0fc336" width="60%" height="40%" art="프로젝트 설계 구조">

### 프로젝트 폴더 구조 트리

```
fe-newsstand
├─ .DS_Store
├─ assets
│  ├─ icons
│  └─ images
│     └─ logo
│        ├─ dark
│        └─ light
├─ css
│  ├─ color.css
│  ├─ index.css
│  └─ reset.css
├─ data
│  ├─ news.json
│  ├─ press.json
│  └─ recentNews.json
├─ index.html
├─ js
│  ├─ app.js
│  ├─ constants
│  │  └─ constants.js
│  ├─ sections
│  │  ├─ header.js
│  │  ├─ mainView.js
│  │  └─ recentNews.js
│  └─ utils
│     ├─ autoRolling.js
│     ├─ changeView.js
│     ├─ checkPage.js
│     ├─ getDate.js
│     ├─ makeGridView.js
│     ├─ makeListView.js
│     └─ reload.js
└─ readme.md

```

### Feature list

#### 개발 완료한 기능

- 기본 화면
- [x] 메인 로고 클릭 시 새로고침
- [x] 시스템 날짜 표현
- 최신 뉴스 영역
- [x] 최신 뉴스 5초마다 5개 자동 롤링
- [x] 좌우 영역 1초 차이 롤링
- [x] 마우스 호버 시 롤링 일시정지
- 그리드 뷰
- [x] 새로고침 시 언론사 로고 랜덤 표시
- [x] 첫 페이지, 마지막 페이지 버튼 disable
- [x] 뷰 방식 변경
- [x] 마우스 호버 시 구독하기 버튼 표시
- 리스트 뷰
- [x] 클릭한 카테고리의 현재 언론사 순서와 총 언론사 수 표시
- [x] 버튼 클릭 시 해당 카테고리의 다음 언론사로 넘어가기
- [x] 20s간 프로그레스 바 진행 후, 다음 언론사로 넘어가기

#### 남은 기능

- [ ] 구독하기/해지하기 버튼
- [ ] 리스트 뷰 메인 로고 썸네일에 마우스 호버 시 5% 확대
- [ ] 구독한 언론사 탭 버튼 이벤트
- [ ] 구독한 언론사 페이지 구현
- [ ] 다크모드 (추가 미션)

### 개발한 기능 시연

#### [FE-NEWSSTAND 2주차]

https://github.com/kimdaye77/fe-newsstand/assets/63107805/f91beb05-26bd-4da3-8c3d-ce7bb4ad8dd0
