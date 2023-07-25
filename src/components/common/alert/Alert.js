import {
  alertMsgState,
  selectedSubscribeState,
  snackBarMsgState,
  subscribeGridPageState,
  subscribeState,
} from "../../../store/store.js";
import {
  _querySelector,
  _querySelectorAll,
} from "../../../utils/my-query-selector.js";
import { useGetAtom, useSetAtom } from "../../../store/atom.js";
import { NEWS_COUNT, SUBSCRIBE_MESSAGE } from "../../../constants/constants.js";

const $snackBar = _querySelector(".snackbar");
const snackClassList = $snackBar.classList;
const $alert = _querySelector(".alert");
const alertClassList = $alert.classList;
const $alertInner = _querySelector(".alert-font-activate", $alert);
const $alertButtons = _querySelectorAll("button", $alert);
const $unSubscribeButton = $alertButtons[0];
const $closeButton = $alertButtons[1];

const renderAlert = () => {
  const content = useGetAtom(alertMsgState);

  $alertInner.firstChild.textContent = content;

  invisibleToVisible();
};

const visibleToInvisible = () => {
  snackClassList.replace("visible", "invisible");
  alertClassList.replace("visible", "invisible");
};
const invisibleToVisible = () => {
  alertClassList.replace("invisible", "visible");
};

const handleUnSubscribeButtonClick = () => {
  const subscribeList = useGetAtom(subscribeState);
  const subscribeItem = useGetAtom(alertMsgState);

  const itemIndex = subscribeList.indexOf(subscribeItem);

  const updateArray = subscribeList.filter((_, idx) => idx !== itemIndex);
  const selectedSubscribeItem =
    updateArray[itemIndex % (subscribeList.length - 1)];

  useSetAtom(selectedSubscribeState, selectedSubscribeItem);
  useSetAtom(subscribeState, updateArray);

  if (updateArray.length % NEWS_COUNT === 0) {
    const currentPage = useGetAtom(subscribeGridPageState);

    currentPage !== 0 && useSetAtom(subscribeGridPageState, currentPage - 1);
  }

  visibleToInvisible();
  useSetAtom(snackBarMsgState, SUBSCRIBE_MESSAGE.DELETE);
};

const handleCloseButtonClick = () => {
  visibleToInvisible();
};

const setEvents = () => {
  $unSubscribeButton.addEventListener("click", handleUnSubscribeButtonClick);
  $closeButton.addEventListener("click", handleCloseButtonClick);
};

export { renderAlert, setEvents };
