## 최신 뉴스 자동 롤링 영역 설계
### 📋 html 설계
- wrap-rolling-news 요소는 position:absolute 로 설정한다
```html
 <section class="news-bar">
        <div class="news">
             <div class="wrap-rolling-news"></div>
        </div>
        <div class="news">
             <div class="wrap-rolling-news"></div>
        </div>
   </section>
```
### 📋 JS 설계 : wrap-rolloing-news 
1. 각각의 articles 배열에 맨 앞 두개 데이터만 html에 innerHTML로 삽입한다. 
<img src="https://github.com/hwangJN/fe-newsstand/assets/101038390/41e00a7a-321c-456f-a6c0-f5bbc9835564"/>

2. wrap-rolling-news 요소의 top position을 요소의 offsetY 만큼 변경한다(+transition: top)
<img  src="https://github.com/hwangJN/fe-newsstand/assets/101038390/24e9a67d-8ceb-49d7-9cd3-40286b4f6df5"/>

3. 
- articles 배열에서 맨 앞 요소를 삭제한 뒤 맨 뒤에 다시 삽입한다. 
- 다시 맨 앞 2개의 데이터로 innerHTML로 html 요소를 그린 다음 top position을 다시 0으로 변경한다(이때 transition은 unset)
<img src="https://github.com/hwangJN/fe-newsstand/assets/101038390/aae89e92-6ef5-4337-bfe6-fe981325a4b6"/>

## 리스트뷰 영역 설계
### 📋 html
```html
   <main class="list"></main>
```
### 📋 JS 설계
<b>1. 카테고리 탭과 뉴스목록 영역을 동적으로 생성 (innerHTML)</b>
```javascript
  createNewsList();
  createTabs();
```
- 탭을 생성할 때 첫번째 탭(기본 탭)은 이미 선택되어 있는 상태여야 한다. -> 해당 요소 class 다르게 지정

<b>2. 데이터를 fetch하여 변수에 저장한다</b>
``` javascript
async function fetchCategoryNewsData() {
  try {
    news_data = await fetchCategoryNews("../Data/category_news.json");
    fieldInit();
    createPressNewsSection();
  } catch (e) {
    console.error(e);
  }
}
```
- 각 카테고리의 언론사 개수를 전역변수로 넣고 카테고리의 페이지를 1로 초기화한다.
- 첫번째 카테고리의 전체 언론사 개수에 대한 현재 페이지 비율을 progress-bar로 나타낸다.
- 첫번째 카테고리의 첫번째 언론사에 대한 기사 데이터를 넣은 html요소를 만든다


<b>3. 각 탭의 이벤트 리스너를 등록한다</b>
```javascript
function tabClickEventRegister() {
  const tabs = document.querySelectorAll("main .news-list-wrap .each-tab");

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", fieldTabClickEventHandler.bind(this, tab, index));
  });
}
```
 - querySelectorAll 과 forEach를 활용하여 각각 카테고리 탭에 이벤트를 등록한다
 - 콜백함수에는 progress-tab을 변경하고, 해당 카테고리에 해당하는 뉴스 기사로 변경하는 함수를 넣는다.

<b>4. 자동으로 페이지&카테고리를 이동시키는 타이머를 생성한다.</b>
```javascript
intervalId = setInterval(() => {
    //카테고리 변경
    if (CURRENT_PAGE === news_data[CURRENT_CATEGORY].press.length) {
      CURRENT_CATEGORY++;
      CURRENT_PAGE = 0;
    }
    //카테고리 처음으로
    if (CURRENT_CATEGORY === categoryLength.length) {
      CURRENT_CATEGORY = 0;
      CURRENT_PAGE = 1;
    } else {
      CURRENT_PAGE++;
    }
    updatePressNewsSection();
    autoUpdateProgressTab();
  }, PAGE_AUTO_MOVING_TIME);
```
- setInterval 으로 n초마다 현재 페이지가 1씩 증가시키고 카테고리 변경이 되는 경우도 처리한다.
- 페이지&카테고리가 업데이트 되면 카테고리 탭과 뉴스 목록 내용을 변경시키는 함수를 실행시킨다.

---


### 7/10 구현 내용
- [x] 영역 안에서 헤드라인이 위로 올라가는 애니메이션이 적용
- [x] 각 롤링 바에서 헤드라인 뉴스 5개가 5초마다 자동으로 무한 롤링
- [x] 좌우 영역 롤링 1초 시간차
- [x] Hover 시 롤링을 모두 정지시키면서 underline 표시

### 7/11 구현 내용
- [x] 리스트 버튼 클릭 시 리스트 화면 표시
- [x] 각 분야 카테고리를 가로로 나열
- [x] 현재 순서 / 현재 카테고리 개수 구현 : 언론사 - 카테고리 매핑
- [x] Active(클릭) 시 Background color 변경

### 7/12 구현 내용 : 리스트 뷰
- [x] 현재 뉴스 목록 페이지 언론사와 구독버튼 나타내기
- [x] 현재 언론사의 기사들 나타내기
- [x] 다른 카테고리 클릭 시 해당 카테고리 1 페이지 언론사로 이동
- [x] 20초가 지나면 자동 페이지 변환 -> 현재 카테고리의 다음 언론사 기사 보기

### 7/13 구현 내용 : 리스트 뷰
- [x] 현재 카테고리 끝나면 다른 카테고리의 1 페이지 언론사로 이동
- [x] 페이지 변환시 progress-bar bgColor 비율 맞춰서 변환
- [x] 화살표 클릭시 페이지 이동
- [x] 새로고침 시 언론사 순서 변경
- [x] 기사 이미지 랜덤 변경 
