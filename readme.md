# FE-newsstand

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

### **style**

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

  ![그리드 아이템 랜덤 배치](https://github.com/jjun990908/fe-newsstand/assets/39405559/25ed37cb-a42d-4a8b-9972-4f727f0b6a52)

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

  ![롤링 애니메이션 구현](https://github.com/jjun990908/fe-newsstand/assets/39405559/9c6ed2b6-fe49-4d90-9b41-f0764c05e4ac)

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

###
