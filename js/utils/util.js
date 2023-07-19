import { focusToAllPublisher, focusToMyPubliser } from "../utils/navTab.js";

const MY_PUBLISHER = "MY_PUBLISHER";

export function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

export async function removeChildElement(parent) {
  while (parent.firstChild) {
    parent.firstChild.remove();
  }
}

export function onFocusToClicked(where, mySubscribe, allPublisher) {
  where === MY_PUBLISHER
    ? focusToMyPubliser(mySubscribe, allPublisher)
    : focusToAllPublisher(mySubscribe, allPublisher);
}
