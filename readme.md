## 1주차 목표

- 기본화면 구성 ⭕️
- 그리드 배치와 화면 전환 ⭕️

**7월 6일**

1. 페이지네이션
   오른쪽 버튼을 눌렀을때 랜덤하게 신문사가 나오도록 구현하기위해 어떻게 할 수 있을까 고민하다가

   페이지네이션과 비슷한 방식으로 구현하면 되겠다고 생각을했습니다. 우측 버튼이 클릭되면 페이지 값을 증가시켜 자식 노드를 추가하는

   방식으로 기능을 구현하였는데 누적되어 표현되는 문제가 발생했습니다. 이 문제점을 해결하기위해 자식노드를 삭제해야되는것을 깨닫고 자식노드를 삭제하는 방법을 찾아서 해결하였습니다.

2. Grid와 Flex
   뉴스스탠드의 그리드 영역에서 Grid와 Flex를 고민한 결과 Flex는 배치를 할때 어려운 부분이 있었고, UI가 [그리드 보기]인 만큼 Grid를 적용하기로 결정했습니다.

**7월 7일**

1. template literal로 전환 html로 작성된 문서를 template literal로 전환하는 과정에서, 어쩌면 간단하게 유지보수에 용이하게 파일을 분리하여 만들고자 했는데진행을하다보니 더 복잡해지고 중복되는 요소들이 많아졌다. 흐름을 파악하기 힘들어진 경우도 있어서 이를 어떻게 잘 해결해야할지 고민해봐야겠다. -> 기본적인 틀은 기존의 html 파일에 작성하기로 결정.
2. 파일들이 분리되고, A 파일에서 사용되던 함수가 B 파일에서도 사용하려고 생각해보니까 점점 더 복잡해졌다. 인자로 전달된 값도 계속 추적해서 모든 파일에서 동일한 값을 갖게 신경써주려니 어려움이 많았다.
   그래서 클래스를 적용시켜보기로 페어분과 상의를 했다. 클래스를 적용시키면 함수와 변수들을 일정하게 관리할 수 있었고 함수들간의 관계를 명확하게 할 수 있었다.
   -> 시간이 지나고 생각해보니까 굳이 클래스로 묶어서 할 필요가 있을까 생각이 든다.

## 2주차 목표

- 속보뉴스 롤링효과 구현 ⭕️
- 리스트보기 기본화면 구성 ⭕️
- 카테고리에 프로그래스 바 구현 ⭕️
- 카테고리 이동 (자동이동 & 버튼기반이동) ❌

**7월 10일**

1. 롤링효과 구현
   <img width="944" alt="스크린샷 2023-07-10 오후 5 46 59" src="https://github.com/devMingu/fe-newsstand/assets/96288558/ddbf6828-3e51-490a-920f-0036a5a181ad">

- 롤링효과를 처음 구현해봐서 어려움이 많았다. 혼자서는 도저히 좋은 생각이 떠오르지 않아서 구글링해서 자료를 검색하고 구현에 성공했다. 롤링효과는 간단하게 [대기, 진행, 완료] 3단계로 진행된다. 각각의 단계에 맞는 css를 집어넣으면 된다.

- 그리고 마우스를 올렸을때 밑줄 긋는 효과를 주는것은 생각보다 간단하게 해결했다. 해당 영역에 이벤틔스너를 달아 밑줄 효과를 주면 끝.

- 한가지 또 어려웠던 점은 무한롤링을 일시정지 시키는것이었다. 처음에는 css 효과를 안주면 될려나?하고 생각했지만 생각해보니 setInterval를 정지시키면 되는것이다.
  사실, 처음에는 setInterval 함수에 시간을 무한에 가깝게 준 다음 정지시킬려고했지만 잘 안됬다. 결국에는 setInterval 함수를 일시적으로 종료시켜야했기에 clearInterval 함수를 사용해서 해결했다.

2. 뉴스리스트 기본 틀 현재 진행중!

- 오늘은 기본틀까지 만들고, 프로그래스바를 계속해서 만들어볼 예정이다.
  <img width="944" alt="스크린샷 2023-07-10 오후 5 55 32" src="https://github.com/devMingu/fe-newsstand/assets/96288558/469406d5-e00a-4488-87f3-9435259018ac">

3. 다시한번 느끼는 리팩토링

- 오늘 롤링효과와 뉴스리스트를 구현하면서 코드가 다시 복잡해졌다. 내일은 전체구조를 다듬는 일을 하는게 좋을것같다.

**7월 11일**

