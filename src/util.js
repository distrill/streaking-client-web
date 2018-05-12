import moment from 'moment';

export function today() {
  return moment().format('YYYY-MM-DD');
}

export function yesterday() {
  return moment()
    .subtract(1, 'day')
    .format('YYYY-MM-DD');
}

export function isOngoing({ dateEnd: date, interval } = {}) {
  if (!date) return false;
  if (date === today()) return true;
  if (date === yesterday()) return true;
  return moment(date).isSame(today(), interval);
}
