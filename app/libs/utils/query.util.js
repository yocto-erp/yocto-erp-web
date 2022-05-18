import forIn from "lodash/forIn";
import { stringify } from "qs";
import { hasText } from "../../utils/util";

export function stringifySearchObject(params) {
  const { page, size, sorts, filter } = params;
  const mapSorts = [];
  forIn(sorts, function mapItem(val, key) {
    if (hasText(String(val)) && hasText(String(key))) {
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
    arrayFormat: "indices",
  });
}

export const objectToQueryString = obj =>
  stringify(obj, { arrayFormat: "indices" });

export const convertQueryWithDate = (dateParams = ["startDate", "endDate"]) => (
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

export const convertQueryWithDateRange = (dateRangeParam = "dateRange") => (
  key,
  value,
) => {
  if (dateRangeParam === key) {
    console.log("fromUrl dateRange", value);
    let rs = null;
    if (value) {
      rs = { key: "selection" };
      rs.startDate = new Date(value.startDate);
      rs.endDate = new Date(value.endDate);
    }
    return rs;
  }
  return value;
};
