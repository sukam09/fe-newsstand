export function createSpan({ className, txt }) {
    const newSpan = document.createElement("span");
    if (className) newSpan.setAttribute("class", className);
    if (txt) newSpan.innerHTML = txt;

    return newSpan;
}

export function createBtn({ className, txt }) {
    const newBtn = document.createElement("button");
    if (className) newBtn.setAttribute("class", className);

    return newBtn;
}

export function createDiv({ className, txt }) {
    const newDiv = document.createElement("div");
    if (className) newDiv.setAttribute("class", className);
    if (txt) newDiv.innerHTML = txt;

    return newDiv;
}

export function createNav({ className, txt }) {
    const newNav = document.createElement("nav");
    if (className) newNav.setAttribute("class", className);

    return newNav;
}

export function createImg({ className, src, alt }) {
    const newImg = document.createElement("img");
    if (className) newImg.setAttribute("class", className);
    if (src) newImg.setAttribute("src", src);
    if (alt) newImg.setAttribute("alt", alt);

    return newImg;
}

export function createUl({ className }) {
    const newUl = document.createElement("ul");
    if (className) newUl.setAttribute("class", className);

    return newUl;
}

export function createLi({ className }) {
    const newLi = document.createElement("li");
    if (className) newLi.setAttribute("class", className);

    return newLi;
}

export function createA({ className, url, txt }) {
    const newA = document.createElement("a");
    if (className) newA.setAttribute("class", className);
    if (url) newA.setAttribute("href", url);
    if (txt) newA.innerHTML = txt;

    return newA;
}

export function createChild(parent, childArr) {
    childArr.forEach((element) => {
        parent.appendChild(element);
    });
    return parent;
}
