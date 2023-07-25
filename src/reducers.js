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

export function gridReducer(state, action) {}

export function listReducer(state, action) {}

export function subscribeReducer(state, action) {}
