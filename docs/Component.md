## ⭐️ JSX 문법을 활용한 HTMLElement 생성

1. **HTML Template Literal**

   먼저 JavaScript에서 `innerHTML`으로 html을 생성할 경우 html임을 알아보기 어려우며, 코드가 복잡해지는 문제를 해결하기 위해서 HTML Template Literal을 작성하였습니다.[lit-html](!https://marketplace.visualstudio.com/items?itemName=bierner.lit-html)이라는 VS Code Extention 사용시 color scheme이 적용되어 쉽게 html 코드를 이해할 수 있게 됩니다.

   ```ts
   /**
    * html을 Template literal로 작성 시 사용하는 함수
    * XSS(Cross Site Scripting)을 방지하기 위해 string 값이 passing될 경우 String으로 타입 변경
    * @param {TemplateStringsArray} strings
    * @param {Array<string | number | null>} values
    * @returns {String.raw}
    */

   const html = (
     strings: TemplateStringsArray,
     ...values: Array<string | number | null>
   ): HTMLString => {
     const safeValues = values.map((value) =>
       typeof value === "string" ? String(value) : value
     );
     return String.raw({ raw: strings }, ...safeValues);
   };
   ```

   기존에는 html 형태의 template literal을 사용하여 그리드 보기와 리스트 보기를 렌더링했습니다. 이러한 방법을 사용할 경우 다음과 같이 event listener를 따로 추가해주어야 합니다. 이에 따라 코드가 점점 복잡해지는 것을 느껴 컴포넌트 방식을 사용하여 view를 렌더링할 수 있도록 변경하고자 하였습니다.

   ```ts
   document.querySelector(".grid-view").innerHTML = html`<div>
     그리드 뷰 내용
   </div>`;
   ```

   ```ts
   // Add event listener of view type buttons
   document.querySelectorAll(".view-type__option").forEach(($element) => {
     $element.addEventListener("click", changeViewType);
   });

   // Add event listener of move page buttons
   document.querySelectorAll(".move-page__btn").forEach(($element) => {
     $element.addEventListener("click", movePageHandler);
   });
   ```

2. **DOM API**

   기존에 만들어 놓았던 DOM API를 활용한 createElement를 사용하고자 했으나, event listener 추가 등의 문제는 여전히 남아 있었습니다.

   ```ts
   /**
    * html template literal을 parameter로 받아 HTMLElement를 생성합니다.
    * @param {string} html
    * @returns {HTMLElement}
    */
   function createElement(html: string) {
     const $template = document.createElement("div");
     $template.innerHTML = html;
     if ($template.children.length !== 1)
       throw new Error(
         "The createElement function must get an HTML string that has only one tag."
       );
     const $tag = $template.firstChild as HTMLElement;
     return $tag;
   }
   ```

3. **React.createElement 기반 컴포넌트**

   그래서 React의 `React.createElement(tagName, props, children)` 함수의 형태를 참고하여 component 생성 코드를 작성했습니다.

   ```ts
   /**
    * Component 생성 함수
    * @param { any } type
    * @param { { [key: string]: string | number | Function } }props
    * @param { Array<string | HTMLElement> } children
    * @returns { HTMLElement }
    */
   export const component = (
     type: any,
     props: { [key: string]: string | number | Function },
     children?: Array<boolean | string | HTMLElement>
   ): HTMLElement => {
     const $el = document.createElement(type);

     for (const [key, value] of Object.entries(props)) {
       if (key.startsWith("on")) {
         $el.addEventListener(key.slice(2).toLowerCase(), value);
       } else {
         $el.setAttribute(key, value);
       }
     }

     if (children) {
       for (const child of children) {
         if (typeof child === "boolean") {
           continue;
         }
         if (typeof child === "string") {
           $el.appendChild(document.createTextNode(child));
         } else {
           $el.appendChild(child);
         }
       }
     }

     return $el;
   };
   ```

   하지만 다음과 같이 depth가 조금만 깊어져도 계층구조를 알기 어려웠습니다.

   ```ts
   const NewsRollingBar = component("div", { class: "news-rolling-bar" }, [
     component("div", { class: "news-rolling-bar__title" }, ["최근 뉴스"]),
     component("div", { class: "news-rolling-bar__content" }, [
       component("div", { class: "news-rolling-bar__content__item" }, [
         component("a", { href: "#" }, ["[업데이트] 뉴스스탠드 v1.0.0"]),
       ]),
       component("div", { class: "news-rolling-bar__content__item" }, [
         component("a", { href: "#" }, ["[업데이트] 뉴스스탠드 v1.0.0"]),
       ]),
     ]),
   ]);
   ```

4. **jsx 문법으로 HTML Element 만들기**

   [우아한 jsx(우아한 테크코스 2021 미션 추정)](https://github.com/woowa-techcamp-2021/woowahan-jsx)을 참고하여 JSX Template Literal을 작성하였습니다. 코드에 해당하는 부분을 `:CODE_REGION_{index}:`로 치환한 후, `NodeIterator`를 활용하여 `:CODE_REGION_{index}:`와 매칭될 경우 `args[index]`를 실행하거나 추가합니다. 그 후, HTML Element를 return합니다.

   [**코드 보러 가기 🥰**](https://github.com/1lsang/fe-newsstand/tree/ilsang/src/lib/jsx.js)

### 💡 TIP

JSX만으로도 부족하다고 생각해 간단한 Component 구현 방법을 찾아보니 `customElements`를 사용할 수 있는 방법이 있었습니다. 실제 Component와 크게 차이 없는 기능들을 제공한다고 느꼈지만, 저의 경우 현재 구현한 JSX Parser와 함께 사용하면 event listener가 사라지는 문제가 생겨 사용하지 않았습니다. Event listener를 `connetedCallback()`에서 등록하는 방법으로 사용한다면 문제를 해결할 수 있을 것입니다.

```ts
class CustomElement extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {}
  disconnectedCallback() {}
  attributeChangedCallback() {}
  adoptedCallback() {}
}

customElements.define("custom-element", CustomElement);
```
