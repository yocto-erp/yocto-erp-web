import useSWR from "swr";
import { memberApi } from "../../apis/member.api";
import { DEFAULT_SWR_OPTION } from "./constants";

export const SWR_KEY_USER_SHOP = "user-shop";

export default () => {
  const { data, error, mutate } = useSWR(
    SWR_KEY_USER_SHOP,
    memberApi.getShop,
    DEFAULT_SWR_OPTION,
  );
  const isLoading = !data && !error;

  return {
    isLoading,
    set: mutate,
    shop: data,
  };
};
