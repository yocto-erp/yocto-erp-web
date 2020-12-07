import useSWR from 'swr';
import { fetchJSON } from '../fetch';
import { API_URL } from '../../../constants';

const API_ENDPOINT_URL = `${API_URL}/template/type`;

export const TEMPLATE_TYPE = {
  STUDENT_FEE: 1,
};

export const templateTypeApi = {
  search: () => fetchJSON(API_ENDPOINT_URL),
  read: id => fetchJSON(`${API_ENDPOINT_URL}/${id}`),
};

export const useTemplateType = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: templateType, error, mutate } = useSWR(
    'getTemplateType',
    templateTypeApi.search,
    {
      initialData: [],
      shouldRetryOnError: true,
      revalidateOnMount: true,
      errorRetryCount: 3,
      errorRetryInterval: 15000,
    },
  );
  const isLoading = !templateType && !error;

  return {
    isLoading,
    templateTypeList: templateType,
    getTemplate: mutate,
  };
};

export const useTemplateTypeId = id => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: templateType, error, mutate } = useSWR(
    () => (id ? ['getTemplateTypeId', id] : null),
    (url, _id) => {
      console.log(url);
      console.log(_id);
      return templateTypeApi.read(_id);
    },
    {
      initialData: [],
      shouldRetryOnError: true,
      revalidateOnMount: true,
      errorRetryCount: 3,
      errorRetryInterval: 15000,
    },
  );
  const isLoading = !templateType && !error;

  return {
    isLoading,
    templateType,
    getTemplate: mutate,
  };
};
