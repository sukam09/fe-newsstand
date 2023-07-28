## 1주차 목표

- 기본화면 구성 ⭕️
- 그리드 배치와 화면 전환 ⭕️

**7월 6일**

1. 페이지네이션
   오른쪽 버튼을 눌렀을때 랜덤하게 신문사가 나오도록 구현하기위해 어떻게 할 수 있을까 고민하다가

   페이지네이션과 비슷한 방식으로 구현하면 되겠다고 생각을했습니다. 우측 버튼이 클릭되면 페이지 값을 증가시켜 자식 노드를 추가하는

   방식으로 기능을 구현하였는데 누적되어 표현되는 문제가 발생했습니다. 이 문제점을 해결하기위해 자식노드를 삭제해야되는것을 깨닫고 자식노드를 삭제하는 방법을 찾아서 해결하였습니다.

2. Grid와 Flex
   뉴스스탠드의 그리드 영역에서 Grid와 Flex를 고민한 결과 Flex는 배치를 할때 어려운 부분이 있었고, UI가 [그리드 보기]인 만큼 Grid를 적용하기로 결정했습니다.

**7월 7일**

1. template literal로 전환 html로 작성된 문서를 template literal로 전환하는 과정에서, 어쩌면 간단하게 유지보수에 용이하게 파일을 분리하여 만들고자 했는데진행을하다보니 더 복잡해지고 중복되는 요소들이 많아졌다. 흐름을 파악하기 힘들어진 경우도 있어서 이를 어떻게 잘 해결해야할지 고민해봐야겠다. -> 기본적인 틀은 기존의 html 파일에 작성하기로 결정.
2. 파일들이 분리되고, A 파일에서 사용되던 함수가 B 파일에서도 사용하려고 생각해보니까 점점 더 복잡해졌다. 인자로 전달된 값도 계속 추적해서 모든 파일에서 동일한 값을 갖게 신경써주려니 어려움이 많았다.
   그래서 클래스를 적용시켜보기로 페어분과 상의를 했다. 클래스를 적용시키면 함수와 변수들을 일정하게 관리할 수 있었고 함수들간의 관계를 명확하게 할 수 있었다.
   -> 시간이 지나고 생각해보니까 굳이 클래스로 묶어서 할 필요가 있을까 생각이 든다.

## 2주차 목표

- 속보뉴스 롤링효과 구현 ⭕️
- 리스트보기 기본화면 구성 ⭕️
- 카테고리에 프로그래스 바 구현 ⭕️
- 카테고리 이동 (자동이동 & 버튼기반이동) ❌

**7월 10일**

1. 롤링효과 구현
   <img width="944" alt="스크린샷 2023-07-10 오후 5 46 59" src="https://github.com/devMingu/fe-newsstand/assets/96288558/ddbf6828-3e51-490a-920f-0036a5a181ad">

- 롤링효과를 처음 구현해봐서 어려움이 많았다. 혼자서는 도저히 좋은 생각이 떠오르지 않아서 구글링해서 자료를 검색하고 구현에 성공했다. 롤링효과는 간단하게 [대기, 진행, 완료] 3단계로 진행된다. 각각의 단계에 맞는 css를 집어넣으면 된다.

- 그리고 마우스를 올렸을때 밑줄 긋는 효과를 주는것은 생각보다 간단하게 해결했다. 해당 영역에 이벤틔스너를 달아 밑줄 효과를 주면 끝.

- 한가지 또 어려웠던 점은 무한롤링을 일시정지 시키는것이었다. 처음에는 css 효과를 안주면 될려나?하고 생각했지만 생각해보니 setInterval를 정지시키면 되는것이다.
  사실, 처음에는 setInterval 함수에 시간을 무한에 가깝게 준 다음 정지시킬려고했지만 잘 안됬다. 결국에는 setInterval 함수를 일시적으로 종료시켜야했기에 clearInterval 함수를 사용해서 해결했다.

2. 뉴스리스트 기본 틀 현재 진행중!

