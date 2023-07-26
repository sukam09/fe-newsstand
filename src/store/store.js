import { initState } from "../observer/observer.js"

const isGridState = initState({
    key: "isGrid",
    defaultValue: true
})

const isAllState = initState({
    key: "isAll",
    defaultValue: true
})

const currentPage = initState({
    key: "currentPage",
    defaultValue: 1
})

const categoryNum = initState({
    key: "categoryNum",
    defaultValue: 0
})

export {
    isGridState,
    isAll,
    currentPage,
    categoryNum,
}