import { NewsStandHeaderSubject } from './subject.js';
import { TimeObserver } from './observer.js';

const newsStandHeaderSubject = new NewsStandHeaderSubject();
const timeObserver = new TimeObserver(newsStandHeaderSubject);
newsStandHeaderSubject.addObserver(timeObserver);

export default newsStandHeaderSubject;
