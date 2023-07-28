import { subscribedStore,mode,timeoutId} from "../util/store.js";
import listViewInit from "./listView.js";
export const alertUnsubscribe = (mediaName,mediaIndex) => {
  const alert = document.querySelector('.unsubscribe_alert');
  const alertName = document.querySelector('.unsubscribe_alert .name');
  const unsubscribeButton = document.querySelector(".button_unsubscribe");
  const cancelButton = document.querySelector(".button_cancel");

  alertName.innerHTML = mediaName;
  alert.classList.remove('display_none');

  const unsubscribeEvent = function() {
    let removeIdx = subscribedStore.getState().indexOf(mediaIndex);
    if (removeIdx !== -1) {
      let newState = [...subscribedStore.getState()];
      newState.splice(removeIdx, 1);
      subscribedStore.setState(newState);
      alert.classList.add('display_none');
    }
    if(mode.getState()==='Sub'){
      listViewInit();
    }
  };

  const cancelEvent = function() {
    alert.classList.add('display_none');
  };

  // 클릭 이벤트 추가
  unsubscribeButton.addEventListener("click", unsubscribeEvent);
  cancelButton.addEventListener("click", cancelEvent);

  // 키보드 엔터키 이벤트 추가
  window.addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {
        console.log("T");
        unsubscribeEvent();
    }
  });
}


export const removeAlertUnsubscribe = () => {
  const alert = document.querySelector('.unsubscribe_alert');
  alert.classList.add('display_none');
}

export const resetAlert = () => {
  // const snackBar = document.querySelector('.snackBar');
  // const alert = document.querySelector('.unsubscribe_alert');
  // alert.classList.add('display_none');
  // snackBar.classList.add('hide');
  console.log(timeoutId.getState());
  clearTimeout(timeoutId.getState());
  console.log("rest");
}