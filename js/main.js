document.addEventListener("DOMContentLoaded", function () {
  updateDate();
  appendGridList();
  appendRollingList();
  var interval = window.setInterval(rollingEvent, 3000);
});
