import { LRUMap } from "lru_map";

export const DEFAULT_SCROLL_OPTIONS = {
  resize: "both",
  scrollbars: {
    autoHide: "leave",
  },
  paddingAbsolute: false,
};

export const PRODUCT_SHOP_CACHE_LRU = new LRUMap(50);
