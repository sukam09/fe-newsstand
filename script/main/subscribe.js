export const alertUnsubscribe = (mediaName,mediaIndex) => {
  const alert = document.querySelector('.unsubscribe_alert');
  const alertName = document.querySelector('.unsubscribe_alert .name');
  const unsubscribeButton = document.querySelector("#unsubscribeButton");
  const cancelButton = document.querySelector("#cancelButton");

  unsubscribeButton.addEventListener("click", function() {
    
  });

  cancelButton.addEventListener("click", function() {
    console.log(mediaIndex);
  });
  alertName.innerHTML = mediaName;

  alert.classList.remove('display_none');
  
}