# :file_folder: 뉴스스탠드 3주차
### 기능 구현
2주차 때 못했던 기능 구현 이어서 하기

### 📍 카테고리바 기능 개발
- [x] 카테고리 데이터 받아오기(이름 및 개수)
- [x] 카테고리 누를 때마다 이동
- [x] press content에 페이지 이동 화살표로 카테고리 전환

### 📍 리스트뷰일 때 각각에 해당하는 뉴스 데이터 받아오기
- [x] JSON 데이터에 SubNews 목록 및 사진 데이터 추가
- [x] 화면에 따른 데이터 받아서 출력

![ezgif com-video-to-gif (3)](https://github.com/meanz1/fe-newsstand/assets/62049151/4156c594-1495-4771-86e7-47566c03a5ab)


### 📍 프로그레스바 효과주기
- [x] 프로그레스바 효과 넣기 (CSS)
- [x] 20초 지날 때마다 페이지 인덱스 변화주기 (JS)

![ezgif com-video-to-gif (2)](https://github.com/meanz1/fe-newsstand/assets/62049151/5894c1f9-a0ba-4712-90ba-9c175c7e3613)

(데모영상에서는 프로그레스바 진행 시간을 2초로 설정함)


### 배운 점 및 고민했던 점   
#### 시도한 것 및 배운 것
- Reduce 함수 사용(다양한 메소드 및 함수들 사용해보려 노력함)
  ```javascript
  const putSubTitles = categoryData.subNews.reduce((acc, _, idx)=> {
    return acc + `<span class="press-content-news-title">${categoryData.subNews[idx]}</span>`
  }, "");
  ```
  ```javascript
  const categoryMap = categoryNames.reduce((acc, curr) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {})
  ```
- JSON 데이터를 받아와서 카테고리 이름 및 개수 parsing 한 값 사용
  ```javascript
  const categoryPath = await fetchData("../assets/data/newspaperSrc.json");
  const categoryNames = categoryPath.newsList.map((elem) => elem.category);

  // 누적합 연산을 통한 카테고리 개수세기
  const categoryMap = categoryNames.reduce((acc, curr) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {})
  ```
- fetch를 이용하여 데이터 통신
  ```javascript
  export async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error : ", err);
    return null;
     }
   }
   ```
- 깃 이슈 생성하고, 각 이슈에 따른 브랜치 생성 및 개발 후 메인에 merge
  <a href='https://ifh.cc/v-p9ytJ6' target='_blank'><img src='https://ifh.cc/g/p9ytJ6.jpg' border='0'></a>
- constants 파일을 이용하여 매직 넘버 줄이기
  ```javascript
  // 롤링 뉴스 개수
   export const HEADLINE_ROLLING_NEWS_NUM = 5;
   
   // 좌 우 롤링 컨테이너 시간차
   export const HEADLINE_ROLLING_TIME_GAP = 1000;
   
   // 롤링 컨테이너 롤링 주기
   export const HEADLINE_ROLLING_TIME = 5000;
   ```


#### 고민했던 것
- 카테고리바에서 현재 페이지 및 전체 페이지 받아오는 부분  
  <a href='https://ifh.cc/v-FWolAd' target='_blank'><img src='https://ifh.cc/g/FWolAd.jpg' border='0'></a>
- 프로그레스 바 구현을 어떻게 할지


### 아쉬운 점 및 개선할 점
- 리스트뷰에 있다가 그리드뷰 갔다가 다시 리스트뷰에 오면 현재 페이지의 정보가 저장되는 것(현재 페이지 번호 초기화 해주어야함)
- 지식의 부족으로 여전히 설계에 어려움을 겪고 있는 것  
  <a href='https://ifh.cc/v-TfMW0v' target='_blank'><img src='https://ifh.cc/g/TfMW0v.jpg' border='0'></a>
- rAF로 프로그레스바 구현해보고 싶었는데 하지 못한 것
- 3주차 진도를 따라가지 못해 동료들이 하는 이야기를 온전히 알아듣지 못한 것

