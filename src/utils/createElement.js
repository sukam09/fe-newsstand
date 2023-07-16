const create = {};
const block = ["div", "button", "nav", "ul", "li", "img", "a", "span"];

(function createElementFunc() {
    block.forEach((elem) => {
        create[elem] = ({ className, txt, attributes, events }) => {
            const $newElem = document.createElement(elem);
            if (className) $newElem.setAttribute("class", className);
            if (txt) $newElem.innerHTML = txt;
            if (attributes) for (const key in attributes) $newElem.setAttribute(key, attributes[key]);
            if (events) for (const key in events) $newElem.addEventListener(key, events[key]);
            return $newElem;
        };
    });
})();

export { create };
