import {
  formatDistance,
  endOfMonth,
  endOfWeek,
  format,
  parse,
  startOfMonth,
  startOfWeek,
} from 'date-fns';

export const FNS_DATE_TIME_FORMAT = 'dd/MM/yyyy HH:mm:ss';
export const FNS_DATE_FORMAT = 'dd/MM/yyyy';
export const FNS_MONTH_FORMAT = 'MM/yyyy';

export function formatDate(dateObj) {
  return format(dateObj, FNS_DATE_TIME_FORMAT);
}

export function ago(date1, date2) {
  return formatDistance(date1, date2);
}

export function formatDateOnly(dateObj) {
  return format(dateObj, FNS_DATE_FORMAT);
}

export function parseDateOnly(dateString) {
  return parse(dateString, FNS_DATE_FORMAT);
}

export function formatMonth(month, year) {
  return format(new Date(year, month, 1, 0, 0, 0, 0), FNS_MONTH_FORMAT);
}

export function todayRange() {
  const from = new Date();
  from.setHours(0);
  from.setMinutes(0);
  from.setSeconds(0);
  from.setMilliseconds(0);
  const to = new Date();
  to.setHours(23);
  to.setMinutes(59);
  to.setSeconds(59);
  to.setMilliseconds(999);
  return { from, to };
}

export function thisWeekRange() {
  return {
    from: startOfWeek(new Date()),
    to: endOfWeek(new Date()),
  };
}

export function thisMonthRange() {
  return {
    from: startOfMonth(new Date()),
    to: endOfMonth(new Date()),
  };
}
