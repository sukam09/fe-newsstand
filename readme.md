* add - 파일 추가
* Fix - 버그 수정
* Feature - 새로운 기능 추가
* Update - 일반적인 업데이트
* Chore - 다른 유형에 속하지 않는 것.
* 최종 파일에 해당 변경 사항을 포함하지 않고 싶을 때 선택
* Refactor- 코드/구조 리팩토링. 파일 이름 변경
* Docs - 문서 업데이트

* 항상 영어 소문자만을 사용. 카멜 케이스 등은 사용하지 않는다.

* 일반적으로 한 요소는 하이픈으로 연결. ex) (input-text, button-submit, modal-alert.. )

* 네이밍의 조합은 형태-의미-순서-상태 순으로 사용. ex) (button-submit-03-disable)

* 언더스코어는 파일, 폴더, 이미지 등에만 사용. ex) (image_elysia_asset_01.png)

* 숫자를 사용할 때는 확장성을 고려해 1, 2 이런 식으로 표현하지 않고 01, 02, 03… 혹은 001, 002, 003처럼 사용. 


```
news_stand
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
   │  │  │  ├─ 1.png
   │  │  │  ├─ 10.png
   │  │  │  ├─ 11.png
   │  │  │  ├─ 12.png
   │  │  │  ├─ 13.png
   │  │  │  ├─ 14.png
   │  │  │  ├─ 15.png
   │  │  │  ├─ 16.png
   │  │  │  ├─ 17.png
   │  │  │  ├─ 18.png
   │  │  │  ├─ 19.png
   │  │  │  ├─ 2.png
   │  │  │  ├─ 20.png
   │  │  │  ├─ 21.png
   │  │  │  ├─ 22.png
   │  │  │  ├─ 23.png
   │  │  │  ├─ 24.png
   │  │  │  ├─ 25.png
   │  │  │  ├─ 26.png
   │  │  │  ├─ 27.png
   │  │  │  ├─ 28.png
   │  │  │  ├─ 29.png
   │  │  │  ├─ 3.png
   │  │  │  ├─ 30.png
   │  │  │  ├─ 31.png
   │  │  │  ├─ 32.png
   │  │  │  ├─ 33.png
   │  │  │  ├─ 34.png
   │  │  │  ├─ 35.png
   │  │  │  ├─ 36.png
   │  │  │  ├─ 37.png
   │  │  │  ├─ 38.png
   │  │  │  ├─ 39.png
   │  │  │  ├─ 4.png
   │  │  │  ├─ 40.png
   │  │  │  ├─ 41.png
   │  │  │  ├─ 42.png
   │  │  │  ├─ 43.png
   │  │  │  ├─ 44.png
   │  │  │  ├─ 45.png
   │  │  │  ├─ 46.png
   │  │  │  ├─ 47.png
   │  │  │  ├─ 48.png
   │  │  │  ├─ 49.png
   │  │  │  ├─ 5.png
   │  │  │  ├─ 50.png
   │  │  │  ├─ 51.png
   │  │  │  ├─ 52.png
   │  │  │  ├─ 53.png
   │  │  │  ├─ 54.png
   │  │  │  ├─ 55.png
   │  │  │  ├─ 56.png
   │  │  │  ├─ 57.png
   │  │  │  ├─ 58.png
   │  │  │  ├─ 59.png
   │  │  │  ├─ 6.png
   │  │  │  ├─ 60.png
   │  │  │  ├─ 61.png
   │  │  │  ├─ 62.png
   │  │  │  ├─ 63.png
   │  │  │  ├─ 64.png
   │  │  │  ├─ 65.png
   │  │  │  ├─ 66.png
   │  │  │  ├─ 67.png
   │  │  │  ├─ 68.png
   │  │  │  ├─ 69.png
   │  │  │  ├─ 7.png
   │  │  │  ├─ 70.png
   │  │  │  ├─ 71.png
   │  │  │  ├─ 72.png
   │  │  │  ├─ 73.png
   │  │  │  ├─ 74.png
   │  │  │  ├─ 75.png
   │  │  │  ├─ 76.png
   │  │  │  ├─ 77.png
   │  │  │  ├─ 78.png
   │  │  │  ├─ 79.png
   │  │  │  ├─ 8.png
   │  │  │  ├─ 80.png
   │  │  │  ├─ 81.png
   │  │  │  ├─ 82.png
   │  │  │  ├─ 83.png
   │  │  │  ├─ 84.png
   │  │  │  ├─ 85.png
   │  │  │  ├─ 86.png
   │  │  │  ├─ 87.png
   │  │  │  ├─ 88.png
   │  │  │  ├─ 89.png
   │  │  │  ├─ 9.png
   │  │  │  ├─ 90.png
   │  │  │  ├─ 91.png
   │  │  │  ├─ 92.png
   │  │  │  ├─ 93.png
   │  │  │  ├─ 94.png
   │  │  │  ├─ 95.png
   │  │  │  └─ 96.png
   │  │  └─ light
   │  │     ├─ 1.png
   │  │     ├─ 10.png
   │  │     ├─ 11.png
   │  │     ├─ 12.png
   │  │     ├─ 13.png
   │  │     ├─ 14.png
   │  │     ├─ 15.png
   │  │     ├─ 16.png
   │  │     ├─ 17.png
   │  │     ├─ 18.png
   │  │     ├─ 19.png
   │  │     ├─ 2.png
   │  │     ├─ 20.png
   │  │     ├─ 21.png
   │  │     ├─ 22.png
   │  │     ├─ 23.png
   │  │     ├─ 24.png
   │  │     ├─ 25.png
   │  │     ├─ 26.png
   │  │     ├─ 27.png
   │  │     ├─ 28.png
   │  │     ├─ 29.png
   │  │     ├─ 3.png
   │  │     ├─ 30.png
   │  │     ├─ 31.png
   │  │     ├─ 32.png
   │  │     ├─ 33.png
   │  │     ├─ 34.png
   │  │     ├─ 35.png
   │  │     ├─ 36.png
   │  │     ├─ 37.png
   │  │     ├─ 38.png
   │  │     ├─ 39.png
   │  │     ├─ 4.png
   │  │     ├─ 40.png
   │  │     ├─ 41.png
   │  │     ├─ 42.png
   │  │     ├─ 43.png
   │  │     ├─ 44.png
   │  │     ├─ 45.png
   │  │     ├─ 46.png
   │  │     ├─ 47.png
   │  │     ├─ 48.png
   │  │     ├─ 49.png
   │  │     ├─ 5.png
   │  │     ├─ 50.png
   │  │     ├─ 51.png
   │  │     ├─ 52.png
   │  │     ├─ 53.png
   │  │     ├─ 54.png
   │  │     ├─ 55.png
   │  │     ├─ 56.png
   │  │     ├─ 57.png
   │  │     ├─ 58.png
   │  │     ├─ 59.png
   │  │     ├─ 6.png
   │  │     ├─ 60.png
   │  │     ├─ 61.png
   │  │     ├─ 62.png
   │  │     ├─ 63.png
   │  │     ├─ 64.png
   │  │     ├─ 65.png
   │  │     ├─ 66.png
   │  │     ├─ 67.png
   │  │     ├─ 68.png
   │  │     ├─ 69.png
   │  │     ├─ 7.png
   │  │     ├─ 70.png
   │  │     ├─ 71.png
   │  │     ├─ 72.png
   │  │     ├─ 73.png
   │  │     ├─ 74.png
   │  │     ├─ 75.png
   │  │     ├─ 76.png
   │  │     ├─ 77.png
   │  │     ├─ 78.png
   │  │     ├─ 79.png
   │  │     ├─ 8.png
   │  │     ├─ 80.png
   │  │     ├─ 81.png
   │  │     ├─ 82.png
   │  │     ├─ 83.png
   │  │     ├─ 84.png
   │  │     ├─ 85.png
   │  │     ├─ 86.png
   │  │     ├─ 87.png
   │  │     ├─ 88.png
   │  │     ├─ 89.png
   │  │     ├─ 9.png
   │  │     ├─ 90.png
   │  │     ├─ 91.png
   │  │     ├─ 92.png
   │  │     ├─ 93.png
   │  │     ├─ 94.png
   │  │     ├─ 95.png
   │  │     └─ 96.png
   │  ├─ news_stand.png
   │  ├─ right_button.png
   │  ├─ subscribe_button.svg
   │  ├─ subscribe_cancel_button.svg
   │  └─ sun.svg
   ├─ index.css
   ├─ index.html
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
   ├─ readme.md
   └─ utils
      ├─ constants.js
      └─ utils.js

```