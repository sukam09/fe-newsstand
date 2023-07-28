// https://uzihoon.com/post/b0bd9910-42b6-11ed-8b2b-635e2af2f788

const PROMISE_STATUS = Object.freeze({
  PENDING: "pending",
  FULFILLED: "fulfilled",
  REJECTED: "rejected",
});

class CustomPromise {
  status;
  value;
  onFullfilled;
  onRejected;
  onFinally;
  thenPromiseResolve;
  thenPromiseReject;
  constructor(executor) {
    this.status = PROMISE_STATUS.PENDING;

    try {
      executor(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      this.reject(error);
    }
  }

  addTask(callback) {
    queueMicrotask(callback);
  }

  resolve(value) {
    this.status = PROMISE_STATUS.FULFILLED;
    this.value = value;
    this.addTask(() => {
      if (!this.onFullfilled) return;

      try {
        const returned = this.onFullfilled(this.value);

        if (returned instanceof CustomPromise) {
          returned.then(this.thenPromiseResolve, this.thenPromiseReject);
          return;
        }
        this.thenPromiseResolve(returned);
      } catch (error) {
        this.thenPromiseReject(error);
      }
    });
  }

  reject(error) {
    this.status = PROMISE_STATUS.REJECTED;
    this.value = error;

    this.addTask(() => {
      if (!this.onRejected) return;

      try {
        const returned = this.onRejected(this.value);

        if (returned instanceof CustomPromise) {
          returned.then(this.thenPromiseResolve, this.thenPromiseReject);
          return;
        }
        this.thenPromiseResolve(returned);
      } catch (error) {
        this.thenPromiseReject(error);
      }
    });
  }

  then(onFullfilled, onRejected) {
    this.onFullfilled =
      typeof onFullfilled === "function" ? onFullfilled : (value) => value;
    this.onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (error) => {
            throw error;
          };

    return new CustomPromise((resolve, reject) => {
      this.thenPromiseResolve = resolve;
      this.thenPromiseReject = reject;
    });
  }

  catch(onRejected) {
    return this.then(undefined, onRejected);
  }

  finally(onFinally) {
    return this.then(onFinally, onFinally);
  }
}

export default CustomPromise;

const _promise = new CustomPromise((resolve, reject) => {
  setTimeout(() => resolve(1), 1000);
})
  .then((value) => {
    console.log(value, "hi");
    return 2;
  })
  .then((value) => {
    console.log("second", value);

    throw Error("error");
  })
  .catch((error) => {
    console.error(error.message);
  })
  .finally((value) => {
    console.log(value);
  });

console.log(_promise);
