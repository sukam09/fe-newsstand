export class CustomQuery {
  constructor() {
    this.result = [];
  }

  /**
   * 찾고싶은 HTML Tag들을 전부 찾아서 반환합니다.
   * @param {Element} search
   * @param {DOM} parent
   * @returns Array
   */
  customQuerySelectAllByTagName(search, parent = document) {
    parent.nodeName === search.toUpperCase() && this.result.push(parent);

    parent.childNodes.forEach((element) =>
      this.customQuerySelectAllByTagName(search, element)
    );
    return resultTagName;
  }

  /**
   * 클래스 이름을통해 HTML Tag를 찾아서 반환합니다.
   * @param {className} search
   * @param {DOM} parent
   * @returns Array
   */
  getAllElementWithClassName(search, parent = document) {
    if (parent.classList) {
      [...parent.classList].includes(search) && this.result.push(parent);
    }

    parent.childNodes.forEach((element) =>
      this.getAllElementWithClassName(search, element)
    );

    return this.result;
  }

  getElementWithClassName(search, parent = document) {
    for (const elem of parent.children) {
      if ([...elem.classList].includes(search)) {
        if (!this.result.length) {
          this.result.push(elem);
        }
        return this.result;
      }
      this.getElementWithClassName(search, elem);
    }

    return this.result;
  }
  getElementWithId(search, parent = document) {
    for (const elem of parent.children) {
      if (search === elem.id) {
        if (!this.result.length) this.result.push(elem);

        return this.result;
      }
      this.getElementWithId(search, elem);
    }

    return this.result;
  }

  customQuerySelectById(search, parent = document) {
    parent.id === search && this.result.push(parent);

    parent.childNodes.forEach((element) =>
      this.customQuerySelectById(search, element)
    );

    return this.result;
  }
}

// export const customQuery = new CustomQuery();

// const resultTagName = [];
// const resultClassName = [];
// const resultId = [];

// /**
//  * 찾고싶은 HTML Tag들을 전부 찾아서 반환합니다.
//  * @param {Element} search
//  * @param {DOM} parent
//  * @returns Array
//  */
// export function customQuerySelectAllByTagName(search, parent = document) {
//   parent.nodeName === search.toUpperCase() && resultTagName.push(parent);

//   parent.childNodes.forEach((element) =>
//     customQuerySelectAllByTagName(search, element)
//   );
//   return resultTagName;
// }

// /**
//  * 클래스 이름을통해 HTML Tag를 찾아서 반환합니다.
//  * @param {className} search
//  * @param {DOM} parent
//  * @returns Array
//  */
// export function getElementWithClassName(search, parent = document) {
//   if (parent.classList) {
//     [...parent.classList].includes(search) && resultClassName.push(parent);
//   }

//   parent.childNodes.forEach((element) =>
//     getElementWithClassName(search, element)
//   );

//   return resultClassName;
// }

// export function customQuerySelectById(search, parent = document) {
//   parent.id === search && resultId.push(parent);

//   parent.childNodes.forEach((element) =>
//     customQuerySelectById(search, element)
//   );

//   return resultId;
// }