- 오늘은 기본틀까지 만들고, 프로그래스바를 계속해서 만들어볼 예정이다.
  <img width="944" alt="스크린샷 2023-07-10 오후 5 55 32" src="https://github.com/devMingu/fe-newsstand/assets/96288558/469406d5-e00a-4488-87f3-9435259018ac">

3. 다시한번 느끼는 리팩토링

- 오늘 롤링효과와 뉴스리스트를 구현하면서 코드가 다시 복잡해졌다. 내일은 전체구조를 다듬는 일을 하는게 좋을것같다.

**7월 11일**

1. 프로그래스 바 애니메이션 구현
   <img width="938" alt="스크린샷 2023-07-11 오후 6 09 09" src="https://github.com/devMingu/fe-newsstand/assets/96288558/4a52d8d6-a3b9-4515-8f9a-daffb455b834">

- 오늘은 하루종일 프로그래스 바를 구현하는데 시간을 보낸것 같다. 처음에는 단순하게 배경색상에 키프레임을줘서 채우면 되겠지 생각했는데 그리 간단하지 않았다. 흐릿한 배경이 존재하고 그 위에 배경을 서서히 채워야했다. 그러기위해서 css의 position값을 잘 활용할 수 있어야했다. 부모 태그에 position을 'relative'로 자식 태그의 position은 'absolute'로 위치 관계를 잘 잡아야한다. 이게 또 중요한 이유는 프로그래스 바 내부에 텍스트가 있기 때문에 영역을 잘 생각해서 구현해줘야했다.

- 처음에는 setInterval을 활용해서 width 값을 0부터 시작해서 일정값만큼 증가시켜서 구현을 했었다. 구현은 잘 되었는데 이상하게 페이지를 이동하다보면 채워지는 바의 속도가 점점 빨라지는것이었다. 왜 이런 문제가 발생하는지 몰랐는데 크롱의 강의를 들으면서 '콜 스택' '이벤트 루프' '콜백 큐'의 관계를 이해하니까 왜 속도가 빨라졌는지 이해할 수 있었다. 이 부분에대해서 정리를 해보자.

**7월 12일**

