//import Fetch from '../store/Fetch';
//import { select, put, call } from 'redux-saga/effects';

export const MARK_NOTIFICATION_READ = 'MARK_NOTIFICATION_READ';
export const MARK_NOTIFICATION_READ_SUCCESS = 'MARK_NOTIFICATION_READ_SUCCESS';
export const MARK_NOTIFICATION_READ_FAILURE = 'MARK_NOTIFICATION_READ_FAILURE';
export const MARK_ALL_NOTIFICATIONS_READ = 'MARK_ALL_NOTIFICATIONS_READ';
export const DISMISS_NOTIFICATIONS = 'DISMISS_NOTIFICATIONS';

/*
return {
  markNotificationsAsRead: () => {
    dispatch(markNotificationsAsRead());
  },
  dismissNotifications: () => {
    dispatch(dismissNotifications());
  },
  markReadNotification: (notification) => {
    dispatch(markReadNotification(notification));
  },
  initializeWS: () => {
    dispatch({type: REQUEST_INITIALIZE_WS });
  }
}*/

export function markNotificationsAsRead() {
  return { type: MARK_ALL_NOTIFICATIONS_READ };
}

export function dismissNotifications() {
  return {type: DISMISS_NOTIFICATIONS};
}

export function markReadNotification(notification){
  /*
  return {
    type: MARK_NOTIFICATION_READ,
    notification: notification
  }*/
}

export default function* postReadNotification(action) {
  /*const state = yield select();
  const token = state.session.token;

  try {
    const { notification } = action;
    const endpoint = '/api/alerts/';
    const jsonData = JSON.stringify(notification);
    const response = yield call(Fetch.PUT, endpoint, [], jsonData, {token: token });
    yield put({type: MARK_NOTIFICATION_READ_SUCCESS, id: response.id});
  }
  catch(error) {
    yield put({type: MARK_NOTIFICATION_READ_FAILURE, error: error});
  }
  */
}
