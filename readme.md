![ezgif com-video-to-gif (1)](https://github.com/jjun990908/fe-newsstand/assets/39405559/2cc0b229-7ca7-4999-b125-1da558a9dac7)# FE-newsstand

## 설계

![](./assets/etc/%EC%84%A4%EA%B3%84.png)

## 구현 내용

### **html**

```html
<body>
  <section>
    <!-- 제목, 로고, 날짜 영역 -->
    <div>
      <!-- 제목, 로고 -->
    </div>
  </section>
  <section>
    <!-- 부제목 영역 -->
    <div>
      <!-- 부제목 -->
    </div>
    <div>
      <!-- 부제목 -->
    </div>
  </section>
  <section>
    <!-- 그리드 영역 -->
    <div>
      <!-- 제목 -->
      <!-- 버튼 -->
    </div>
    <div>
      <!-- 버튼 -->
      <!-- 그리드 -->
      <!-- 버튼 -->
    </div>
  </section>
</body>
```

# **💻 css 스타일**

- flex

  공통적으로 사용하는 css를 정의하여 재사용성을 높였습니다.

  ```css
  .flex_row {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .flex_column {
    display: flex;
    flex-direction: column;
  }
  ```

- grid

  `display: grid` 속성을 활용하여 grid를 생성하였습니다.
  `.grid_container` 의 **좌측과 상단** border를 설정하고,  
   `.grid_container > li` 의 **우측과 하단** border를 설정하여  
   border가 겹치는 현상을 해결하였습니다.

  ```css
  .grid_container {
    display: grid;
    border-top: solid 1px #d2dae0;
    border-left: solid 1px #d2dae0;
    grid-template-rows: repeat(4, 1fr);
    grid-template-columns: repeat(6, 1fr);
    ...;
  }

  .grid_item {
    border-right: solid 1px #d2dae0;
    border-bottom: solid 1px #d2dae0;
    ...;
  }
  ```

- 애니메이션

  - 롤링

    각 prev, now, next에 대한 속성은 javascript에서 `interval`로 변환 시켜주고
    transition을 통해 1초간 올라가는 모션의 애니메이션은 css에서 주었습니다.

    ```css
    .newsbanner__list--prev {
      top: -20px;
      display: block;
      transition: top 1s ease;
    }
    .newsbanner__list--now {
      top: 0px;
      display: block;
      transition: top 1s ease;
    }
    .newsbanner__list--next {
      top: 20px;
      display: block;
    }
    ```

  - 프로그레스 바

    프로그레스바가 들어있는 카테고리들에 모두 넣어주지만 clicked 된 카테고리만 `display:inline`속성을 부여해 보이도록 설계했습니다.

    ```css
    /* progress animation */
    .progressbar {
      display: none;
      position: absolute;
      background-color: #4362d0;
      height: 100%;
      width: 0px;
      top: 0;
      left: 0;
      z-index: 50;
      animation: scale 20s linear;
      animation-iteration-count: infinite;
    }
    @keyframes scale {
      to {
        width: 100%;
      }
    }
    ```

---

# **💻 기능**

- ## 오늘 날짜 가져오기

  형식을 맞추기 위해 formatting을 하기보다 보다 편한 방법이 있지 않을까 해서 검색해보니 `toLocalDateString`이라는 함수를 알게 되었는데, 이 함수에 인자로 `options`를 주면 원하는
  Date형식으로 커스텀해주는 기능을 알게되었습니다.

  ```javascript
  let today = new Date();
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "long",
  };
  today = today.toLocaleDateString("ko-KR", options);
  ```

  <br/>

- ## 그리드 아이템 랜덤 배치
  ![ezgif com-video-to-gif](https://github.com/jjun990908/fe-newsstand/assets/39405559/99764878-6ae3-4711-af50-ad7f2ba7ac3a)

  셔플 함수를 이용하여 `pressObj.js`에 있는 언론사의 리스트를 섞어주었고

  ```javascript
  // 언론사 랜덤 셔플
  function shuffleArray(array) {
    array.sort(() => Math.random() - 0.5);
    return array;
  }
  ```

  셔플된 리스트에 `createGridItem(element)`함수로 언론사의 이미지와 마우스 호버, 아웃 이벤트를 추가해준 후 `grid_container`안에 넣어주는 방법으로 그리드 아이템을 랜덤배치했습니다.

  ```javascript
  // 셔플된 리스트 그리드리스트에 append
  function appendGridList() {
    const gridContainerList = document.getElementsByClassName("grid_container");
    const shuffledArr = shuffleArray(pressObjArr);
    shuffledArr.forEach((element, idx) => {
      const id = Math.floor(idx / MAX_GRID_COUNT);
      const gridItem = createGridItem(element);
      gridContainerList[id].appendChild(gridItem);
    });
  }
  ```

    </br>

- ## 그리드 페이지 전환
  html에 미리 `grid_container`를 만들어 놓고 언론사 리스트를 넣어놓은 상태에서 `display:none`으로 보이지 않도록 막아준 후에 버튼클릭으로 각 페이지별로 `display` 속성을 바꿔주는 방식으로 페이지간 전환 기능을 구현하였습니다.
  ```javascript
  // 그리드 페이지 업데이트
  function showGridPage(increment) {
    const curPage = document.getElementById(`page${now_grid_page}`);
    now_grid_page += increment;
    const nextPage = document.getElementById(`page${now_grid_page}`);
    now_grid_page = Math.max(0, Math.min(now_grid_page, 3));
    curPage.style.display = "none";
    nextPage.style.display = "grid";
    showGridPageButton();
  }
  ```

</br>

- ## 롤링 애니메이션 구현
  ![ezgif com-video-to-gif (3)](https://github.com/jjun990908/fe-newsstand/assets/39405559/32d1af9b-6865-4301-a2aa-3b971056a1a3)

  좌우 롤링애니메이션을 따로 호버액션을 구현하기 위해 `rollingEvent`와 `createBannerItem`함수에서 state인자로 좌우를 구분하여 받아주었고, `createBannerItem`에서 마우스 호버, 아웃 이벤트 리스너를 추가해준 후에 appendChild하는 방식으로 구현하였습니다.

  ```javascript
  // 롤링에 들어갈 뉴스 리스트 추가
  function appendRollingList() {
    const rollingListContainerLeft = document.getElementsByClassName(
      "newsbanner__list-container--left"
    );
    const rollingListContainerRight = document.getElementsByClassName(
      "newsbanner__list-container--right"
    );
    for (let i = 0; i < ROLLING_NEWS_NUM; i++) {
      const leftItem = createBannerItem(i, rollingNewsContentLeft[i], "left");
      const rightItem = createBannerItem(
        i,
        rollingNewsContentRight[i],
        "right"
      );
      rollingListContainerLeft[0].appendChild(leftItem);
      rollingListContainerRight[0].appendChild(rightItem);
    }
  }
  ```

  좌우 배너간의 1초 차이를 구현하기 위하여 오른쪽 배너의 `setInterval` 안에 `setTimeout`으로 </br>
  1초 지연시켜주었습니다.

  ```javascript
  // 왼쪽 배너 롤링 반복
  let rollingIntervalLeft = setInterval(() => {
    rollingEvent("left");
  }, 5000);

  // 오른쪽 배너 롤링 1초 Timeout 후 반복
  let rollingIntervalRight = setInterval(() => {
    setTimeout(() => {
      rollingEvent("right");
    }, 1000);
  }, 5000);
  ```

</br>

- ## 프로그레스 바 카테고리 이동 기능 구현
  ![ezgif com-video-to-gif (2)](https://github.com/jjun990908/fe-newsstand/assets/39405559/7134d305-77a8-4e2a-b145-7d49175e0940)

  리스트뷰의 현재 페이지를 증가시켜주는 함수와 그에 따른 리스트 좌우 버튼과 카테고리를 업데이트를 해주는 함수를
  `CATEGORY_TAB_TIME`인 20초 마다 반복해주는 Interval을 멈추거나 시작하는 함수입니다.

  ```javascript
  export function stopCategoryInterval() {
    clearInterval(categoryInterval);
  }
  export function startCategoryInterval() {
    categoryInterval = setInterval(() => {
      listPageUp();
      updateCategoryClicked();
      updateListButton();
    }, CATEGORY_TAB_TIME);
  }
  ```

  프로그레스바가 진행중인 카테고리를 `$(".category_list--clicked")`를 사용하여 찾은 후, </br>
  `innerHTML`로 현재와 전체 페이지를 렌더링 해준 후,
  전체 페이지와 현재 페이지를 비교하며 다음 카테고리로 넘어가는 경우엔 `classList.remove`와 `add`를 통해 구현하였습니다.

  ```javascript
  // 카테고리 탭 숫자 업데이트
  function updateCategoryTabNum() {
    const firstCategory = $(".category_list");
    const clickedCategory = $(".category_list--clicked");
    clickedCategory.children[1].children[0].innerHTML = `${NOW_LIST_PAGE.getValue()} / `;
    if (
      // 다음 카테고리로 넘어가야할 경우
      isTabFull(clickedCategory.children[1].children[1].innerHTML)
    ) {
      if (clickedCategory.nextElementSibling === null) {
        firstCategory.classList.add("category_list--clicked");
        firstCategory.children[1].children[0].innerHTML = "1 / ";
        NOW_CATEGORY_IDX.setValue(0);
      } else {
        clickedCategory.nextElementSibling.classList.add(
          "category_list--clicked"
        );
        clickedCategory.nextElementSibling.children[1].children[0].innerHTML =
          "1 /";
        NOW_CATEGORY_IDX.incrementValue(1);
      }
      clickedCategory.classList.remove("category_list--clicked");
      NOW_LIST_PAGE.setValue(1);
    }
    appendNewsList();
  }
  ```

</br>

- ## 리스트 좌우 버튼 이동 기능 구현
  ![ezgif com-video-to-gif (1)](https://github.com/jjun990908/fe-newsstand/assets/39405559/3d7a1ded-7dc1-482a-8ab5-9de5b296052a)

  리스트 버튼을 각각 `$(".left_list_button")`와 같이 querySelector을 통해 값을 찾은 후 클릭 이벤트 함수를 지정하여 리스트뷰의 내용을 변경하도록 구현하였습니다.

  ```javascript
  leftListButton.addEventListener("click", () => {
    listArrowButtonClicked(-1);
  });
  rightListButton.addEventListener("click", () => {
    listArrowButtonClicked(1);
  });
  ```

  좌우간에 리스트 페이지의 변화가 카테고리에도 적용되야하므로 프로그레스 바의 애니메이션 타이밍도 재조정이 필요했는데, `offsetWidth`를 사용하여 프로그레스 애니메이션과 interval을 refresh 해주도록 구현하였습니다.

  ```javascript
  export function listArrowButtonClicked(increment) {
    if (NOW_LIST_PAGE.getValue() + increment === 0) {
      NOW_CATEGORY_IDX.incrementValue(-1);
      NOW_LIST_PAGE.setValue(
        categoryList[NOW_CATEGORY_IDX.getValue()].data.length
      );
    } else {
      NOW_LIST_PAGE.incrementValue(increment);
    }
    const clickedCategory = $(".category_list--clicked");
    clickedCategory.children[2].classList.remove("progressbar");
    clickedCategory.offsetWidth;
    clickedCategory.children[2].classList.add("progressbar");
    refreshInterval();
    updateListButton();
  }
  ```

  처음에는 프로그레스바를 삭제한 후 다시 추가하는 방식으로 애니메이션을 초기화해주고 싶었지만 </br>
  변화가 없어 검색을 해보니 브라우저는 아래의 순서로 렌더링을 진행하기 때문에 그렇다고 합니다.</br>

  > 1.  클래스가 존재하면 지운다</br>
  > 2.  브라우저는 변화를 감지하지만 바로 적용하지 않고 일단 넘어간다.</br>
  > 3.  클래스 다시 추가한다.</br>
  > 4.  모든 로직이 종료되고 보니 아무런 변화가 없다. 브라우저는 변화가 없으므로 렌더링을 하지 않는다.</br>

  이를 해결하기 위해 중간에 `offsetWidth`를 요청하면 강제로 브라우저가 계산하게 되어 로직이 바로 적용되는 원리입니다.

</br>

- ## 리스트 키보드 방향키를 통한 이동 기능 구현

  리스트와 그리드뷰에 공통적으로 좌우 이동 버튼이 있고 이를 개발하면서 결과를 확인할때 일일히 클릭하며 확인하기가 번거로워 키보드의 방향키를 입력받아 이동하는 기능이 있으면 좋겠다고 생각하여 추가기능으로 넣게 되었습니다.

  ```javascript
  window.addEventListener("keydown", (e) => {
    if (IS_GRID.getValue()) {
      if (e.key === "ArrowRight" && NOW_GRID_PAGE.getValue() < 3) {
        showGridPage(1);
      } else if (e.key === "ArrowLeft" && NOW_GRID_PAGE.getValue() > 0) {
        showGridPage(-1);
      }
    } else {
      if (
        e.key === "ArrowRight" &&
        (NOW_CATEGORY_IDX.getValue() !== CATEGORY_TAB_NUM ||
          NOW_LIST_PAGE.getValue() !==
            categoryList[CATEGORY_TAB_NUM].data.length)
      ) {
        listArrowButtonClicked(1);
      } else if (
        e.key === "ArrowLeft" &&
        (NOW_LIST_PAGE.getValue() - 1 > 0 || NOW_CATEGORY_IDX.getValue() !== 0)
      ) {
        listArrowButtonClicked(-1);
      }
    }
  });
  ```

  `IS_GRID`라는 현재 뷰의 상태를 보여주는 전역변수를 반환하는 객체를 통해 현재 보여지는 뷰에 대한 이동만 적용되도록 나누어주고, 인덱스를 넘어가지 않게 if문으로 조건을 걸어주어 구현하였습니다.</br></br>

  반환값인 `e`에서 `key`값을 통해 키보드의 버튼을 구분하는 것이 신기했고, 함수로 많이 구현하다 보니 함수를 재사용하여 금방 구현할 수 있어서, 다시 한 번 함수형 프로그래밍과 재사용성의 중요성을 알게되었습니다.
  </br>

---

## 고민했던 점

코드를 설계하고 정리하고나서 구현하지 않고, 기능부터 완성시키고 이를 정리하고 분리하려다보니, 전역변수는 물론 서로 의존성을 분리하기가 쉽지 않았습니다. 이를 해결하기 위해 먼저 종이에 그려보며 함수와 js들의 구조를 파악하고 전역변수와 여러 상수들을 따로 분리하며 코드 리팩토링을 진행했습니다.

---

## 개선 및 보완하고 싶은 점

- css를 적용할 때에 css를 전체 초기화하고 시작하지 않아서, 미세하게 주어진 디자인과의 차이가 보이는데, 이를 다시 초기화하고 다듬는 작업을 진행하여 css를 다시 개선시키고 싶습니다.
- css에서 색상코드와 같은 중복되는 값들을 변수화하여 재사용하고 보기 좋게 정리하고 싶습니다.
- 시간이 된다면 `createElement` 대신에 템플릿 리터럴을 이용하여 구현해보고 장단점을 느껴보고 싶습니다.
- 아직 코드상에서 `children`을 연속으로 부르는 등 긴 변수들이 자주 사용하고 있는데 이를 깔끔하게 정리하고 싶습니다.
