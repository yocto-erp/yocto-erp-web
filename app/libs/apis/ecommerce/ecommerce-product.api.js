import useSWR from "swr";
import { createCRUDApi } from "../fetch";
import { API_URL } from "../../../constants";
import { templateTypeApi } from "../template/templateType.api";

const API_ENDPOINT_URL = `${API_URL}/ecommerce/product`;

const EcommerceProductApi = createCRUDApi(API_ENDPOINT_URL);

export const useProductGet = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: templateType, error, mutate } = useSWR(
    "getTemplateType",
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

export default EcommerceProductApi;
