import { subscribedStore,mode} from "../util/store.js";
import listViewInit from "./listView.js";
export const alertUnsubscribe = (mediaName,mediaIndex) => {
  const alert = document.querySelector('.unsubscribe_alert');
  const alertName = document.querySelector('.unsubscribe_alert .name');
  const unsubscribeButton = document.querySelector(".button_unsubscribe");
  const cancelButton = document.querySelector(".button_cancel");
  alertName.innerHTML = mediaName;
  alert.classList.remove('display_none');
  unsubscribeButton.addEventListener("click", function() {
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
  });
  cancelButton.addEventListener("click", function() {
    alert.classList.add('display_none');
  });
}

export const removeAlertUnsubscribe = () => {
  const alert = document.querySelector('.unsubscribe_alert');
  alert.classList.add('display_none');
}