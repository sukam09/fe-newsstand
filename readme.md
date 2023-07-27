# 뉴스스탠드

## 네이밍 컨벤션

### HTML

* 단어 사이를 언더바(_)로 구분한다.
* 시맨틱 태그 사용을 지향한다.

### JS

* 단어 사이를 카멜케이스로 구분한다.
* HTML element는 대문자로 시작한다.

## 스타일

* reset.css와 constants.css 파일을 분리한다.

### reset.css

* 기본적인 스타일을 초기화한다.

### global.css

* 공통적으로 사용되는 스타일을 css variable로 지정한다.

## HTML 레이아웃 구조

### 전체

```bash

news_stand_wrapper
│
├── header.ews_stand_header
│   ├── title_wrapper
│   │   ├── logo
│   │   └── h1: title
│   ├── button#theme_toggle
│   │   └── svg
│   └── time
│
├── hedline_news_wrapper * 2
│   └── article.headline_news
│       ├── h2: title
│       └── news_title_wrapper
│
└── main
    ├── media_view_nav
    │   ├── media_select_wrapper
    │   │   └── media_select * 2
    │   │
    │   └── view_select_wrapper
    │       └── view_select * 2
    │
    └── media_view_wrapper
        ├── left_arrow
        │
        ├── media_view
        │   └── GRID or LIST
        │
        └── right_arrow

```

### 그리드

```bash
grid_wrapper
│
└── media_item
    └── li * 24
        └── img


```

### 리스트
  
```bash
list_wrapper
│
├── list_nav
│   └── media_select * n
│       └── indicator
│
└── list_view
    ├── media_info
    │   ├── logo
    │   ├── last_updated
    │   └── subscribe
    │
    ├── thumbnail_news
    │   ├── img
    │   └── title
    │
    └── sub_news_wrapper
        │── sub_news
        │   └── li * 6
        └── notice
```

## 코드 구조

![screenshot](https://github.com/jhynsoo/fe-newsstand/assets/38831776/afce6bca-e213-4ae3-b9a1-92e4b9e41df3)

## 기능 구현

### 헤더

* 로고 클릭 시 메인 페이지로 이동한다.
* 가운데에 테마 버튼이 있다.
* 우측에 현재 날짜가 표시된다.

### 헤드라인 뉴스

* 헤드라인 뉴스는 2개가 표시된다.
* 헤드라인 뉴스는 5초마다 변경된다.
* 헤드라인 뉴스에 마우스를 올리고 있는 동안은 뉴스가 변경되지 않는다.
