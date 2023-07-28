function Component($el, props) {
  this.$el = $el;
  this.props = props;
  this.state = this.initState();

  this.setUp = () => {
    if (this.isRender()) {
      this.render();
      this.setEvent();
      this.mounted();
    }
  };

  this.setUp();
}

Component.prototype.initState = function () {
  return {};
};

Component.prototype.template = function () {
  return "";
};

Component.prototype.render = function () {
  this.$el.innerHTML = this.template();
};

Component.prototype.setEvent = function () {};

Component.prototype.mounted = function () {};

Component.prototype.isRender = function () {
  return true;
};

export default Component;

/*
상속받는 법

function child($el, props) {
  Component.call(this, $el, props); Component 생성자 호출
  
//   ...
}

app.prototype = Object.create(Component.prototype); 상속

app.prototype.initState = function(params) => { //... }
app.prototype.template = function(params) => { //... }
app.prototype.setEvent = function(params) => { //... }
app.prototype.mounted = function(params) => { //... }

new app($target, props);
*/
