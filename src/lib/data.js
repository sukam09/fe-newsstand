import { PAGINATION_NUM } from "../app"

const MAX_PAGE_NUM = 4

async function getData() {
    const agencies = await fetch("./news.json").then((res) => {
        return res.json()
    })
    return agencies
}

function pagination(data) {
    const pages = []
    let pageNumber = Math.min(
        Math.ceil(data?.length / PAGINATION_NUM),
        MAX_PAGE_NUM
    )
    for (let i = 0; i < pageNumber; i++) {
        pages.push(data.slice(i * PAGINATION_NUM, (i + 1) * PAGINATION_NUM))
    }
    return pages
}

const shuffle = (data) => {
    return data.sort(() => 0.5 - Math.random())
}

export { getData, pagination, shuffle }
