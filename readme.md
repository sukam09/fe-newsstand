# :file_folder: 뉴스스탠드 2주차
### 필요기능(2주차) 
#### 최신 뉴스 자동 롤링 영역
- [X] 왼쪽 바와 오른 쪽 바 각각 다른 최신 뉴스의 헤드라인 5개가 5초마다 자동으로 무한 롤링
- [X] 좌우 영역의 시간차는 1초 (= 두 영역의 뉴스가 동시에 롤링 X)
- [X] 각 영역에 마우스를 호버하면, 무한 롤링 일시정지 후 헤드라인에 밑줄 표시
   
![ezgif com-video-to-gif](https://github.com/softeerbootcamp-2nd/fe-newsstand/assets/62049151/3e41cd92-644d-4daa-90d4-b8e7f4bff87e)   
(시연을 위해 자동롤링 시간을 3초로 변경)

#### 전체 언론사 : 리스트 보기
- [X] 언론사 리스트 뷰 html, css 구현
- [X] 언론사 리스트 뷰와 그리드 뷰 전환 가능
- [X] 선택된 카테고리의 이름 옆에 전체 언론사 개수 및 현재 언론사의 순서 표시
- [ ] 새로고침시 언론사 순서 랜덤 배정
- [ ] 프로그래스바 구현
- [ ] 한 언론사당 프로그래스바에 20초 시간 부여 및 20초 후 다음 언론사로 전환
- [ ] 선택된 카테고리의 마지막 언론사의 할당 시간(20초)이 지날 경우 다음 카테고리로 전환
- [ ] 좌우 화살표를 통해 이전/이후 언론사 즉시 변경 가능

![ezgif com-video-to-gif (1)](https://github.com/softeerbootcamp-2nd/fe-newsstand/assets/62049151/1191698a-2bfa-4004-9cdb-1038ed119c5f)
<br><br><br>
### 학습 목표 및 계획   
- [X] 함수 단위로 애플리케이션 나누기
- [X] ES Modules을 사용하여 모듈단위 프로그래밍 개발하기
- [X] 가시적인 폴더 구조 만들기
- [X] 범용성을 고려한 util 모듈 만들기
- [X] 개발 목적 및 구조 명확하게 이해하기
- [X] 깃 커밋 컨벤션 지키기
<a href='https://ifh.cc/v-AxXcNz' target='_blank'><img src='https://ifh.cc/g/AxXcNz.jpg' border='0'></a>
- [X] fetch를 이용해 JSON객체 데이터 받아오기
```javascript
export async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log("Error : ", err);
    return null;
  }
}
```

```javascript
const imgPath = await fetchData("../assets/data/newspaperSrc.json");
  const imgId = imgPath.newsList.map((elem) => {
    return elem.id;
  })
```
<br><br><br>
### 설계
<a href='https://ifh.cc/v-1OMqfJ' target='_blank'><img src='https://ifh.cc/g/1OMqfJ.jpg' border='0'></a>
<a href='https://ifh.cc/v-ozkAbJ' target='_blank'><img src='https://ifh.cc/g/ozkAbJ.jpg' border='0'></a>
<br><br><br>
### 구조   
```bash
├── assets
│   ├── data
│   │   ├── newsTitle.json (헤드라인 뉴스 자동롤링 구현 시 필요한 데이터)
│   │   └── newspaperSrc.json (언론사 그리드 뷰에서 필요한 데이터)
│   └── images
│       ├── pressLogo
│       │   ├── dark (다크모드에서 사용하는 언론사 이미지)
│       │   └── light (라이트모드에서 사용하는 언론사 이미지)
│       └── symbols (언론사 이미지를 제외하고 사용하는 여러 심볼 이미지)
├── css
│   ├── header (헤더에서 사용하는 css)
│   │   └── header.css
│   ├── newsbar (자동롤링 구현 시 사용하는 css)
│   │   └── rolling.css
│   ├── pressContent (언론사 그리드/리스트 뷰 구현 시 사용하는 css)
│   │   └── pressContent.css
│   └── style.css (공통으로 사용하는 css)
├── index.html (메인 html 파일)
├── readme.md
├── script
│   ├── app.js (html 파일과 이어주는 js)
│   ├── header (헤더에서 사용하는 js)
│   │   └── showTodayDate.js
│   ├── newsbar (자동롤링 구현 시 사용하는 js)
│   │   └── rolling.js
│   └── pressContent (언론사 그리드/리스트 뷰 구현 시 사용하는 js)
│       ├── pressGridList.js
│       └── pressViewChange.js
└── utils (범용성을 고려해 다른 프로젝트에서도 사용할 수 있는 파일)
    ├── css 
    │   └── reset.css (css 초기화 파일)
    └── js
        ├── getElements.js (원하는 요소를 얻을 수 있는 함수 재구조화)
        └── getJson.js (fetch를 이용해 데이터를 주고 받는 js파일)
```
<br><br><br>
### 배운 점 및 고민했던 점   
#### 범용성

- 모듈화

```javascript
import { startRolling, getNewsHeadline } from './newsbar/rolling.js';
import { pressViewChange } from './pressContent/pressViewChange.js';
import { showDate } from './header/showTodayDate.js';
import { shuffleImgs, changePressGrid } from './pressContent/pressGridList.js';
```
+  다른 프로젝트에서도 사용할 수 있는 util 생성   

```javascript
function getElemId(base, id) {
  return base.getElementById(id);
}

function getElemClass(base, className) {
  return base.getElementsByClassName(className);
}

function getQuerySelector(base, selector) {
  return base.querySelector(selector)
}

function getQuerySelectorAll(base, selector) {
  return base.querySelectorAll(selector);
}

export { getElemId, getElemClass, getQuerySelector, getQuerySelectorAll };
```


#### 가독성
- 고차함수(map, forEach)를 사용하려고 노력
- 시맨틱한 함수, 변수 명 설정
- 삼항연산자 사용
- 최대한 함수 인자 사용
```javascript
// 각각의 페이지에 올바른 뉴스데이터 나타내기
function showPressImg(flag) {
  const pressContentView = getElemClass(document, 'press-content-view');
  pageNumber = (flag >= 0) ? ++pageNumber : --pageNumber;

  sectionPrevButton.style.visibility = pageNumber !== 0 ? "visible" : "hidden";
  sectionNextButton.style.visibility = pageNumber >= 3 ? "hidden" : "visible";
  let imgSrcContent = "";
  page[pageNumber].forEach((elem) => {
    imgSrcContent += `<li><img src="../assets/images/pressLogo/light/img${elem}.svg"</li>`;
  })
  pressContentView[0].innerHTML = imgSrcContent;
}
```

<br><br><br>
### 아쉬운 점 및 개선할 점
- 지식의 부족으로 설계에 어려움 겪음(거의 할 수 없었음)...
- 시맨틱한 함수 및 변수 이름 설정하기
- html에서 좀 더 시맨틱한 태그 사용하기
- 매직넘버를 사용하기
- classList 사용하여 DOM객체 불러오는 것 줄이기

