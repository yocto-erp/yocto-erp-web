import { LRUMap } from "lru_map";

export const PosScrollOptions = {
  scrollbars: {
    autoHide: "scroll",
  },
  paddingAbsolute: true,
};

export const PRODUCT_CACHE_LRU = new LRUMap(50);
