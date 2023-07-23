import { LatestNewsSubject } from './subject.js';
import { LatestNewsObserver } from './observer.js';

const latestNewsSubject = new LatestNewsSubject();
const latestNewsObserver = new LatestNewsObserver(latestNewsSubject);
latestNewsSubject.addObserver(latestNewsObserver);

export default latestNewsSubject;
