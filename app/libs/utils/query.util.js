import forIn from 'lodash/forIn';
import { stringify } from 'qs';

export function stringifySearchObject(params) {
  const { page, size, sorts, filter } = params;
  const mapSorts = [];
  forIn(sorts, function mapItem(val, key) {
    if (val && val.length && key && key.length) {
      mapSorts.push(`${key}:${val}`);
    }
  });
  const body = {
    page,
    size,
    sorts: mapSorts,
    ...filter,
  };
  return stringify(body, {
    arrayFormat: 'indices',
  });
}

export const convertQueryWithDate = (dateParams = ['startDate', 'endDate']) => (
  key,
  value,
) => {
  if (dateParams.indexOf(key) > -1) {
    console.log(value);
    if (value) {
      return new Date(value);
    }
    return null;
  }
  return value;
};
