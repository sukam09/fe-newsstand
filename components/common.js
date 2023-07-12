export function createSpan(className, txt) {
    const newSpan = document.createElement("span");
    if (className) newSpan.setAttribute("class", className);
    if (txt) newSpan.innerHTML = txt;

    return newSpan;
}

export function createBtn(className) {
    const newBtn = document.createElement("button");
    if (className) newBtn.setAttribute("class", className);

    return newBtn;
}

export function createDiv(className, txt) {
    const newDiv = document.createElement("div");
    if (className) newDiv.setAttribute("class", className);
    if (txt) newDiv.innerHTML = txt;

    return newDiv;
}
