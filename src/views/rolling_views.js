function renderHotTopicsView(data1, data2, callback) {
    const banner_left = document.getElementById("rollingBannerLeft");
    const banner_right = document.getElementById("rollingBannerRight");

    const list_left = createHotTopicList(data1);
    const list_right = createHotTopicList(data2);

    banner_left.appendChild(list_left);
    banner_right.appendChild(list_right);

    callback(banner_left, banner_right);

}

function createHotTopicList(news) {
    const list = document.createElement("ul");
    list.classList.add("hot_list");

    news.forEach((item) => {
        const li = document.createElement("li");
        li.innerHTML = `
        <a href="${item.url}">
            <span class="hot_press">${item.press}</span>
            <p class="hot_title">${item.title}</p>
        </a>
        `;
        list.appendChild(li);
    });
    return list;
}

export { renderHotTopicsView };
