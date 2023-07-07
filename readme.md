# 뉴스스탠드 웹

## STEP #1 (1주차)

### 기능 요구사항

- 기획서 1,3 페이지
  - 1페이지. 기본화면
  - 3페이지. 그리드 배치와 화면전환

### 프로그래밍 요구사항

- 설계

  - HTML,CSS,JavaScript 모든 개발 전에는 분석/설계 과정을 거친다.
  - 시각적으로 자유롭게 표현하고, PR에 포함해야 한다.

- HTML,CSS 개발

  - 의미에 맞는 태그를 사용한다. 단순히 wrapping하는 역할은 div를 사용해도 좋다.
  - 디자인 가이드에 맞게 스타일을 한다.
  - 하지만 엄격하게 스타일을 맞추지 않아도 상관없다.
  - 화면 배치(layout)는 일정하게 한다.

- DOM 조작

  - DOM 조작과정에서 template literal 문법을 반드시 사용한다.
  - DOM 조작과정에서 createElement, appendChild , insertBefore 등의 다양한 DOM APIs 를 활용해본다.
  - 비슷한 역할을 하는 API가 많으므로 선택을 너무 고민하지 않아도 된다.

- Events

  - addEventListener 를 사용한 이벤트 처리를 한다.

- 데이터 사용.
  - 모든 데이터는 서버 없이 진행하고, 데이터 통신과정은 없다.
  - 데이터는 json형태의 객체리터럴을 만들고, 객체 데이터를 접근해서 사용한다.

### 팀 활동 요구사항

- 1주차에는 페어프로그래밍으로 학습한다.
- 그룹이 협력적으로 학습하도록 한다.

### 고민한 부분

#### 1. 웹 접근성을 고려한 마크업 구성

웹 접근성을 고려해서 section 내부의 제목과 button 내부에 내용을 추가하고 이를 CSS를 통해서 일반 사용자에게는 노출되지 않지만 스크린 리더 등의 기기를 사용할 경우 해당 부분이 어떤 내용을 의미하는지 알 수 있도록 설계하기 위해 노력했습니다.

#### 2. Data fetching

data를 json에서 가져오는데 fetch API를 사용하여 기존 서버 통신과 비슷한 형태의 data fetching 구조를 설계하려고 노력했습니다.
data fetching 이후에 Math.random()을 활용하여 데이터를 새로고침할 때마다 순서가 변경되도록 구성하였습니다.

```js
agencies = data.agencies.sort(() => 0.5 - Math.random());
```

### 배운 점

#### 1. `removeAllChildNodes()`

페이지네이션 렌더링 과정에서 기존의 요소들을 지우고 새로운 요소들을 렌더링하도록 만들어야 했다. 이 때, `childNodes`를 forEach를 통해서 각 node들을 지우려 했지만, 작동하지 않았다.
원인은 childNodes를 순회하는 동안 childNodes 내부의 element를 삭제하면서 인덱싱이 제대로 되지 않아 forEach의 작동이 멈추는 문제임을 확인하였다.
따라서 전통적인 방법으로 사용되는 형태의 구현 방법을 찾았고, 이를 활용하여 구현하였다.

```js
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
```

#### 2. Css Variable

CSS 속성을 모두 입력한 후, 동일하게 반복되는 요소들에 대해 CSS Variable을 통해 리팩토링을 진행하였다. 숫자나 HEX Code로 이루어진 것보다 `--color-text-strong`과 같이 명시하는 것이 의미를 가지는 식별자를 사용함으로서 이해하기 쉽다는 장점을 지니고 있다.

**동작 방식**

- `:root` 가상클래스에 변수를 추가한다.
- `var()` 함수를 사용하여 값을 설정한다.

예시

```css
:root {
  /* color */
  --color-grayscale-black: #14212b;
  ...
  /* color system */
  --color-text-strong: var(--color-grayscale-black);
  ...
}
```

#### 3. Image Sprite

페이지를 구성하면서 기존 웹페이지들은 어떻게 구성되어 있는지 살펴보았고, 그 과정에서 네이버, 다음 등의 포털 사이트는 버튼 이미지 등의 asset을 하나의 이미지 파일로 불러오고 background image의 position을 조절하여 사용하는 것을 확인할 수 있었다.
이러한 방식의 이미지 사용을 **Image Sprite**라고 하며, 네트워크 Request의 수를 줄여 웹페이지를 최적화 하는 방법 중 하나라는 것을 배웠습니다.
