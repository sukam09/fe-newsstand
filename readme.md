# 📌 TODO
> 바닐라JS로 네이버 뉴스스탠드를 구현한다.

# 📌 요구사항
- [x] 시멘틱 태그를 이용
- [x] DOM 조작시 여러 방식을 활용 (템플릿 리터럴, DOM APIS...)
- [x] mock 데이터를 JSON 파일로 관리
- [x] ES Modules를 사용하여 import/export로 모듈 관리
- [x] 커스텀 querySelector 구현
- [x] Store 객체 생성
- [x] Store - View 느슨하게 하기
- [ ] 커스텀 Promise 객체 만들기
- [x] 옵저버 패턴 이용
- [x] 이벤트 위임 사용

# 📌 기능구현
## 데모 영상

https://github.com/bae-sh/fe-newsstand/assets/37887690/f46da68d-4a70-449e-a30b-51d0a3b28e30

## querySelector
### 성능 비교
> 크롬브라우저의 Perfomance 탭을 이용하여 측정하였습니다. **Idle 부분은 성능 비교시 불필요한 시간**(녹화 클릭 시간)이므로 제외하고 비교를 진행하였습니다.  직접 구현한 querySelector 부분이 **50ms** 정도 빠른 것을 확인할 수 있습니다.

<div>
<h4>기존 DOM API querySelector <strong>(287ms)</strong></h4>
<img width="50%" alt="스크린샷 2023-07-14 오전 10 43 20" src="https://github.com/softeerbootcamp-2nd/fe-newsstand/assets/37887690/cafc65a1-bc00-4f05-9d29-c29f2be04916">
<h4>직접 구현한 querySelector  <strong>(222ms)</strong></h4>
<img width="50%" alt="스크린샷 2023-07-14 오전 10 43 59" src="https://github.com/softeerbootcamp-2nd/fe-newsstand/assets/37887690/73793050-a2d3-4c79-92ed-27aa2d7c4559">
</div>

### Code
``` javascript
const customQuerySelector = (selector, $target = document) => {
  const childNodes = [...$target.childNodes];
  const targetSelctor = selector.trim();
  const tagType = targetSelctor.charAt(0);
  const name = targetSelctor.slice(1);

  while (childNodes.length > 0) {
    const $node = childNodes.shift();

    if (tagType === '#' && $node.id === name) 
      return $node;
     else if (tagType === '.' && $node.classList && $node.classList.contains(name)) 
      return $node;
     else if ($node.tagName === targetSelctor.toUpperCase()) 
      return $node;
     else {
      const $result = customQuerySelector(selector, $node);
      if ($result) 
        return $result;
      
    }
  }

  return null;
};
```

``` javascript
const customQuerySelector = (selector, $target = document) => {
  const childNodes = [...$target.childNodes];
  const targetSelctor = selector.trim();
  const tagType = targetSelctor.charAt(0);
  const name = targetSelctor.slice(1);

  while (childNodes.length > 0) {
    const $node = childNodes.shift();

    if (tagType === '#' && $node.id === name) 
      return $node;
     else if (tagType === '.' && $node.classList && $node.classList.contains(name)) 
      return $node;
     else if ($node.tagName === targetSelctor.toUpperCase()) 
      return $node;
     else {
      const $result = customQuerySelector(selector, $node);
      if ($result) 
        return $result;
      
    }
  }

  return null;
};
```

# 📌 배운점
1. css Selector 지정시 `>` 의 경우 바로 하위 자식, 공백의 경우 하위 모든 자식을 선택할 수 있다.
2. **css에서도 모듈화**를 진행할 수 있다. `@import('경로')`를 통해 여러 파일을 불러올 수 있다.
3. CommonJS의 `require()`를 통해 파일을 모듈화 할 수 있다. 하지만 ES6 이후 ES Module 방식이 표준으로 자리잡았다. `import`와 `export` 구문을 사용할 수 있다.
4. css의 transition의 경우 해당 속성이 변경될떄 발생, animation의 경우 생성될 떄 실행되는 속성이다. `rolling`, `progress bar`를 구현해보며 다양한 애니메이션을 경험해 보았다.
5. 콜백큐, 이벤트큐, 마이크로큐의 차이점에 대해 이해하였다. 먼저 콜백큐는 비동기 처리를 진행하고 난 뒤 해당 콜백 함수가 콜백큐에 대기하게 되고된다. 이벤트 큐의 경우 Event가 발생했을떄 실행하는 콜백 함수를 이벤트 큐에 저장한다. 마이크로 큐는 Promise와 관련된 콜백 함수들이 대기한다. 콜스택이 비어있을 시 이벤트 루프는 마이크로 큐 > 이벤트 큐 > 콜백 큐 를 순서로 콜스택으로 옮긴다.
6. 함수가 실행될떄  어떠한 방식으로 이벤트루프가 작동하는지 설명할 수 있다.
7. function 키워드를 사용한 함수는 실행시에, 화살표 함수는 선언시에 가리키는 `this`를 할당한다. 만약 function 함수에 특정 this를 할당하고 싶을 경우 **bind, call** 과 같은 방식을 이용한다.
8. JS타이머와 css 애니메이션 타이머가 다르게 작동하기에 결과가 상이할 수 있다.


## 이벤트 루프


# 📌 느낀점

4주동안 네이버 뉴스스탠드를 만들어 보면서 기본기 역량을 키웠다. 매번 react 및 css 라이브러리를 이용하여 프로젝트를 작업하다 보니 react의 내부 동작과정, css의 우선순위 및 동작과정에 대해서 생각해 볼 기회가 적었다. 
html의 경우 div로만 만드는 것이 아닌 시멘틱 태그를 적절하게 사용하여 필요한 경우 class과 data-set을 이용하여 순수 html의 다양한 속성들을 알아볼 수 있었다. 

