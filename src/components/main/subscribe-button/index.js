import { customFetch } from "../../../utils/utils.js";
import { setState } from "../../../observer/observer.js";
import { subscribeState } from "../../../store/store.js";

export const setSubscribe = async () => {
  const subList = await customFetch("../../../mocks/subscribe.json");

  setState(subscribeState, subList);
};
