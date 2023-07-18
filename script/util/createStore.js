const createStore = () => {
  let state = 0;
  let Observers = [];

  const getState = () => state;

  const setState = newState => {
    state = newState;
    Observers.forEach(Observer => Observer(state));
  };

  const setObserver = Observer => {
    Observers.push(Observer);
    return () => {
      Observers = Observers.filter(l => l !== Observer);
    };
  };

  return {
    getState,
    setState,
    setObserver
  };
};
export default createStore;