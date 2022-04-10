import useSWR from "swr";
import saleApi from "../../../libs/apis/order/sale.api";

export const SWR_KEY_SALE_CONFIGURE = "saleConfigure";

export default () => {
  const { data, error, mutate } = useSWR(
    SWR_KEY_SALE_CONFIGURE,
    saleApi.getConfigure,
    {
      revalidateOnMount: true,
    },
  );

  const isLoading = !data && !error;

  return {
    isLoading,
    configure: data,
    getConfigure: mutate,
  };
};
