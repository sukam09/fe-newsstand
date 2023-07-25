const PROMISE_STATUS = Object.freeze({
  PENDING: "pending",
  FULFILLED: "fulfilled",
  REJECTED: "rejected",
});

// TODO: promise chaining 이 가능하게 구현해야 함
class CustomPromise {
  status;
  value;
  onFullfilledList;
  onRejectedList;
  onFinallyList;
  constructor(executor) {
    this.status = PROMISE_STATUS.PENDING;
    this.onFullfilledList = [];
    this.onRejectedList = [];
    this.onFinallyList = [];

    try {
      this.addTask(() =>
        executor(this.resolve.bind(this), this.reject.bind(this))
      );
    } catch (error) {
      this.reject(error);
    }
  }

  static all() {}

  static allSettled() {}

  addTask(callback) {
    queueMicrotask(callback);
  }

  resolve(value) {
    this.status = PROMISE_STATUS.FULFILLED;
    this.value = value;
    this.onFullfilledList.forEach((onFullfilled) => onFullfilled(value));
    console.log(this.onFullfilledList, this.status, this.value);
  }

  reject(error) {
    this.status = PROMISE_STATUS.REJECTED;
    this.value = error;
    this.onRejectedList.forEach((onRejected) => onRejected(error));
  }

  then(onFullfilled, onRejected) {
    const doFullfilledTask = () => {
      if (typeof onFullfilled !== "function") return;

      onFullfilled(this.value);
    };
    const doRejectedTask = () => {
      if (typeof onRejected !== "function") return;

      onRejected(this.value);
    };

    switch (this.status) {
      case PROMISE_STATUS.PENDING:
        this.onFullfilledList.push(onFullfilled);
        this.onRejectedList.push(onRejected);
        break;
      case PROMISE_STATUS.FULFILLED:
        this.addTask(doFullfilledTask.bind(this));
        break;
      case PROMISE_STATUS.REJECTED:
        this.addTask(doRejectedTask.bind(this));
        break;
      default:
        return this;
    }
  }

  catch(onRejected) {
    const doRejectedTask = () => {
      if (typeof onRejected !== "function") return;

      onRejected(this.value);
    };

    switch (this.status) {
      case PROMISE_STATUS.PENDING:
        this.onRejectedList.push(onRejected);
        return this;
      case PROMISE_STATUS.REJECTED:
        this.addTask(doRejectedTask.bind(this));
    }
  }

  finally(onFinally) {
    const doFinallyTask = () => {
      if (typeof onFinally !== "function") return;

      onFinally(this.value);
    };
    switch (this.status) {
      case PROMISE_STATUS.PENDING:
        this.onFinallyList.push(onFinally);
        break;
      case PROMISE_STATUS.FULFILLED:
        this.addTask(doFinallyTask.bind(this));
        break;
    }
  }
}

export default CustomPromise;

const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve, ms);
  });
};

const fn = async () => {
  const promise = new Promise();
};

const _promise = new CustomPromise((resolve, reject) => {
  setTimeout(() => {
    console.log(1);
    resolve(1);
  }, 1000);
})
  .then((value) => {
    console.log(value, "hi");
  })
  .catch((err) => {
    console.error(err);
  });

console.log(_promise);
