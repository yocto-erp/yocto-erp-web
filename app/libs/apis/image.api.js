import { API_URL } from "../../constants";
import noImage from "../../images/No_image_available.svg";
import { createCRUDApi } from "./fetch";
// eslint-disable-next-line no-unused-vars
const IPFS_GATEWAY = {
  cloudflare: "https://cloudflare-ipfs.com/ipfs",
  ipfs: "https://ipfs.io/ipfs",
  dweb: "https://dweb.link/ipfs",
};
export const ASSET_API_ENDPOINT_URL = `${API_URL}/image`;
export const imageUrl = fileId =>
  fileId ? `${ASSET_API_ENDPOINT_URL}/${fileId}` : noImage;
export const imagePath = filename =>
  filename ? `/upload/${filename}` : noImage;
export const thumbnail = filename =>
  filename ? `/thumbnail/${filename}.png` : noImage;

const dwebLink = (carId, fieldId) =>
  `https://${carId}.ipfs.dweb.link/${fieldId}`;

export const cloudAssetUrl = asset => {
  if (asset) {
    const { ipfs, fileId } = asset;
    if (ipfs && ipfs.totalPinned >= 2) {
      return dwebLink(ipfs.carId, fileId);
    }
    return imageUrl(fileId);
  }
  return noImage;
};

export const assetApi = {
  ...createCRUDApi(ASSET_API_ENDPOINT_URL),
};
