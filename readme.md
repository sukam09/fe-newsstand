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

# 📌 배운점
1. css Selector 지정시 `>` 의 경우 바로 하위 자식, 공백의 경우 하위 모든 자식을 선택할 수 있다.
2. **css에서도 모듈화**를 진행할 수 있다. `@import('경로')`를 통해 여러 파일을 불러올 수 있다.
3. CommonJS의 `require()`를 통해 파일을 모듈화 할 수 있다. 하지만 ES6 이후 ES Module 방식이 표준으로 자리잡았다. `import`와 `export` 구문을 사용할 수 있다.
4. css의 transition의 경우 해당 속성이 변경될떄 발생, animation의 경우 생성될 떄 실행되는 속성이다. `rolling`, `progress bar`를 구현해보며 다양한 애니메이션을 경험해 보았다.
5. 콜백큐, 이벤트큐, 마이크로큐의 차이점에 대해 이해하였다. 먼저 콜백큐는 비동기 처리를 진행하고 난 뒤 해당 콜백 함수가 콜백큐에 대기하게 되고된다. 이벤트 큐의 경우 Event가 발생했을떄 실행하는 콜백 함수를 이벤트 큐에 저장한다. 마이크로 큐는 Promise와 관련된 콜백 함수들이 대기한다. 콜스택이 비어있을 시 이벤트 루프는 마이크로 큐 > 이벤트 큐 > 콜백 큐 를 순서로 콜스택으로 옮긴다.
6. 함수가 실행될떄  어떠한 방식으로 이벤트루프가 작동하는지 설명할 수 있다.
7. ProtoType과 this에 대해서 설명할 수 있다.


## 이벤트 루프

## ProtoType

## this


# 📌 느낀점


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
