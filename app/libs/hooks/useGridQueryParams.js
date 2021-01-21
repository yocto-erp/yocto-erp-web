import { useHistory, useLocation } from 'react-router-dom';
import { parse } from 'qs';
import { useCallback, useEffect, useState } from 'react';
import { stringifySearchObject } from '../utils/query.util';

export const useGridQueryParams = (
  mappingUrlData,
  { initFilter = {}, initSorts = {} },
) => {
  const { search, pathname } = useLocation();
  const history = useHistory();

  const parseSearch = obj => {
    const rs = {
      page: 1,
      size: 10,
      sorts: null,
      filter: null,
    };
    if (obj) {
      const parseObj = parse(obj, {
        ignoreQueryPrefix: true,
      });
      for (let i = 0; i < Object.keys(parseObj).length; i += 1) {
        const key = Object.keys(parseObj)[i];
        const value = parseObj[key];
        switch (key) {
          case 'page':
            rs.page = Number(value);
            break;
          case 'size':
            rs.size = Number(value);
            break;
          case 'sorts': {
            if (!rs.sorts) {
              rs.sorts = {};
            }
            let listSorts = [];
            if (Array.isArray(value)) {
              listSorts = value;
            } else {
              listSorts = [value];
            }
            listSorts.forEach(t => {
              const [field, dir] = t.split(':');
              if (field && dir) {
                rs.sorts[field] = dir;
              }
            });
            break;
          }
          default:
            if (!rs.filter) {
              rs.filter = {};
            }
            rs.filter[key] = mappingUrlData
              ? mappingUrlData(key, value)
              : value;
            break;
        }
      }
    }

    return rs;
  };

  const [queryObj, setQueryObj] = useState(() => parseSearch(search));

  useEffect(() => {
    const rs = parseSearch(search);
    if (search === '') {
      if (!rs.sorts) {
        rs.sorts = initSorts;
      }
      if (!rs.filter) {
        rs.filter = initFilter;
      }
    }
    setQueryObj(rs);
  }, [search]);

  const updateURL = obj =>
    history.replace({
      pathname,
      search: stringifySearchObject(obj),
    });

  const setSize = useCallback(
    size => {
      const newObj = { ...queryObj, size };
      updateURL(newObj);
    },
    [queryObj, updateURL],
  );

  const setFilter = useCallback(
    filter => {
      const newObj = { ...queryObj, filter };
      updateURL(newObj);
    },
    [queryObj, updateURL],
  );

  const setPage = useCallback(
    page => {
      const newObj = { ...queryObj, page };
      updateURL(newObj);
    },
    [queryObj, updateURL],
  );

  const setSorts = useCallback(
    sorts => {
      const newObj = { ...queryObj, sorts };
      updateURL(newObj);
    },
    [queryObj, updateURL],
  );

  return {
    queryObj,
    pathname,
    setSize,
    setPage,
    setFilter,
    setSorts,
    updateURL,
  };
};
