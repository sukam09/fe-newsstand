# FE-newsstand

## 설계

![](./images/%EC%84%A4%EA%B3%84.png)

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

### **기능**

- [ ] 오늘 날짜 가져오기

- [ ] 그리드 뷰, 리스트 뷰 전환

- [ ] 그리드 아이템 랜덤 배치

- [ ] 그리드 페이지 전환
- [ ] 구독한 언론사: 리스트 보기

###
