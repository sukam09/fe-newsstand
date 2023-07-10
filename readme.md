**7월 6일**

1. 페이지네이션
   오른쪽 버튼을 눌렀을때 랜덤하게 신문사가 나오도록 구현하기위해 어떻게 할 수 있을까 고민하다가

   페이지네이션과 비슷한 방식으로 구현하면 되겠다고 생각을했습니다. 우측 버튼이 클릭되면 페이지 값을 증가시켜 자식 노드를 추가하는

   방식으로 기능을 구현하였는데 누적되어 표현되는 문제가 발생했습니다. 이 문제점을 해결하기위해 자식노드를 삭제해야되는것을 깨닫고 자식노드를 삭제하는 방법을 찾아서 해결하였습니다.

2. Grid와 Flex
   뉴스스탠드의 그리드 영역에서 Grid와 Flex를 고민한 결과 Flex는 배치를 할때 어려운 부분이 있었고, UI가 [그리드 보기]인 만큼 Grid를 적용하기로 결정했습니다.

**7월 7일**

1. template literal로 전환.html로 작성된 문서를 template literal로 전환하는 과정에서, 어쩌면 간단하게 유지보수에 용이하게 파일을 분리하여 만들고자 했는데진행을하다보니 더 복잡해지고 중복되는 요소들이 많아졌다. 흐름을 파악하기 힘들어진 경우도 있어서 이를 어떻게 잘 해결해야할지 고민해봐야겠다. -> 기본적인 틀은 기존의 html 파일에 작성하기로 결정.
2. 파일들이 분리되고, A 파일에서 사용되던 함수가 B 파일에서도 사용하려고 생각해보니까 점점 더 복잡해졌다. 인자로 전달된 값도 계속 추적해서 모든 파일에서 동일한 값을 갖게 신경써주려니 어려움이 많았다.
   그래서 클래스를 적용시켜보기로 페어분과 상의를 했다. 클래스를 적용시키면 함수와 변수들을 일정하게 관리할 수 있었고 함수들간의 관계를 명확하게 할 수 있었다.
   -> 시간이 지나고 생각해보니까 굳이 클래스로 묶어서 할 필요가 있을까 생각이 든다.

# 뉴스스탠드 기본 구조

header(#header)

- div (.header\_\_view)
  - i (.헤더로고) (.header—logo)
  - h1 (.헤더제목) (.header—title)
- div (.헤더 날짜) (.header—date)

main(#main)

- section2 (.main\_\_subview)
  - div (.main\_\_content)
    - div (.main—corp-name)
    - div (.main—news-box)
  - div (.main\_\_content)
    - div (.main—corp-name)
    - div (.main—news-box)
- section3 (#newsstand)
  - div (.newsstand\_\_media-nav)
    - div (.newsstand\_\_tab)
      - div (.newsstand—text-clicked)
      - div (.newsstand—text-unclicked)
    - div (.newsstand\_\_tab)
      - i (.newsstand—btn-list)
      - i (.newsstand-btn-thumb)
  - div (.newsstand\_\_media-area)
    - ul (.newsstand-area—six-col-list)
      - li (.newsstand—subscrtion-box)
      - li (.newsstand—subscrtion-box)
      - li (.newsstand—subscrtion-box)
      - li (.newsstand—subscrtion-box)
  - div (.newsstand--right-btn)
    - img
