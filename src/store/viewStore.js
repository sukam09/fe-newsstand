import { initState } from "../observer/observer.js"

const GridState = initState({
    key: "isGrid",
    defaultValue: true
})

const AllState = initState({
    key: "isAll",
    defaultValue: true
})

export {
    GridState,
    AllState,
}