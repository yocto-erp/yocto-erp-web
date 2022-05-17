import {
  endOfMonth,
  endOfWeek,
  format,
  formatDistance,
  parse,
  startOfMonth,
  startOfWeek,
  parseISO,
  formatDistanceToNowStrict,
  addDays as fnsAddDays,
} from "date-fns";
import { vi, enUS } from "date-fns/locale";
import { hasText } from "../../utils/util";

export const addDays = fnsAddDays;
export const FNS_DATE_TIME_FORMAT = "dd/MM/yyyy HH:mm:ss";
export const FNS_DATE_FORMAT = "dd/MM/yyyy";
export const FNS_MONTH_FORMAT = "MM/yyyy";

export function formatDate(dateObj) {
  return format(dateObj, FNS_DATE_TIME_FORMAT);
}

export function formatDateFromStr(dateObj) {
  if (!hasText(dateObj)) {
    return "";
  }
  return format(new Date(dateObj), FNS_DATE_TIME_FORMAT);
}

export function ago(date1, date2) {
  return formatDistance(date1, date2);
}

export function formatDateOnlyFromStr(dateObj) {
  if (!hasText(dateObj)) {
    return "";
  }
  return format(new Date(dateObj), FNS_DATE_FORMAT);
}

export function formatDateOnly(dateObj) {
  if (!dateObj) {
    return "";
  }
  return format(dateObj, FNS_DATE_FORMAT);
}

export function parseDateOnly(dateString) {
  return parse(dateString, FNS_DATE_FORMAT, null);
}

export function parseIso(dateString) {
  return parseISO(dateString);
}

export function monthToLocalDateObj(month, year) {
  return new Date(year, month, 1, 0, 0, 1, 0);
}

export function toMonthObj(date) {
  if (date) {
    const month = date.getMonth();
    const year = date.getFullYear();
    return {
      month,
      year,
      absolute: year * 12 + month,
    };
  }

  return null;
}

export function formatMonth(month, year) {
  if (month >= 0 && year > 0) {
    return format(new Date(year, month, 1, 0, 0, 0, 0), FNS_MONTH_FORMAT);
  }
  return "";
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

const getMappingLocale = localeStr => {
  switch (localeStr) {
    case "vi":
      return vi;
    default:
      return enUS;
  }
};

export function distanceFromNow(date, opts = { locale: "vi" }) {
  return formatDistanceToNowStrict(date, {
    addSuffix: true,
    locale: getMappingLocale(opts.locale),
  });
}

export const getDatesBetween = (startDate, endDate, includeEndDate = true) => {
  console.log(startDate, endDate);
  const dates = [];
  if (startDate && endDate) {
    const currentDate = new Date(startDate);
    while (currentDate < endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    if (includeEndDate) dates.push(new Date(endDate));
  }

  return dates;
};
