import { customFetch } from "../../../utils/utils.js";
import { setState } from "../../../store/observer.js";
import { subscribeState } from "../../../store/storeKey.js";

export const setSubscribe = async () => {
  const subList = await customFetch("../../../mocks/subscribe.json");

  setState(subscribeState, subList);
};
