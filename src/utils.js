import { fetchPressInfo } from './api.js';
import { store, actionCreator } from '../core/store.js';
import { SNACKBAR_DURATION } from './constants.js';

export function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

export function convertRegDate(regDate) {
  const [date, time] = regDate.split(' ');

  const year = date.slice(0, 4);
  const month = date.slice(4, 6);
  const day = date.slice(6, 8);
  const hourMinute = time.slice(0, 5);

  const convertedRegDate = `${year}.${month}.${day}. ${hourMinute}`;

  return convertedRegDate;
}

export async function getPidMap() {
  const data = await fetchPressInfo();
  return new Map(data.map(({ id, name, logo }) => [id, { name, logo }]));
}

export function getSubscribed(id) {
  return store.getMyPress().find(({ pid }) => pid === id);
}

export function handleSubscribe(id, name, caller, subscribeButton, onChangeTab) {
  const { isSubscribed } = subscribeButton.state;

  if (isSubscribed) {
    caller.alert.setState({ ...caller.alert.state, isShow: true, pid: id, pressName: name, subscribeButton });
  } else {
    subscribeButton.setState({ ...subscribeButton.state, isSubscribed: true });

    // 만약 스낵바 타이머가 걸려 있으면 초기화하고 다시 5초 카운트
    if (caller.snackBarTimer !== undefined) {
      clearTimeout(caller.snackBarTimer);
    }

    caller.snackBar.setState({ ...caller.snackBar.state, isShow: true });

    caller.snackBarTimer = setTimeout(() => {
      caller.snackBar.setState({ ...caller.snackBar.state, isShow: false });
      if (caller.state.view === 'list') {
        onChangeTab('my', 'list');
      }
    }, SNACKBAR_DURATION);

    store.dispatch(actionCreator('subscribe', { pid: id, pressName: name }));
  }
}