css에서는 기존에 썼던 라이브러리들이 왜 그렇게 만들었는가에 생각을 많이 했었다. 왜 css라이브러리들이 class Naming을 줄일 수 있는 방식을 고민하였는지 공감이 되었다. Naming을 하는데 시간이 많이 들었고 만약 겹치게 되면 의도치 않은 스타일이 적용된 경우가 있었다. 기획서에 나와있는 폰트, 색상 등등을 미리 css class에 작성을 해놓으니 색상에 대한 고민을 하지 않고 class만 추가하면 되기 때문에 보다 편리하게 스타일링을 할 수 있었던 것 같다. 또한, 처음으로 dark모드를 구현해 보면서 시각적으로 화려하게 변하기에 유저 입장에서는 엄청난 구현내용이 있을거 같지만 사실은 최상위 body 태그에 dark 클래스이름만 추가해줬을 뿐이다. 또한 rolling과 progress bar를 애니메이션으로 구현해보며 css 역량을 키웠다. `animation`의 경우 처음 해당 tag가 dom에서 생성될 당시 발생하게 되고 `transition`의 경우 해당 속성이 변경될떄 자연스럽게 변경할 수 있게 할 수 있다는 것이다. 이제 애니메이션을 적용해야 할 떄 보다 자신감을 가지고 구현할 수 있을 것 같다.

JS에 많은 것을 배웠다. 먼저 React의 컴포넌트 방식으로 구현을 진행하였다. 상태가 변할 경우에 해당 컴포넌트 및 하위 컴포넌트를 재렌더링을 진행하며 중요한 리소스 일경우 상태에 넣어 관리하였다. 하지만 프레임워크가 아닌 바닐라JS로 작업을 하다보니 코드의 일관성이 많이 떨어지는 느낌을 받아고 순간순간마다 자신과 타협을 하며 많은 예외를 발생시키는 나 자신을 볼 수 있었다. 유지보수 가능하고 좋은코드를 지향해야 하지만 현재 과제에서는 과제의 필요한 정도로 구현하는 것에 대해 고민을 많이 해보았던것 같다. 옵저버, Store와 같은 상태 관리를 직접 만들어 보면서 redux, recoil의 동작방식을 이해해 보았다. 해당 컴포넌트가 전역 리소스를 원하면 store에서 받아오며 그 컴포넌트는 구독된 상태가 된다. 만약 상태가 변하면 구독하고 있는 컴포넌트 전부는 변경되어야 한다. 그런데 react에서는 unmounted될떄 알아서 구독이 취소되지만 js에서는 어떠한 방식으로 해야하는지 해답을 찾이 못하였다. 이부분은 좀 더 고민해봐야겠다.

이 4주차동안 가장 많이 배웠던 부분은 JS 동작 과정인것 같다. JS에서 함수를 실행하면 JS엔진은 어떻게 동작을 하는지이다. 이때 콜스택, 태스크큐, 이벤트 루프에 대해서 공부를 해보고 머리속으로 동작을 그릴 수 있게 되었다. 이로 인해 **setTimer에 0초를 넣었을떄 왜 즉시 실행되지 않는지 또한 알게 되었다**. querySelector 또한 직접 구현해 보며 기존 querySelector의 경우 pre-order 순으로 노드를 탐색하는 것 또한 MDN 문서를 보며 알게 되었고 복잡한 기능까지는 구현해보지 못했지만 크롬 개발자 도구를 통해 성능을 비교해보았다(유의미한 비교인지는 잘 모르겠다). Promise 객체를 구현해 보기위해 오픈소스인 v8엔진을 클론받아 내부 동작과정을 확인해 보고 싶었으니 cpp로 만들어져 있기에 명확하게 알지는 못했다. 브라우저에서 JS를 실행하게 되면 JS엔진은 JS리터럴을 읽고 파서엔진이 추상구문트리로 변경하게되고 이는 컴파일되어 바이너리 코드로 변경되는 과정을 보며 흥미로웠다. 

4주동안 단순히 코딩실력보다는 **내부동작과정에 초점**을 맞추어 공부를 하여 문제가 발생했을시 문제분석을 보다 빠르고 정확하게 할 수 있을거라 생각이 든다. 

# 🥳 Pull Request

- [x] <a href = 'https://github.com/softeerbootcamp-2nd/fe-newsstand/pull/8'>1주차 PR</a>
- [x] <a href = 'https://github.com/softeerbootcamp-2nd/fe-newsstand/pull/35'>2주차 PR</a>
- [x] <a href = 'https://github.com/softeerbootcamp-2nd/fe-newsstand/pull/90'>3주차 PR</a>
- [x] <a href = 'https://github.com/softeerbootcamp-2nd/fe-newsstand/pull/126'>4주차 PR</a>


# 🗂️ 폴더 구조
```
fe-newsstand
📦src // 주요 소스코드 관리 폴더
 ┣ 📂assets // 멀티미디어 파일 관리 폴더
 ┣ 📂components // 컴포넌트 관리 폴더
 ┃ ┣ 📂all-news 
 ┃ ┣ 📂common
 ┃ ┣ 📂core
 ┃ ┣ 📂header
 ┃ ┣ 📂latest-news
 ┃ ┗ 📜App.js
 ┣ 📂constants // 상수 파일 관리 폴더
 ┣ 📂mocks // mock 데이터 파일 관리
 ┣ 📂utils // 유틸 함수 파일 관리
 ┗ 📜index.js
📦store
```
