export default class Component {
    $target;
    state;
    constructor($target, props) {
        this.$target = $target;
        this.props = props;
        this.setup();
        this.render();
        this.setEvent();
    }
    setup() {}
    mounted() {}
    template() {
        return "";
    }
    render() {
        this.$target.innerHTML = this.template();
        this.mounted();
    }
    setEvent() {}
    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.render();
    }
}
