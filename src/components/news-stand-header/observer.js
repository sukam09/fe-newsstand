import { Observer } from '../../utils/observer.js';

class TimeObserver extends Observer {
  constructor(subject) {
    super(subject);
  }

  update() {
    location.reload();
    this.subject.updateHeaderTime();
  }
}

export { TimeObserver };
