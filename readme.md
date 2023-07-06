# 뉴스스탠드

## 네이밍 컨벤션

* 단어 사이를 언더바(_)로 구분한다.
* 시맨틱 태그 사용을 지향한다.

## 레이아웃 구조

  ```bash
  
  news_stand_wrapper
  │
  ├── header
  │     ├── title_wrapper
  │     └── time
  │
  ├── article_wrapper
  │     └── article
  │         ├── h2
  │         └── news_title_wrapper
  │   
  └── main
        ├── media_wrapper
        │   └── nav
        │       ├── media_select_wrapper
        │       └── media_select
        │           └── view_select
        ├── ul
        │   └── li
        │       └── img
        └── arrow_wrapper
            └── img
  ```
