// Description: JSX형태의 Template Literal을 사용하기 위한 라이브러리입니다.
// CODE_REGION을 나타내기 위한 문자열 생성 함수와 정규식
const CODE_REGION = (index) => `:CODE_REGION_${index}:`;
const CODE_REGION_REGEX = /:CODE_REGION_(\d+):/;
const CODE_REGION_REGEX_SEPERATOR_G = /(:CODE_REGION_\d+:)/g;
function replaceSubstitution(replacement) {
    if (typeof replacement === "string")
        return replacement;
    if (typeof replacement === "number")
        return String(replacement);
    return "";
}
function replaceAttribute(element, name, value) {
    if (name.startsWith("on")) {
        element.removeAttribute(name);
        element.addEventListener(name.slice(2).toLowerCase(), value);
    }
    else {
        switch (typeof value) {
            case "boolean":
                value ? element.setAttribute(name, "") : element.removeAttribute(name);
                break;
            case "string":
                element.setAttribute(name, value);
                break;
            case "number":
                element.setAttribute(name, String(value));
                break;
            default:
                break;
        }
    }
}
function createFragment(str = "") {
    const df = document.createDocumentFragment();
    df.appendChild(document.createTextNode(str));
    return df;
}
function handleTextNode({ currentNode: node, args, }) {
    // TextNode가 아니거나, TextNode의 textContent가 없거나, CODE_REGION_REGEX에 매칭되지 않으면 return
    if (node.nodeType !== Node.TEXT_NODE)
        return;
    if (!CODE_REGION_REGEX.test(node.textContent ?? ""))
        return;
    // TextNode의 textContent를 CODE_REGION_REGEX_SEPERATOR_G로 split
    const texts = node.textContent?.split(CODE_REGION_REGEX_SEPERATOR_G);
    // split된 texts를 순회하며 CODE_REGION_REGEX에 매칭되는 문자열을 치환
    const doms = texts?.map((text) => {
        const [_, indexStr] = text.match(CODE_REGION_REGEX) ?? [];
        if (!indexStr)
            return createFragment(text);
        const arg = args[Number(indexStr)];
        if (arg instanceof HTMLElement || arg instanceof Node)
            return arg;
        if (arg instanceof Array) {
            const df = createFragment();
            arg.forEach((item) => {
                if (item instanceof HTMLElement || item instanceof Node)
                    df.appendChild(item);
                else
                    df.appendChild(createFragment(replaceSubstitution(item)));
            });
            return df;
        }
        return createFragment(replaceSubstitution(arg));
    });
    // 치환된 doms를 순회하며 parentNode에 삽입
    doms?.forEach((dom) => {
        node.parentNode?.insertBefore(dom, node);
    });
    // 기존 TextNode를 제거
    node.nodeValue = "";
}
function handleElementNode({ currentNode: node, args, }) {
    const element = node;
    const attributes = [...(element.attributes ?? [])];
    attributes.forEach(({ name, value }) => {
        const codeRegionMatch = value.match(CODE_REGION_REGEX);
        if (!codeRegionMatch)
            return;
        const [_, indexStr] = codeRegionMatch;
        const arg = args[Number(indexStr)];
        replaceAttribute(element, name, arg);
    });
}
const html = (strings, ...args) => {
    // Parsing 실패시 에러 발생
    if (!strings[0] && args.length) {
        throw new Error("JSX를 Parse하는데 실패했습니다. 올바른 JSX문법을 사용해주세요.");
    }
    // template element을 생성합니다.
    const $el = document.createElement("div");
    // CODE_REGION을 :CODE_REGION_{index}:로 치환합니다.
    $el.innerHTML = strings.reduce((acc, cur, index) => {
        const codeRegion = args.length > index ? CODE_REGION(index) : "";
        return acc + cur + codeRegion;
    }, "");
    // NodeIterator를 생성합니다.
    const nodeIterator = document.createNodeIterator($el, NodeFilter.SHOW_ALL);
    let currentNode;
    // NodeIterator를 순회하며 CODE_REGION을 치환합니다.
    while ((currentNode = nodeIterator.nextNode())) {
        const nodeType = currentNode.nodeType;
        // Text Node 처리
        if (nodeType === Node.TEXT_NODE) {
            handleTextNode({ currentNode, args });
        }
        // Element Node 처리
        else if (nodeType === Node.ELEMENT_NODE) {
            handleElementNode({ currentNode, args });
        }
    }
    return $el.firstElementChild ?? $el;
};
export { html };
