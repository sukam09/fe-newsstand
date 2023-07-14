#FE - NEWS STAND

뉴스 스탠드 미션

## 요구사항

- [x] 기본화면
- [x] 최신 뉴스 자동 롤링 영역
- [x] 전체 언론사: 그리드 보기
  - 그리드 뉴스 랜덤 배치
  - 그리드 좌우 이동
- [x] 전체 언론사: 리스트 보기
  - 콘텐츠 표시시간 20초 timeout 및 프로그레스바 애니메이션 구현
  - 언론사 순서 랜덤 배치
  - 카테고리 마지막 언론사가 보여진 후 카테고리 이동(마지막 카테고리일 시 첫 카테고리로)
  - 좌우 화살표 이동 및 선택도 가능해야함
- [ ] 언론사 구독 기능(구독시 해지하기도 가능하게)
- [ ] 구독시 스낵바 표시
- [ ] 구독한 언론사: 리스트 보기
  - 드래그를 통한 탭 가로 스크롤
  - 언론사는 구독한 순서대로
  - 내가 구독한 언론사는 리스트가 default
- [ ] 구독한 언론사: 그리드 보기
- [ ] 구독해지 시 dialog 표시
- [x] 다크모드(선택)

## 디렉토리 구조

```
newsstand
├─ app.js
├─ assets // 정적 데이터들
│  ├─ fonts
│  ├─ icons
│  └─ images
│     ├─ dark
│     └─ light
├─ constants // 상수 모듈
├─ core // core 로직
├─ mocks // mock data
├─ scripts // js scripts
├─ store // global store
│  ├─ index.js
│  └─ reducer // reducer(state를 변경하는 함수들)
│     ├─ page.js
│     └─ theme.js
├─ styles // style files
├─ utils // util functions
├─ index.html
├─ style.css
├─ makeMocks.js
├─ package.json
└─ readme.md
```
