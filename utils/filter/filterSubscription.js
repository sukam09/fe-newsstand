import { store } from "../../store/store.js";

export const filterSubscribePress = (copy_agencies) => {
  const subscribe_agencies = store.subscriptions.filter(
    (item) => item.subscribe
  );
  copy_agencies = subscribe_agencies.map((subscribe_agency) => {
    return copy_agencies.find(
      (agency) => agency.name === subscribe_agency.name
    );
  });
  return copy_agencies;
};
