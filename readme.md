## 기능 구현

- [ ] 뉴스스탠드 이미지를 클릭시 그리드,전체언론사 보기 화면으로 렌더링된다.
- [ ] 오늘의 날짜를 표기한다.
- [ ] 왼쪽의 배너는 5초마다 돌아간다.
- [ ] 오른족 배너는 왼쪽배너가 돌아간 뒤 1초뒤에 돌아간다.
- [ ] 배너호버시에 롤링이 정지된다. (한쪽은 계속 돌아간다)
- [ ] 전체구독사보기에서 리스트,그리드 화면이 있다.
- [ ] 내가 선택한 구독사보기에서 리스트,그리드 화면이 있다.
- [ ] 그리드보기의 경우 더이상 볼 구독사가 없을 시 화살표가 사라진다.
- [ ] 카테고리엔 프로그레스바가 점점 찬다. 20초가 지날시 다음 구독사로 넘어간다.
- [ ] 리스트보기의 카테고리의 경우 끝에 도달할 시 다음은 첫 카테고리로 이어진다.
- [ ] 리스트화면에서 뉴스 사진에 마우스를 hover시 이미지가 확대 된다.
- [ ] 뉴스사를 구독할 시, 구독되었다는 스낵바를 띄우고, 5초 뒤 내가 선택한 구독사의 리스트화면으로 전환된다.
- [ ] 구독해제 시 `${구독사 이름}을 해제하시겠습니까` 란 alert를 띄운다.
- [ ] [추가미션] 다크모드기능

## 아쉬운 점

1. 사실 기능구현에 완벽하진 않았다.
   내가 선택한 구독사의 그리드보기에서 다음페이지로 넘어가는 화살표를 지웠다.
   다음 페이지가 있을 시, 화살표가 있어야 하는데 여기까진 구현을 못하였다..

2. 옵저버패턴을 적용하지 못했다.
   3주차쯤에 Store에 대해 배웠는데, 왜 필요한지 깨닫지 못하였다.
   3주차 막바지에 들어서야, 구독기능을 구현하며 아 이래서 스토어가 필요하구나란걸 알게 되었다.
   간단하게 클래스로 스토어를 구현하고 코드에 적용하였는데, 4주차엔 옵저버 패턴을 학습하였다.
   겨우 스토어로 적용을 다했는데, 여기서 옵저버로 또 바꾸라니 엄두가 안났다.

3. 기능구현관련해서 코드가 지저분하다.
   비슷한듯 하지만 반대의 방식으로 진행되는 코드들이 있다.
   어떻게 합치면 합쳐질 것 같긴한데.. 방법이 잘 떠오르지 않았다.
   if문으로 합치면 결국 똑같아질 것 같아서 일단은 냅뒀는데.. 보기에 좋지 않은 것 같다.

## 학습한 것들

1. 고차함수의 중요성
   고차함수를 잘 쓰면 코드가 훨씬 깔끔해지는걸 알게 되었다.
   코드가 더러워지면 고차함수를 잘 써보자!

2. 변수,함수이름은 잘 고민해서 정하자
   나중에 가니 변수,함수가 너무 많아져서 얘네가 무슨역할을 하는지 스스로도 헷갈렸다.
   처음부터 이름을 잘 정하자.
   함수는 동사+명사 변수는 명사로 의미가 명확하게 드러내자.
   ex)data보단 -> newsCategoryData

3. 기능구현시 확장성을 고려하자.
   첫주차에 너무 하드코딩식으로 짰다.
   그러다 보니 비슷한 기능의 함수들이 여러개가 되었다.
   코드수가 길어질 뿐만 아니라 재사용성이 없는 함수들이 되어버렸다.
   가능하면 인자로 받아서 처리가 가능하도록 하자.

4. 전역변수는 최대한 줄이자.
   전역변수 설정시에 의도치않은 변수를 사용하게 될 수도 있다. 전역변수는 최대한 자제하자.

5. 템플릿 리터럴을 잘 사용하자 (DOM접근을 줄이자)
   코드리뷰때마다 나온 말인데, DOM으로 객체를 만들거나 접근하게 되면 안좋다.
   DOM접근 자체가 자원을 매우매우매우 잡아먹는다. 따라서 템플릿리터럴로 HTML코드를 만들고,
   같은 노드를 DOM접근시엔, 변수선언을 하고 해당 변수로 메소드를 사용하자.

6. 기능 설계의 중요성
   기능이 나올 때마다 대충대충 이렇게이렇게 설계하고 넘어갔었다.
   설계를 대충해버리니 기능간에 의존성이 생겨버렸다.
   결국 다 지우고 다시 따로따로 모듈화하였다.
   이미지든 글이든 어떤 방식이든 좋다.
   처음부터 설계를 구체적으로 하고 기능구현에 들어가야한다.

