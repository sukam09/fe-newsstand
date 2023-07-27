import { _mode } from "../../Store.js";

export function onClickEntire() {
    _mode.setState({ is_grid_view: null, is_sub_view: false });
}
export function onClickSubscribe() {
    _mode.setState({ is_grid_view: null, is_sub_view: true });
}
export function onClickGrid() {
    _mode.setState({ is_grid_view: true, is_sub_view: false });
}
export function onClickList() {
    _mode.setState({ is_grid_view: false, is_sub_view: null });
}
