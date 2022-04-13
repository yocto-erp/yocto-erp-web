import { API_URL } from "../../constants";
import noImage from "../../images/No_image_available.svg";
import { createCRUDApi } from "./fetch";

export const IPFS_GATEWAY_URL = "https://ipfs.io/ipfs";
const IPFS_GATEWAY = {
  cloudflare: "https://cloudflare-ipfs.com/ipfs",
  ipfs: "https://ipfs.io/ipfs",
};
export const ASSET_API_ENDPOINT_URL = `${API_URL}/image`;
export const imageUrl = fileId => `${ASSET_API_ENDPOINT_URL}/${fileId}`;
export const imagePath = filename =>
  filename ? `/upload/${filename}` : noImage;
export const thumbnail = filename =>
  filename ? `/thumbnail/${filename}.png` : noImage;

export const cloudImageUrl = asset => {
  if (asset) {
    const { ipfs, fileId } = asset;
    if (ipfs && ipfs.totalPinned >= 2) {
      return `${IPFS_GATEWAY.cloudflare}/${ipfs.carId}/${fileId}`;
    }
    return imageUrl(fileId);
  }
  return noImage;
};

export const assetApi = {
  ...createCRUDApi(ASSET_API_ENDPOINT_URL),
};
