export function viewReducer(state, action) {
    switch (action.type) {
        case "CHANGE_VIEW_OPTION":
            return action.value;
        default:
            return state;
    }
}
// view_option.dispatch(
//     {
//         type: "CHANGE_VALUE",
//         value: "list",
//     },
//     "main"
// );

export function gridReducer(state, action) {
    switch (action.type) {
        case "CHANGE_PAGE_OPTION":
            return action.value;
        default:
            return state;
    }
}

export function listReducer(state, action) {
    switch (action.type) {
        case "CHANGE_PAGE_OPTION":
            return action.value;
        case "FLOW_PROGRESS":
            return action.value + 1;
        default:
            return state;
    }
}

export function subscribeReducer(state, action) {
    switch (action.type) {
        case "CHANGE_VIEW_OPTION":
            return action.value;
        default:
            return state;
    }
}
