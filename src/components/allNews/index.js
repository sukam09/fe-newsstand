import AllNewHeader from "./AllNewHeader.js";
import AllNewsGrid from "./GridView/AllNewsGrid.js";
import ListView from "./ListView/ListView.js";

export default class AllNews {
  constructor() {
    this.$wrapper = document.createElement("section");

    this.render();
    return this.$wrapper;
  }

  render() {
    this.$wrapper.appendChild(new AllNewHeader());
    this.$wrapper.appendChild(new AllNewsGrid());
    this.$wrapper.appendChild(new ListView());
  }
}