1. 프로그래스 바 선택 기반 구현
   ![화면_기록_2023-07-12_오후_6_01_28_AdobeExpress](https://github.com/softeerbootcamp-2nd/fe-newsstand/assets/96288558/5cbf4b6c-ba59-4cf4-8064-a42a6540fd8b)

- 카테고리를 감싸고 있는 부모 태그를 querySelectAll로 받아와서 자식 태그 전부에 이벤트리스너를 달았다.
- 특정 카테고리가 선택되면, 프로그래스가 진행중인 카테고리를 찾아 효과를 제거해준다.
- 제거가 완료되면, 선택된 카테고리에 프로그래스 바를 나타내는 클래스를 넣어준다.
- 원하는 횟수만큼 작동되지 않는것은 해결해야할 점이다.

**7월 13일**

1. 좌우 버튼 선택에 따라 카테고리 이동 기능 구현

   사실 좌우 버튼은 그리드보기할때도 사용되던 녀석들이다. 그래서 카테고리에 이동할때 같은 버튼을 사용하게되면 겹치는 문제가 발생하고 잘 작동되지 않는것을 알 수 있다. 그래서 어떤 방법이 있을까 생각해보다가 서로 역할에 맞는 버튼을 따로 만들기로 했다. 서로 다른 버튼이기에 겹치는 경우는 생각하지 않아도 좋다. 다만, 페이지가 변경될때 사용하지 않는 버튼에 display 속성에 none을 줘서 사용 불가능 상태로 만들어줬다.

   ⚠️ 발생한 문제점
   현재 보여지는 페이지를 전역변수로 잡고 어디에서나 사용할 수 있게 선언해줬는데, addEventListener 안에서 페이지 변수를 바꿨는데 이벤트리스너 스코프 안에서만 바뀌고 전역변수는 값이 그대로라서 자동이동 & 버튼 이동이 혼합되서 진행될때 서로 다른 페이지 값을 가지고 있어서 원하는 기능 구현이 되지 않았다.
   그래서 상태를 업데이트해주는 함수를 따로 만들어서 이벤트리스너 안에서 함수를 호출해서 모든 변수가 일정된 값을 가질 수 있도록 하였다.

   <img width="848" alt="스크린샷 2023-07-13 오후 6 20 16" src="https://github.com/devMingu/fe-newsstand/assets/96288558/0140ecfd-99c2-4126-b1e7-af57f96dcaf9">

2. 카테고리에 따른 뉴스 콘텐츠 보여주기

   뉴스 콘텐츠를 간단하게 json형식으로 만들어서 가져와서 보여주는 기능이다. 현재 선택된 카테고리를 추적해서 거기에 알맞은 뉴스를 보여주는 방식을 사용하기위해서 카테고리 선택을 인덱스로 관리해서 쉽게 접근할 수 있도록 전역변수를 만들어줬다.

   ![화면_기록_2023-07-13_오후_6_21_52_AdobeExpress](https://github.com/devMingu/fe-newsstand/assets/96288558/df214221-722d-4f85-85fd-e127c56bd76e)

**7월 14일**

1. 카테고리에 보여줄 콘텐츠가 남은 상태에서 우측 버튼을 클릭하면 다음 콘텐츠로 넘어가도록 구현.

   ⚠️ 전역변수로 선언된 현재 콘텐츠 페이지의 수가 한바퀴를 돌고나면 이상하게 +2씩 증가하고 +4씩 증가하는 이상한 현상을 겪는중이다.
   방금 든 생각인데 프로그래스 바 효과를 넣어줄때 이벤트리스너를 중첩해서 추가하는 것 같아서 발생하는 문제인 것 같다.
   우선 오류를 찾기위해서는 코드의 흐름부터 정리해서 수정한 다음에 코드를 수정해보자.
   ![화면_기록_2023-07-14_오후_6_40_12_AdobeExpress](https://github.com/devMingu/fe-newsstand/assets/96288558/9e235c4e-7f39-4220-ad4c-7b8baf4ca286)

   ❔ 무엇이 문제점이였을까?

   이벤트리스너에대한 이해부족이 가장 큰 문제였다. 그 이유는 현재 진행중인 카테고리와 다른 카테고리가 실행될때 해당 카테고리를 addProgressAction 함수를 호출해서 카테고리에 페이지와 프로그래스 바를 실행시켰다.

   ```javascript
   function 해당카테고리에_프로그래스바_추가() {
     element.children[0].addEventListener("animationiteration", callback);
     element.children[0].addEventListener("animationend", callback);
   }
   ```

   여기서 위에서 언급한 한바퀴를 돌고났을때 문제가 발생하던 지점이다. 한바퀴를 돌고나면 똑같은 카테고리에 이벤트리스너가 중복되어 적용이 된다. 따라서 +2씩 +4씩 증가하는 문제점이 발생한 것이였다. 이벤트 핸들링 과정을 이해하면 조금 더 빠르게 찾을 수 있던 문제점이지 않을까 싶다.

**7월 17일**

### 구독하기와 해제하기 기능 오류

### 오류 발생

1. '전체 언론사'에서 언론사 구독
2. '내가 구독한 언론사' 탭으로 이동하고 다시 '전체 언론사'로 넘어와서 구독한 언론사를 확인하면 구독이 안되어있음.
   ![구독하기_오류_AdobeExpress (1)](https://github.com/devMingu/fe-newsstand/assets/96288558/fb01f2dd-300f-4b8d-82ea-5a4ef83f174f)

### 정상적으로 진행될때

1. '전체 언론사'에서 언론사 구독
2. '내가 구독한 언론사' 탭으로 이동하고 구독된 언론사를 해제하기하고 다시 '전체 언론사'로 이동.
3. '전체 언론사'에서 언론사 구독
4. '내가 구독한 언론사' 탭으로 이동했다가 다시 '전체 언론사' 탭으로 넘어오면 구독이 되어있는것을 확인할 수 있음.
   ![구독하기_제대로_됨_AdobeExpress (1)](https://github.com/devMingu/fe-newsstand/assets/96288558/f44fd31d-4f5d-4fcc-b6d1-7d60836f8dcc)

### 예상하는 문제점

1. mouseover 타입의 이벤트리스너를 등록할때 버블링이 일어남. -> mouserenter 타입으로 변경했지만 별 소용없음.
   (가끔 오류발생나던 과정에서 제대로 동작할때도 있어서 위와같은 오류를 예상해봤음)

### 문제해결

생각보다 문제는 쉽게 해결됬다. 바로 코드를 잘못 작성해서 그렇다.

```javascript
// 변경전
const alt = isMySubscribe ? paintData[idx][0] : paintData[idx].imgSrc;
const icon = isMySubscribe ? paintData[idx][1] : paintData[idx].lightSrc;

// 변경후
const alt = isMySubscribe ? paintData[idx][0] : paintData[idx].name;
const icon = isMySubscribe ? paintData[idx][1] : paintData[idx].lightSrc;
```

변경전 alt 값에 imgSrc를 넣어줘서 발생한 문제였다. 당연히 구독목록에 존재하지 않는 값을 넣어주니 발생한 문제점이였다.
그래도 설계를 구체적으로해서 코드가 흘러가는 흐름을 잘 찾을 수 있어서 금방 오류를 해결했다.

**7월 18일**

### 코드 개선을 위해 단축평가 적용하기

뉴스스탠드 미션을 진행하면서 if문 사용을 지양하고자 삼항연산자를 많이 활용하는 패턴을 적용시켰다.

### 기존 코드의 문제점

- if문으로 충분한 문장에서 삼항연산자를 적용시킬때. 불 필요한 에로우 함수가 만들어져있다.

```javascript
// 구독을해지하면 바로 다시 그려준다. 삼항연산자 적용
const subList = subscribeState.getSubscribeState();
navTab.isMySubscribe ? paintNews(subList) : () => {};
```

### 기존 코드 개선

- 논리연산자를 활용한 단축평가

```javascript
// 구독을해지하면 바로 다시 그려준다. 단축평가 적용
const subList = subscribeState.getSubscribeState();
navTab.isMySubscribe && paintNews(subList);
```

### 요약

- 논리곱(&&): A && B 모두 true일때 B를 반환
- 논리합(||): A || B중 true를 만나면 바로 반환.

**7월 19일**

### [내가 구독한 언론사 카테고리 리스트에 반영하기](https://github.com/devMingu/fe-newsstand/issues/10)

---

### 잘 반영되어있는것처럼 보이지만 수정할게 많다.

![화면_기록_2023-07-19_오후_6_33_51_AdobeExpress](https://github.com/devMingu/fe-newsstand/assets/96288558/27c221b0-2aa4-4b80-acca-5248e745e467)

### 오류발생

'전체 언론사'와 '내가 구독중인 언론사' 두 개의 탭에
리스트 뷰에서의 이벤트리스너와 그리드 뷰에서의 이벤트리스너가 등록되어있어서 클릭될때마다 동시에 실행이되는 경우가있다. 이럴때 원하지 않는 코드까지 실행되어 서로 다른 영역에 영향을 미치게되고 원하지 않는 결과가 등장했다.
현재 보고있는 페이지를 참조하여 실행되는 조건을 바꿀 생각이다.

**7월 20일**

7월 19일에 발생한 문제점을 해결하기위해서는 사용자가 현재 보고있는 페이지를 담고있는 상태가 필요했다.
사용자가 보고있는 페이지가 '그리디' 페이지라면 해당 페이지에서 상태가 변경됬을때 '리스트' 페이지를 다시 그려주지 않아도 된다.
사용자가 보고있는 뷰를 관리하는 상태는 클래스를 사용했다.

```javascript
// 사용자가 포커스한 뷰가 어딘지 기억하는 ViewState 클래스
class ViewState {
  // '전체 언론사' or '내가 구독한 언론사'중 포커싱이 어디에 되어있는지? navTab
  // 사용자가 '그리드' or '리스트'뷰 중 어디를 포커싱하는지.
  constructor() {
    this.view = {
      navTab: {
        MY_PUBLISHER: false,
        ALL_PUBLISHER: true,
      },
      user: {
        grid: true,
        list: false,
      },
    };
  }
}
```

### 크롱님 코드리뷰 반영

- Spread operator 사용
  ```javascript
  // 수정전
  const categoryList = Array.from(categoryParent.children);
  // 수정후
  const categoryList = [...categoryParent.children];
  ```
- 객체에 직접적인 접근 피하기
  - View를 담당하는 클래스를 만들어서 메소드를통해 간접적으로 접근.
  ```javascript
  // 수정전
  navTab.isMySubscribe = true;
  // 수정후
  View.setNavTabView(VIEW.MY_SUB, true);
  ```

**7월 21일**

### 롤링 로직 리팩토링

```javascript
// 수정 전
function moveLeftContent() {
  // 왼쪽 뉴스 롤링 로직
}
function moveRightContent() {
  // 오른쪽 뉴스 롤링 로직
}

// 수정 후
function moveContent(position) {
  // position을 인자로 받아서 방향에 맞는 로직을 실행해준다.
  const headlineData =
    position === "right" ? rightHeadlineData : leftHeadlineData;
  // 생략 ...
}
```

### 구독하기 스낵바 추가

<img width="955" alt="스크린샷 2023-07-21 오후 6 43 43" src="https://github.com/devMingu/fe-newsstand/assets/96288558/91e53b7a-b3c7-4370-84ca-02b09cee7038">

---

**7월 24일**

### 구독하기 스낵바 수정 (7월 24일)

![스크린샷 2023-07-24 오후 10 16 21](https://github.com/devMingu/fe-newsstand/assets/96288558/6991b320-8ebe-4559-94b5-6bb4b7b786ea)

오늘은 리덕스 개념을 store에 적용시키는 작업을 했다. 예전에 리액트를 사용할때 리덕스를 사용해봐서 개념을 적용시키고 활용하는데에 시간이 엄청 걸리지는 않았지만 다양한 상태들을 관리하다보니까 dispatch 함수가 너무 많아져 버렸다...
(지금까지 최소 10개나 된다) 그리고 지금 dispatch 파일에 get하는 함수들도 넣어놨는데 이 부분은 내일 옮겨봐야겠다.

리덕스 개념 도입하는거는 위키에 정리해놨다!

### 고민했던 내용

지난번 스쿼드 세션에서 선아님이 알려주신 블로그를 참고해서 리덕스의 개념을 사용한 store를 사용했다. 이때, 다양한 변수들을 store로 관리하게되었다. 그러다보니 각각의 변수들에 맞는 set과 get 메소드를 만들면서 상당히 방대한 코드가 되었다. 물론, 실제로 사용할때는 코드가 줄어드는 효과도 보기도 했다.
<img width="955" alt="스크린샷 2023-07-24 오후 6 18 37" src="https://github.com/softeerbootcamp-2nd/fe-newsstand/assets/96288558/9fb2de4f-d186-46a3-853d-b4ad97ae790d">
위 사진에서 보이는 함수들이 총 18개나 있다...

두번째로 어려웠던 점은, 옵저버 패턴을 적용할때 발생했다. 내가 간단하게 이해한 옵저버 패턴은 상태가 변경됬을때 구독중인 함수를 실행시키는것으로 이해했다. 그래서 기존에 그리드 뷰와 리스트 뷰에서 사용중이던 paint 함수를 옵저버에 구독시켰다. 그렇지만 중요한 문제가 발생했는데 'call stack'이 담을 수 없을만큼 함수가 쌓이게 되었다. `Error: maximum call stack size exceeded`
paint함수 내에서 set함수를 호출하기때문에 paint -> set -> paint -> set -> paint .... 이 패턴을 계속 반복하는 것이다. 그래서 paint 함수에서 상태 변경을 해주는 상황들을 제거해줘야했다. 이 부분을 나눌때 어려웠고 코드가 방대해지면서 내 코드를 살짝 이해하기 어려웠었다.

```javascript
// 그리드 뷰에서의 옵저버에 넣어주는 함수
function gridObserved() {
  const subList = getSubscrbeList() || [];

  getUserView() === VIEW.GRID &&
    getNavTabView() === VIEW.MY_SUB &&
    paintNews(subList);

  getUserView() === VIEW.GRID &&
    getNavTabView() === VIEW.ALL_SUB &&
    paintNews();
}
```

```javascript
// 옵저버 패턴 적용 전
mySubscribe.addEventListener("click", () => {
  if (View.getUserView() === "list") {
    View.setNavTabView(VIEW.MY_SUB, true);
    paintNewsCategory();
  }
});

// 옵저버 패턴 적용 후
mySubscribe.addEventListener("click", () => {
  if (getUserView() === VIEW.LIST) {
    setNavTabViewToMy();
  }
});
```

**7월 25일**

### 내가 구독한 언론사와 기사내용이 달라서 어떻게 해결할지 고민했습니다

```javascript
// 기존 코드
export function makeNewsList(page, CATEROY_NUMBER, categoryDataList) {
  const idx = getCategoryIdx() % CATEROY_NUMBER;
  const data = categoryDataList[idx];
}

// 변경 코드
export function makeNewsList(page, CATEROY_NUMBER, categoryDataList) {
  const idx =
    getNavTabView() === VIEW.MY_SUB
      ? getSubscrbeList()[getCategoryIdx() % CATEROY_NUMBER][2]
      : getCategoryIdx() % CATEROY_NUMBER;

  const data =
    getNavTabView() === VIEW.MY_SUB
      ? [newsData[idx - 1]]
      : categoryDataList[idx];
}
```

### 문제점

- 리스트 페이지에서 사용자가 구독한 언론사와 기사 내용이 일치하지 않는 문제점 발생.

### 해결

- 사용자가 '내가 구독한 언론사' 탭을 보고있는 경우 미리 store에 저장되어있는 값을이용해서 newsData에 접근해서 넣어줬습니다

### 아쉬운 점

- 아직 해결해야할 오류가 많았는데 해당 오류를 발견하고 빠르게 해결할 수 있다는 생각이 들어서 수정하였는데 급하게하다보니 코드가 그렇게 깔끔하지 못한 것 같다. 그래서 내일은 이 부분을 개선하고 예외사항들을 처리할 생각이다.
- 그리고 전체 언론사 정보를 한번 더 fetch하기때문에 해당 데이터를 store에 저장해서 전역적으로 접근하는 방법을 고려해야할 것 같다.

**7월 26일**

### 고민한 점

언론사를 짧은간격으로 여러분 구독할때 n초뒤에 setTimeout 함수가 동시에 여러번 호출되면서
그만큼 랜더링이 반복해서 일어나는 현상이 발생함.

### 해결방법

새로운 setTimeout이 호출될때 기존에 호출된 setTimeout이 있다면 clear하고 새로운 setTimeout으로 바꿔서 해결했습니다.

### 해결 코드

```javascript
let snackBarTime;

export function snackBarAction(msg) {
  if (snackBarTime) {
    clearTimeout(snackBarTime);
  }
  const snackbar = document.querySelector(".modal__snack-bar");
  snackbar.classList.remove("modal__none");
  snackbar.textContent = msg;
  snackBarTime = setTimeout(snackBarCallBack(snackbar), 2000);
}
```

**7월 27일**

### 고민한 점

DOM을 조작하기위해서 querySelector를 활용해서 돔에 접근하는 경우가 많았다.
그런데 실제로 DOM Tree를 어떻게 탐색하는 걸까?

예전에 크롱이 말한 커스텀 querySelector를 구현하고자 오늘은 커스텀 쿼리를 구현하기로했다.

https://github.com/devMingu/fe-newsstand/issues/17 [이슈에 정리해놨다]
