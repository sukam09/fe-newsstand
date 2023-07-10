/**
 *
 * @param {Object[]} page
 * @param {number} PAGINATION_NUM
 */
function renderGrid(page, PAGINATION_NUM) {
    const $agencyList = document.querySelector(".agency-list")
    // 기존 페이지 제거
    $agencyList.innerHTML = ""
    // 새로운 child append
    const newGrid = page.map((data) => {
        const $li = document.createElement("li")
        const $img = document.createElement("img")
        $li.appendChild($img)
        $img.src = `/asset/images/light/${data.id}.png`

        const $button = document.createElement("button")
        $button.innerText = "test"
        $button.className = "agency-btn-hover"

        $li.addEventListener("mouseenter", function () {
            $li.appendChild($button)
        })

        $li.addEventListener("mouseleave", function () {
            $li.removeChild($button)
        })

        return $li
    })

    while (newGrid.length < PAGINATION_NUM) {
        const $li = document.createElement("li")
        newGrid.push($li)
    }

    $agencyList.append(...newGrid)
}

export { renderGrid }
