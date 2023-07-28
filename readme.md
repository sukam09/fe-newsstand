# 네이버 뉴스스탠드

기간 7/6~ 7/28

## 주요내용

### 1주차

✏️[1주차 PR](https://github.com/softeerbootcamp-2nd/fe-newsstand/pull/19)

1주차는 짝과 페어프로그래밍을 했습니다. 지난번 Todo리스트 만들때 해봤기 때문에 어렵지 않게 개발을 시작할 수 있었습니다.
<br/>짝과 돌아가면서 코드를 작성하다 보니 CSS네이밍의 이슈가 있었습니다. 파일을 하나로 관리하고 CSS이름을 각자의 방식대로 짓기 때문에 확인하기가 어려웠습니다.
<br/>CSS파일을 분리하고 BEM컨벤션을 이용하여 통일된 방식으로 네이밍을 지울 수 있었습니다.
<br/>Block단위로 이름을 짓고 Element와 Modify는 최대한 이해하기 쉽고 계층이 보이도록 작성했습니다. 

<img width="168" alt="단일파일" src="https://github.com/ptq124/fe-newsstand/assets/64758823/e50c554f-d95a-446e-93f5-e3e4d6ee6a5f">

### 2주차

✏️[2주차 PR](https://github.com/softeerbootcamp-2nd/fe-newsstand/pull/57)

1주차 미션인 페이프로그래밍이 마무리되어 2주차부터 혼자 개발해게 되었습니다. 
<br/>기능이 들어남에 따라 기존 한 파일에서 개발하던 로직들을 분리해야만 했습니다. 왜냐하면 코드가 길어져 가독성과 유지보수성이 떨어졌기 때문입니다. 
<br/>크게 분리해야할 기준을 3가지로 잡았습니다. (이벤트로직, 비즈니스로직, 화면 HTML)
<br/>3가지로 분리하고 개발을 진행하니 각 파일에 대해 역할이 분명했지만 데이터와 이벤트를 통신하기 위해서 각 파일별로 import와 export를 남발하기 시작했습니다. 
<br/>기능구현을 마치고 보니 각 로직들 사이에 의존성이 강하게 남아있었습니다. 파일별 역할을 확실히 알 수 있었지만 강한 의존성으로 인해 기능추가시 수정이 어려웠습니다.

<img width="471" alt="MVC" src="https://github.com/ptq124/fe-newsstand/assets/64758823/f004f292-c199-4d72-b243-42fe4f641d39">

### 3주차

✏️[3주차 PR](https://github.com/softeerbootcamp-2nd/fe-newsstand/pull/89)

새로운 기능이 계속 나오게 되고 더이상 강한 의존성으로 인해 개발이 불가능하다 판단해서 처음부터 다시 설계에 대한 고민을 시작했습니다. 
<br/>2주차에 개발한 코드를 분석해보니 MVC패턴이었고 MVC패턴에 단점이 명확하게 보였습니다. 그래서 Store를 추가했고 Vuex를 바닐라로 구현하여 Flux패턴처럼 단방향으로 데이터가 흘러가게 개발했습니다. 
<br/>Vuex를 개발하게 되면서 현재 프로젝트보다 규모가 좀 더 큰 프로젝트에 적합해 보이지만, 데이터가 중앙으로 모이게되면서 데이터 관리가 보다 더 쉬워졌습니다. 
<br/>Flux패턴을 적용하니 기존 MVC패턴의 강한 의존성이 없어졌고 유지보수와 기능추가를 쉽게 할 수 있게되었습니다. 

<img width="590" alt="FLUX" src="https://github.com/ptq124/fe-newsstand/assets/64758823/7416f0d7-c43c-4558-83c0-e5743094ae2b">

### 4주차

✏️[4주차 PR](https://github.com/softeerbootcamp-2nd/fe-newsstand/pull/121)
  
4주차 미션은 옵저버 패턴을 적용하는 것 입니다. 그래서 기존 Vuex스토어에 Observer 클래스를 상속받게 했습니다. 
<br/>옵저버 패턴을 사용하니 model과 Store간에 느슨한 의존성이 형성되었습니다. 단순히 Model은 Store를 구독하기 때문에 Model과 Store간에 관계가 명확해 졌고 코드 가독성 측면에서도 더 좋아진거 같습니다.
<br/>Flux패턴과 마찬가지로 데이터의 흐름은 단방향으로 흐르나 옵저버 패턴은 객체의 흐름에 집중한 느낌이고 Flux패턴은 데이터 흐름에 집중한 느낌이었습니다. 
<br/>상황에 따라 적절하게 두 패턴을 활용하면 될거 같습니다.

<img width="598" alt="옵저버" src="https://github.com/ptq124/fe-newsstand/assets/64758823/6a5cd094-18cd-482a-af51-9224db034868">

## 챌린지
### querySelector API 구현
기능은 어느정도 완성된거 같아 2주차 선택미션인 querySelector API를 직접 만들었습니다. 
<br/>querySelector를 만들면서 알게된 점은 탐색은 깊이우선depth-first 전위pre-order순회를 한다는 것입니다.
<br/>만약 해당 알고리즘 대로라면 root노드부터 순서대로 노드를 탐색하기 때문에 만약 오른쪽 가장 마지막에 있는 리프노드를 찾는다면 효율이 떨어질 수 있다고 생각했습니다.
<br/>효율을 높이기 위해 가능 한 탐색범위를 좁게하여 querySelector를 사용해야 하는것을 배웠고, querySelector API를 깊게 이해할 수 있는 시간이었습니다.

<img width="470" height="700" src="https://github.com/ptq124/fe-newsstand/assets/64758823/50c99bc9-c11a-4cab-9326-8089b59c05e6">

## 메인화면

<img width="1203" alt="스크린샷 2023-07-27 오후 4 39 54" src="https://github.com/ptq124/fe-newsstand/assets/64758823/67e961bf-23b7-4054-a02c-24af3c10e7a7">
