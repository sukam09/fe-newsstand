import { dispatcher } from "./dispatcher.js";

export const store = {
  subscriptions: null,
  isDarkMode: false,
};

export const initializeStore = async (data) => {
  const subscriptions = data.agencies.map((agency) => {
    return {
      name: agency.name,
      subscribe: agency.subscribe,
    };
  });
  dispatcher({ type: "FETCH_SUBSCRIPTIONS_SUCCESS", subscriptions });
};
