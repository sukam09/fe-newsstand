#FE - NEWS STAND

뉴스 스탠드 미션

## 요구사항

- [x] 기본화면
- [x] 최신 뉴스 자동 롤링 영역
  - 헤드라인 5개 5초마다 자동 무한 롤링
  - 좌우 시간차 1초로 동시 롤링 되지 않도록 설정
  - 마우스 호버시 무한 롤링 일시 정지 및 밑줄 표시
- [x] 전체 언론사: 그리드 보기
  - 그리드 뉴스 랜덤 배치
  - 그리드 좌우 이동
- [x] 전체 언론사: 리스트 보기
  - 콘텐츠 표시시간 20초 timeout 및 프로그레스바 애니메이션 구현
  - 언론사 순서 랜덤 배치
  - 카테고리 마지막 언론사가 보여진 후 카테고리 이동(마지막 카테고리일 시 첫 카테고리로)
  - 좌우 화살표 이동 및 선택도 가능해야함
- [x] 언론사 구독 기능(구독시 해지하기도 가능하게)
- [x] 구독시 스낵바 표시
- [x] 구독한 언론사: 리스트 보기
  - 드래그를 통한 탭 가로 스크롤
  - 언론사는 구독한 순서대로
  - 내가 구독한 언론사는 리스트가 default
- [x] 구독한 언론사: 그리드 보기
- [x] 구독해지 시 dialog 표시
- [x] 다크모드(선택)

## 추가 구현

### querySelector

- dfs 탐색으로 구현

![querySelector](<스크린샷 2023-07-27 오전 11.18.09.png>)

### querySelectorAll

- bfs 탐색으로 구현

![querySelectorAll](image.png)

### Promise

- `queueMicrotask api` 를 활용하여 직접 micro task queue에 비동기 로직 push 하여 비동기 작업 구현
- static 메서드 `resolve`, `reject`, `all` 구현

![Alt text](image-1.png)

### recoil을 참고한 observer store

- 한개의 Store로 전역상태 관리하는 것이 아닌 Atomic 하게 전역변수 관리
- `atom`, `useAtom` 함수를 통해 전역변수 init, get, set, subscribe 할수 있도록 구현
- `atom` 값을 활용한 로직을 재사용할 수 있도록 `selector` 구현
- `selector`, `useSelector` 함수를 통해 init, get, set 할수 있도록 구현

#### atom

![Alt text](image-6.png)
![Alt text](image-3.png)

#### selector

![Alt text](image-4.png)
![Alt text](image-5.png)

## 새로 배운점

### requestAnimationFrames

- `setTimeout`, `setInterval` 을 사용한 애니메이션에 `rAF` 적용
- 장점: 페이지 비활성화 상태에서 실행이 중지되기 때문에 cpu 리소스와 배터리 수명 낭비 막을 수 있다, 프레임 손실 방지, 코드의 가독성 증가

### 이벤트 위임

- 기존에는 버든 마다 event를 걸어줬는데 이벤트 위임을 사용해 공통 조상에 event listner를 한개만 거는 방식 사용
- 장점: 이벤트를 동적으로 생성해 주지 않아도 되고 이벤트를 한개만 사용하면 되기 때문에 메모리 절약 할 수 있다.
