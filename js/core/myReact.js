function myReact() {
  let renderInfo = { root: undefined, rootComponent: undefined };
  let renderCount = 0;

  let states = [];
  let currentStateIndex = 0;

  const useState = (initialValue) => {
    const index = currentStateIndex;
    const state = states[index] || initialValue;
    const setState = (newValue) => {
      if (state === newValue) {
        return;
      }
      states[index] = newValue;
      _render();
    };
    currentStateIndex++;
    return [state, setState];
  };

  const useEffect = (callback, dependencies) => {
    const index = currentStateIndex;
    const oldDependencies = states[index];
    let hasChange = true;

    if (oldDependencies) {
      hasChange = dependencies.some(
        (dep, i) => !Object.is(dep, oldDependencies[i])
      );
    }
    if (hasChange) {
      callback();
      states[index] = dependencies;
    }

    currentStateIndex++;
  };

  const useMemo = (callback, dependencies) => {
    const index = currentStateIndex;
    const [oldDependencies, oldValue] = [states[index]];
    let hasChange = true;
    let memoValue = oldValue;

    if (oldDependencies) {
      hasChange = dependencies.some(
        (dep, i) => !Object.is(dep, oldDependencies[i])
      );
    }
    if (hasChange) {
      memoValue = callback();
      states[index] = [dependencies, memoValue];
    }

    currentStateIndex++;
    return memoValue;
  };

  const _render = () => {
    const { rootComponent, root } = renderInfo;
    if (!root || !rootComponent) return;
    root.innerHTML = rootComponent();
    currentStateIndex = 0;
    renderCount++;

    console.log("rendered", renderCount);
  };

  function render(rootComponent, root) {
    renderInfo.root = root;
    renderInfo.rootComponent = rootComponent;
    _render();
  }

  return { useEffect, useMemo, useState, render };
}

export const { useEffect, useMemo, useState, render } = myReact();
