const getSubscribeButton = (name) => {
  const isSubscribed = checkSubscribe(name);
  const isGridView = checkIsGridView();

  if (isSubscribed) {
    if (isGridView) {
      return createUnSubscribeButton(name);
    }
    return createCircleSubscribeButton(name);
  } else {
    return createNormalSubscribeButton(name);
  }
};
