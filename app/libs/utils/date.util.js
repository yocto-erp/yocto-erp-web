import moment from 'moment';

const DATE_FORMAT = 'DD/MM/YYYY HH:mm:ss';

export function formatDate(dateObj) {
  return moment(dateObj).format(DATE_FORMAT);
}
