import { NewsStandHeaderSubject } from './subject.js';
import { NewsStandHeaderObserver } from './observer.js';

const newsStandHeaderSubject = new NewsStandHeaderSubject();
const newsStandHeaderObserver = new NewsStandHeaderObserver(newsStandHeaderSubject);
newsStandHeaderSubject.addObserver(newsStandHeaderObserver);

export default newsStandHeaderSubject;
