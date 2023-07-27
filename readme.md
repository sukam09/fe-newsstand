# FE-newsstand

소프티어 2기 news stand 프로젝트입니다.

## 디자인 패턴

### MVC 패턴

Model(store)과 View(component)를 분리하고 중재하는 역할을 하는 controller를 정의하였습니다.

### 옵저버 패턴

Model이 변하면 그와 관련된 View를 변하도록 하는 옵저버 패턴을 적용하였습니다.

## 기능

### 구독하기

(데모 영상)

### 구독 해지하기

(데모 영상)

### 다크모드

(데모 영상)

## 가장 어려웠던 점

### 1. 페이징

#### 페이징시 깜빡임 현상

어떻게 하면 페이지 전환시 빠르게 전환할 수 있을까 고민하였습니다.  
SPA처럼 흉내내어, 페이지 접속 시 모든 페이지를 렌더링해 놓는 방식으로 구현하였습니다.

모든 페이지를 렌더링하고 `display: none` 속성을 통해 모두 숨깁니다.  
필요한 페이지만 `display` 속성을 수정하여 화면에 보여줍니다.

#### 페이징 종류가 너무 많아요~!

다양한 페이징을 구현하면서 로직이 복잡해졌습니다.

pageType(그리드 뷰, 리스트 뷰), pageMode(전체보기, 내가 구독한 언론사 보기) state를 정의하였습니다.  
그리고 아래의 뷰들에 대해 사용하는 페이지 state를 따로 분리하였습니다.

- 그리드 뷰(전체보기)
- 리스트 뷰(전체보기)
- 그리드 뷰(내가 구독한 언론사 보기)
- 리스트 뷰(내가 구독한 언론사 보기)

위의 state를 활용해 필요한 페이지의 `display` 속성을 수정하면서 페이징을 구현하였습니다.

### 2. RAF를 활용해 프로그레스 바 애니메이션 구현

#### requestAnimationFrame ?

`requestAnimationFrame(callback)` 는 화면에 애니메이션을 업데이트할 준비가 될 때마다 콜백 함수를 호출합니다.  
콜백함수를 재귀적으로 구현하여 연속적인 애니메이션을 수행할 수 있습니다.

```javascript
let runningTime = 20000;
let start;

const callback = (timestamp) => {
  start === undefined ? (start = timestamp) : null;
  const elapsed = timestamp - start;

  ...

  percentage = (elapsed / runningTime) * 100;
  $progressbar.style.width = `${percentage}%`;

  raf = requestAnimationFrame(performAnimation);
};
```

`callback` 함수는 `timestamp`를 인자로 받습니다.
이를 활용해 애니메이션이 실행되고 경과된 시간을 알 수 있습니다.

경과된 시간에 비례하여 `progressbar.style.width`를 0~100%까지 변경되게 하였습니다.

#### 특정 상황에서 중지

특정 상황에서 애니메이션을 중지해야하는 상황이 있습니다.

```javascript
const callback = (timestamp) => {
  ...

  if (elapsed >= runningTime) {
    cancelAnimationFrame(raf);
    return;
  }

  if (!clicked) {
    cancelAnimationFrame(raf);
    return;
  }

  if (startPage !== getState(listPageState)) {
    cancelAnimationFrame(raf);
    return;
  }

  if (startMode !== getState(pageModeState)) {
    cancelAnimationFrame(raf);
    return;
  }
};
```

`callback` 함수가 재귀적으로 호출되며 애니메이션이 실행되고 있을 때,
특정 상황에서 애니메이션을 중지할 수 있습니다.  
20초가 경과 되었을때, 다른 카테고리가 클릭 되었을때, 페이지가 변경되었을 때 등 `if`문과 `cancelAnimationFrame` 함수를 통해 raf를 중지할 수 있습니다.