1. 프로그래스 바 애니메이션 구현
   <img width="938" alt="스크린샷 2023-07-11 오후 6 09 09" src="https://github.com/devMingu/fe-newsstand/assets/96288558/4a52d8d6-a3b9-4515-8f9a-daffb455b834">

- 오늘은 하루종일 프로그래스 바를 구현하는데 시간을 보낸것 같다. 처음에는 단순하게 배경색상에 키프레임을줘서 채우면 되겠지 생각했는데 그리 간단하지 않았다. 흐릿한 배경이 존재하고 그 위에 배경을 서서히 채워야했다. 그러기위해서 css의 position값을 잘 활용할 수 있어야했다. 부모 태그에 position을 'relative'로 자식 태그의 position은 'absolute'로 위치 관계를 잘 잡아야한다. 이게 또 중요한 이유는 프로그래스 바 내부에 텍스트가 있기 때문에 영역을 잘 생각해서 구현해줘야했다.

- 처음에는 setInterval을 활용해서 width 값을 0부터 시작해서 일정값만큼 증가시켜서 구현을 했었다. 구현은 잘 되었는데 이상하게 페이지를 이동하다보면 채워지는 바의 속도가 점점 빨라지는것이었다. 왜 이런 문제가 발생하는지 몰랐는데 크롱의 강의를 들으면서 '콜 스택' '이벤트 루프' '콜백 큐'의 관계를 이해하니까 왜 속도가 빨라졌는지 이해할 수 있었다. 이 부분에대해서 정리를 해보자.

**7월 12일**

1. 프로그래스 바 선택 기반 구현
   ![화면_기록_2023-07-12_오후_6_01_28_AdobeExpress](https://github.com/softeerbootcamp-2nd/fe-newsstand/assets/96288558/5cbf4b6c-ba59-4cf4-8064-a42a6540fd8b)

- 카테고리를 감싸고 있는 부모 태그를 querySelectAll로 받아와서 자식 태그 전부에 이벤트리스너를 달았다.
- 특정 카테고리가 선택되면, 프로그래스가 진행중인 카테고리를 찾아 효과를 제거해준다.
- 제거가 완료되면, 선택된 카테고리에 프로그래스 바를 나타내는 클래스를 넣어준다.
- 원하는 횟수만큼 작동되지 않는것은 해결해야할 점이다.

**7월 13일**

1. 좌우 버튼 선택에 따라 카테고리 이동 기능 구현

   사실 좌우 버튼은 그리드보기할때도 사용되던 녀석들이다. 그래서 카테고리에 이동할때 같은 버튼을 사용하게되면 겹치는 문제가 발생하고 잘 작동되지 않는것을 알 수 있다. 그래서 어떤 방법이 있을까 생각해보다가 서로 역할에 맞는 버튼을 따로 만들기로 했다. 서로 다른 버튼이기에 겹치는 경우는 생각하지 않아도 좋다. 다만, 페이지가 변경될때 사용하지 않는 버튼에 display 속성에 none을 줘서 사용 불가능 상태로 만들어줬다.

   ⚠️ 발생한 문제점
   현재 보여지는 페이지를 전역변수로 잡고 어디에서나 사용할 수 있게 선언해줬는데, addEventListener 안에서 페이지 변수를 바꿨는데 이벤트리스너 스코프 안에서만 바뀌고 전역변수는 값이 그대로라서 자동이동 & 버튼 이동이 혼합되서 진행될때 서로 다른 페이지 값을 가지고 있어서 원하는 기능 구현이 되지 않았다.
   그래서 상태를 업데이트해주는 함수를 따로 만들어서 이벤트리스너 안에서 함수를 호출해서 모든 변수가 일정된 값을 가질 수 있도록 하였다.

   <img width="848" alt="스크린샷 2023-07-13 오후 6 20 16" src="https://github.com/devMingu/fe-newsstand/assets/96288558/0140ecfd-99c2-4126-b1e7-af57f96dcaf9">

2. 카테고리에 따른 뉴스 콘텐츠 보여주기

   뉴스 콘텐츠를 간단하게 json형식으로 만들어서 가져와서 보여주는 기능이다. 현재 선택된 카테고리를 추적해서 거기에 알맞은 뉴스를 보여주는 방식을 사용하기위해서 카테고리 선택을 인덱스로 관리해서 쉽게 접근할 수 있도록 전역변수를 만들어줬다.

   ![화면_기록_2023-07-13_오후_6_21_52_AdobeExpress](https://github.com/devMingu/fe-newsstand/assets/96288558/df214221-722d-4f85-85fd-e127c56bd76e)
