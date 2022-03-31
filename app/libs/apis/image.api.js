import { API_URL } from "../../constants";
import noImage from "../../images/No_image_available.svg";
import { createCRUDApi } from "./fetch";

export const ASSET_API_ENDPOINT_URL = `${API_URL}/image`;
export const imageUrl = fileId => `${ASSET_API_ENDPOINT_URL}/${fileId}`;
export const imagePath = filename =>
  filename ? `/public/${filename}` : noImage;
export const thumbnail = filename =>
  filename ? `/public/thumbnail/${filename}.png` : noImage;

export const assetApi = {
  ...createCRUDApi(ASSET_API_ENDPOINT_URL),
};
