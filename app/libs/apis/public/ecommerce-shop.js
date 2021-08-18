import { stringify } from 'qs';
import forIn from 'lodash/forIn';
import { API_URL } from '../../../constants';
import { createCRUDApi, fetchJSON } from '../fetch';

const API_ENDPOINT_URL = `${API_URL}/ecommerce-shop`;

const ecommerceShopApi = {
  ...createCRUDApi(API_ENDPOINT_URL),
  listPublicECommerceProducts: (publicId, params) => {
    const { page, size, sorts, search, tagging } = params;
    const mapSorts = [];
    forIn(sorts, function mapItem(val, key) {
      if (val && val.length && key && key.length) {
        mapSorts.push([`${key}:${val}`]);
      }
    });
    const body = {
      publicId,
      page,
      size,
      sorts: mapSorts,
      search,
      tagging,
    };
    return fetchJSON(
      `${API_ENDPOINT_URL}/products?${stringify(body, {
        arrayFormat: 'repeat',
      })}`,
    );
  },
};

export default ecommerceShopApi;
