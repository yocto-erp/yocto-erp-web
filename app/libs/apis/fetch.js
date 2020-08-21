import { stringify } from 'qs';
import { toast } from 'react-toastify';
import { get, STORAGE } from '../utils/storage';

class ApiError extends Error {
  constructor(message, errors) {
    super(message);
    this.errors = errors;
  }
}

function logError(error) {
  // eslint-disable-next-line no-console
  console.error('Looks like there was a problem: \n', error);
  if (error instanceof ApiError) {
    // eslint-disable-next-line no-alert
    toast.error(error.errors.map(t => t.message).join('\n'), {});
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
      throw new ApiError(response.statusText, errors);
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
    const { page, size, sorts, filter } = params;
    const body = {
      page,
      size,
      sorts,
      ...filter,
    };
    return fetchJSON(`${url}?${stringify(body, { arrayFormat: 'repeat' })}`);
  };
}
