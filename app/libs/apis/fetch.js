import { stringify } from 'qs';
import { toast } from 'react-toastify';
import forIn from 'lodash/forIn';
import React from 'react';
import { get, STORAGE } from '../utils/storage';
import ErrorMessage from '../../components/Form/ErrorMessage';
import { isFunc } from '../../utils/util';

// eslint-disable-next-line no-unused-vars
const SYSTEM_ERROR = 1;
const API_ERROR = 2;

class ApiError extends Error {
  constructor(message, errors, type) {
    super(message);
    this.errors = errors;
    this.type = type;
  }
}

function logError(error) {
  // eslint-disable-next-line no-console
  console.error('Looks like there was a problem: \n', error);
  if (!(error instanceof ApiError)) {
    toast.error(<ErrorMessage errors={error.errors} />, {
      toastId: error.errors.join(''),
      position: toast.POSITION.TOP_CENTER,
    });
  }
  throw error;
}

/**
 * Error: {name, code, message}
 * @param response
 * @returns {{ok}|*}
 */
async function validateResponse(response) {
  if (!response.ok) {
    let errors = [];
    let type = API_ERROR;
    switch (response.status) {
      case 400:
        errors = await response.json();
        break;
      case 401:
        // window.location.reload();
        break;
      case 403:
        errors = [
          {
            name: 'path',
            code: 'ACCESS_DENIED',
            message: 'You have no right to access.',
          },
        ];
        break;
      default:
        type = 1;
        errors = [
          {
            name: 'path',
            code: 'INTERNAL_ERROR',
            message: response.statusText,
          },
        ];
        break;
    }
    if (errors.length) {
      throw new ApiError(response.statusText, errors, type);
    } else {
      throw Error(response.statusText);
    }
  }
  return response;
}

function readResponseAsJSON(response) {
  return response.json();
}

function getAuthHeader() {
  const token = get(STORAGE.JWT);
  return {
    Authorization: `Bearer ${encodeURIComponent(token)}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
}

export function fetchWithAuth(pathToResource) {
  return fetch(pathToResource, { headers: getAuthHeader() });
}

export function fetchJSON(pathToResource) {
  return fetch(pathToResource, { headers: getAuthHeader() })
    .then(validateResponse)
    .then(readResponseAsJSON)
    .catch(logError);
}

export function postJSON(pathToResource, body) {
  return fetch(pathToResource, {
    method: 'POST',
    headers: getAuthHeader(),
    body: JSON.stringify(body),
  })
    .then(validateResponse)
    .then(readResponseAsJSON)
    .catch(logError);
}

export function deleteRequest(pathToResource) {
  return fetch(pathToResource, {
    method: 'DELETE',
    headers: getAuthHeader(),
  })
    .then(validateResponse)
    .then(readResponseAsJSON)
    .catch(logError);
}

export function createSearchApi(url) {
  /**
   * Search query include page,size,filter
   * @param params: {
   *   page: number,
   *   size: number,
   *   sorts: [],
   *   filter:{
   *     search: '',
   *     id: number,
   *     ...
   *   }
   * }
   */
  return params => {
    const { page, size, sorts, filter } = params || {
      page: 1,
      size: 10,
      sorts: [],
      filter: {},
    };
    const mapSorts = [];
    forIn(sorts, function mapItem(val, key) {
      if (val && val.length && key && key.length) {
        mapSorts.push([`${key}:${val}`]);
      }
    });
    const body = {
      page,
      size,
      sorts: mapSorts,
      ...filter,
    };
    return fetchJSON(
      `${isFunc(url) ? url() : url}?${stringify(body, {
        arrayFormat: 'repeat',
      })}`,
    );
  };
}

export function createCRUDApi(url) {
  const create = form => postJSON(`${url}`, form);
  const search = createSearchApi(url);
  const read = id => fetchJSON(`${url}/${id}`);
  const update = (id, form) => postJSON(`${url}/${id}`, form);
  const remove = id => deleteRequest(`${url}/${id}`);
  return {
    search,
    create,
    read,
    update,
    remove,
  };
}

export const download = (url, name) =>
  fetchWithAuth(url)
    .then(response => response.blob())
    .then(blobby => {
      const objectUrl = window.URL.createObjectURL(blobby);
      const anchor = document.createElement('a');
      anchor.href = objectUrl;
      anchor.download = name;
      anchor.click();

      window.URL.revokeObjectURL(objectUrl);
      return objectUrl;
    });
