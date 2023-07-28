# :file_folder: 뉴스스탠드 4주차
### 기능 구현
#### ✔️ 옵저버 패턴 만들기   
#### ✔️ 구독하기 기능 추가(그리드뷰)
<br>

### 📍 옵저버 패턴 만들기
- [x] store 파일 만들기
- [x] constants 파일 관리로 매직넘버 줄이기
- [x] 옵저버 패턴으로 코드 재구성하기

### 📍 구독하기 기능 추가(그리드뷰)
- [x] 마우스 호버시 구독하기 버튼 생성
- [x] 구독하기 -> 해지하기 버튼 변경
- [x] 내가 구독한 언론사로 이동
- [x] 내가 구독한 언론사 내 해지하기 누를 시 요소 삭제

![ezgif com-video-to-gif (5)](https://github.com/meanz1/fe-newsstand/assets/62049151/71a2f3a4-71f2-42b7-83de-236f37e3b5d4)
<br>

### 배운 점 및 어려웠던 점   
#### 시도한 것 및 배운 것
- 스토어 형식과 옵저버 패턴을 이용하여 코드를 재구성한 것    

   **Store.js 일부**
  ```javascript
  const nowCategoryName = initState({
    key: "categoryName",
    defaultState: "",
  });
  
  const gridPageIdx = initState({
    key: "gridPageIdx",
    defaultState: 0,
  });
  
  const isSubscribed = initState({
    key: "isSubscribed",
    defaultState: false,
  });
  
  const subscribedPress = initState({
    key: "subscribedPress",
    defaultState: [],
  });
  
  const allOfPress = initState({
    key: "allOfPress",
    defaultState: true,
  });
  ```   
  **Observer.js**
  ```javascript
  const globalStates = {};

  export function initState({ key, defaultState }) {
    globalStates[key] = {
      state: defaultState,
      observers: new Set(),
    };
    return key;
  }

  export function getState(key) {
    return globalStates[key].state;
  }
  
  export function setState(key, state) {
    globalStates[key].state = state;
    notify(key);
  }
  
  function notify(key) {
    globalStates[key].observers.forEach((observer) => {
      observer();
    });
  }
  
  export function register(key, observer) {
    globalStates[key].observers.add(observer);
  }

  ```
- css를 inline 요소로 넣지 않고 classList를 이용해서 넣는 이유를 완전히 이해 후 적용
  ```javascript
    eachElementOfGrid.forEach((elem) => {
      elem.addEventListener("mouseover", () => {
        elem.children[0].classList.remove("show-flex");
        elem.children[0].classList.add("hidden");
  
        elem.children[1].classList.remove("hidden");
        elem.children[1].classList.add("show-flex");
      });
    });
  ```
- 템플릿 리터럴 안에 삼항연산자 사용, img태그의 데이터 속성을 추가해서 사용한 것
  ```javascript
  page[nowGridIdx].forEach((elem) => {
    imgSrcContent += `
    <li>
      <img src="../assets/images/pressLogo/light/img${elem}.svg" data-key=${elem}>
      <div class="press-content-all-grid-view-btn hidden">
      ${
        subList.includes(elem)
          ? `<button class="all-grid-view-btn-unsub">x 해지하기</button>`
          : `<button class="all-grid-view-btn-sub">+ 구독하기</button>`
      } 
      </div>
    </li>`;
  });
  ```
- filter 사용 (1주차 때 설명들은 고차함수들 모두(map, filter, forEach, reduce) 이용!!)
  ```javascript
  function removeSubscribedPress(element) {
    const subList = getState(subscribedPress);
    const updateSubList = subList.filter((elem) => {
      return elem !== parseInt(element.children[0].dataset.key);
    });
    setState(subscribedPress, updateSubList);
  }
  ```




  
#### 어려웠던 점
- 옵저버 패턴 구현시 키 값의 상태를 변경해주는 setState가 register에서 등록된 함수 내에서 사용되다 보니 재귀로 무한 렌더링 되었던 점.
  -> 두 가지 키 값을 묶어서 객체로 관리 (렌더링 수 줄었다.)

```javascript
  const nowCategoryIdx = initState({
    key: "categoryIdx",
    defaultState: { category: 0, list: 1 },
  });
```
```javascript
  function selectCategory() {
    const categories = getQuerySelectorAll(".press-content-category");
    categories.forEach((elem) => {
      elem.addEventListener("click", (e) => {
        e.currentTarget.classList.add("selected");
        let newCateIdx = getState(nowCategoryIdx);
        newCateIdx.list = 1;
        newCateIdx.category = nameOfEachCategory.indexOf(
          e.currentTarget.children[1].textContent
        );
        setState(nowCategoryIdx, newCateIdx);
      });
    });
  }
```
- 처음(1주차) 설계부터 옵저버 패턴을 고려하지 않고 중간에 추가한 것이기 때문에 코드를 재구성할 때 register 메소드로 함수를 호출하는 위치를 잡는 점.

- git stash를 해놓고 브랜치를 이동했다가 stash apply를 다른 브랜치에서 해서 약간의 stash 이슈가 있었던 점.

- 기능이 많아지니 파일 관리하는 게 복잡해져서 어려웠던 점.



### 아쉬운 점 및 뿌듯한 점
- 리스트뷰 화면에서의 구독하기 기능 구현 아직 못한 것.
- css 파일에서 색상같은 값들을 변수로 관리하는 것.(이해는 하였으나 아직 적용하지 못했음)
- 리팩토링을 하지 못한 것.

