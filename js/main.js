document.addEventListener("DOMContentLoaded", function () {
  updateDate();
  appendList();
  var interval = window.setInterval(rollingEvent, 3000);
});
