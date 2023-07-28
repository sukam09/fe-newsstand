# 뉴스스탠드

[데모 링크](https://jhynsoo.github.io/fe-newsstand/)

## 레이아웃 구조

### 이미지

![screenshot](https://github.com/jhynsoo/fe-newsstand/assets/38831776/afce6bca-e213-4ae3-b9a1-92e4b9e41df3)

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

## 기능 구현

### 헤더

* 로고 클릭 시 메인 페이지로 이동한다.
* 테마를 전환할 수 있다.

### 헤드라인 뉴스

* 헤드라인 뉴스는 2개가 표시된다.
* 헤드라인 뉴스는 5초마다 변경된다.
* 헤드라인 뉴스에 마우스를 올리고 있는 동안은 뉴스가 변경되지 않는다.

### 언론사별 기사

* 그리드 보기와 리스트 보기를 전환할 수 있다.
* 전체 언론사와 내가 구독한 언론사를 구분하여 볼 수 있다.