7. 모듈화의 중요성
   함수들을 모듈화를 잘 해놓으니 다른 파일에서 재사용이 매우 편하였다.
   마지막 주차에는 있는 기능들을 적절히 가져다 쓰니 코드 쓸일이 매우 적어지기도 하였다.
   모듈화를 잘하면 기능구현에 매우 편하단걸 몸소 느꼈다.

## 가장 고민했던 내용

렌더링 되는 화면을 구분하고 싶었는데, 단순하게 display로 껐다 키니 다른 기능 구현에 쉽지 않았다.
아예 처음부터 렌더링을 구분하여 구조화하였다.
렌더링되는 화면이 4개여서 함수4개로 각각 해야하나 고민했는데,
전체모드와 구독모드로 처음부터 나눈 후 그리드,리스트모드를 판단하는 구조로 설계하였다.
app.js에서 초기렌더링,데이터설정,이벤트설정 -> 어떤화면을 렌더링할지 구분
크게 이런식으로 구분하였다.
완성하고보니 보기 깔끔해서 매우매우 뿌듯했다.

```
const renderMain = (subscribeStatus, pageMode) => {
  renderSubscribeTypeButton(subscribeStatus);
  clickSubscribeTypeButton();
  subscribeStatus === "all" ? renderAll(pageMode) : renderSubscribe(pageMode);
};

const renderAll = async (pageMode) => {
  return pageMode === "grid"
    ? renderGrid(logo)
    : renderCardList(await Stores.getOriginalNews());
};

const renderSubscribe = (pageMode) => {
  return pageMode === "grid"
    ? renderGrid(Stores.getSubscribeLogo())
    : renderCardList(Stores.getSubscribeNewsContent());
};
```

# 컨벤션

- add - 파일 추가
- Fix - 버그 수정
- Feature - 새로운 기능 추가
- Update - 일반적인 업데이트
- Chore - 다른 유형에 속하지 않는 것.
- 최종 파일에 해당 변경 사항을 포함하지 않고 싶을 때 선택
- Refactor- 코드/구조 리팩토링. 파일 이름 변경
- Docs - 문서 업데이트

- 항상 영어 소문자만을 사용. 카멜 케이스 등은 사용하지 않는다.

- 일반적으로 한 요소는 하이픈으로 연결. ex) (input-text, button-submit, modal-alert.. )

- 네이밍의 조합은 형태-의미-순서-상태 순으로 사용. ex) (button-submit-03-disable)

- 언더스코어는 파일, 폴더, 이미지 등에만 사용. ex) (image_elysia_asset_01.png)

- 숫자를 사용할 때는 확장성을 고려해 1, 2 이런 식으로 표현하지 않고 01, 02, 03… 혹은 001, 002, 003처럼 사용.

# 디렉토리구조

```
news_stand
   ├─ readme.md
   ├─ index.css
   ├─ index.html
   ├─ app.js
   ├─ css
   │  ├─ alert.css
   │  ├─ category.css
   │  ├─ constant.css
   │  ├─ newsMain.css
   │  ├─ reset.css
   │  ├─ rollingBanner.css
   │  └─ toggle.css
   ├─ img
   │  ├─ card_list.svg
   │  ├─ clicked_card_list.png
   │  ├─ clicked_grid.png
   │  ├─ dis-subscribe-button.svg
   │  ├─ grid.svg
   │  ├─ left_button.png
   │  ├─ moon.svg
   │  ├─ news
   │  │  ├─ dark
   │  │  │  ├─ 1~96.png
   │  │  └─ light
   │  │     ├─ 1~96.png
   │  ├─ news_stand.png
   │  ├─ right_button.png
   │  ├─ subscribe_button.svg
   │  ├─ subscribe_cancel_button.svg
   │  └─ sun.svg
   ├─ js
   │  ├─ alert.js
   │  ├─ category.js
   │  ├─ clickEvent
   │  │  ├─ addEventArrowGrid.js
   │  │  ├─ clickDarkMode.js
   │  │  ├─ clickPageTypeButton.js
   │  │  └─ clickSubscribeTypeButton.js
   │  ├─ core
   │  │  └─ Store.js
   │  ├─ drawNews.js
   │  ├─ newsStand.js
   │  ├─ render
   │  │  ├─ renderCardList.js
   │  │  ├─ renderGrid.js
   │  │  ├─ renderMain.js
   │  │  └─ renderSubscribeTypeButton.js
   │  ├─ rollingBanner.js
   │  ├─ setData
   │  │  ├─ fetchCategoryData.js
   │  │  └─ setDate.js
   │  └─ snackBar.js
   ├─ json
   │  ├─ news.json
   │  ├─ news_article.json
   │  └─ news_image.json
   └─ utils
      ├─ constants.js
      └─ utils.js

```
