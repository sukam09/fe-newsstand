export class CustomQuery {
  constructor() {
    this.result = [];
  }

  /**
   * 찾고싶은 HTML Tag들을 전부 찾아서 반환합니다.
   * @param {Element} search
   * @param {DOM} node
   * @returns Array
   */
  customQuerySelectAllByTagName(search, node = document) {
    node.localName === search && this.result.push(node);

    for (const elem of node.children) {
      this.customQuerySelectAllByTagName(search, elem);
    }
    return this.result;
  }

  /**
   * 클래스 이름을통해 HTML Tag를 찾아서 반환합니다.
   * @param {className} search
   * @param {DOM} node
   * @returns Array
   */
  getAllElementWithClassName(search, node = document) {
    if (node.classList) {
      [...node.classList].includes(search) && this.result.push(node);
    }

    for (const elem of node.children) {
      this.getAllElementWithClassName(search, elem);
    }

    return this.result;
  }

  getElementWithClassName(search, node = document) {
    for (const elem of node.children) {
      [...elem.classList].includes(search) &&
        !this.result.length &&
        this.result.push(elem);
      this.getElementWithClassName(search, elem);
    }

    return this.result;
  }
  getElementWithId(search, node = document) {
    for (const elem of node.children) {
      search === elem.id && !this.result.length && this.result.push(elem);
      this.getElementWithId(search, elem);
    }
    return this.result;
  }
}

const custom = new CustomQuery();

console.log(custom.customQuerySelectAllByTagName("ul"));
