import { Observer } from '../../utils/observer.js';

class LatestNewsObserver extends Observer {
  constructor(subject) {
    super(subject);
  }

  update() {
    this.subject.initLatestNews();
  }
}

export { LatestNewsObserver };
