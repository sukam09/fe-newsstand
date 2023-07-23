import { Observer } from '../../utils/observer.js';

class NewsStandHeaderObserver extends Observer {
  constructor(subject) {
    super(subject);
  }

  update() {
    location.reload();
    this.subject.updateHeaderTime();
  }
}

export { NewsStandHeaderObserver };
