import moment from 'moment';

const DATE_TIME_FORMAT = 'DD/MM/YYYY HH:mm:ss';

const DATE_FORMAT = 'DD/MM/YYYY';

export function formatDate(dateObj) {
  return moment(dateObj).format(DATE_TIME_FORMAT);
}

export function formatDateOnly(dateObj) {
  return moment(dateObj).format(DATE_FORMAT);
}
