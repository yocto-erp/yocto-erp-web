import { format, parse } from 'date-fns';

export const FNS_DATE_TIME_FORMAT = 'dd/MM/yyyy HH:mm:ss';
export const FNS_DATE_FORMAT = 'dd/MM/yyyy';
export const FNS_MONTH_FORMAT = 'MM/yyyy';

export function formatDate(dateObj) {
  return format(dateObj, FNS_DATE_TIME_FORMAT);
}

export function formatDateOnly(dateObj) {
  return format(dateObj, FNS_DATE_FORMAT);
}

export function parseDateOnly(dateString) {
  return parse(dateString, FNS_DATE_FORMAT);
}
