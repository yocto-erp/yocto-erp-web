import { v4 as uuidv4 } from "uuid";

export const STORAGE = {
  JWT: "JWT",
  CLIENT_ID: "CLIENT_ID",
};

export function get(key) {
  return localStorage.getItem(key);
}

export function set(key, value) {
  return localStorage.setItem(key, value);
}

export function getClientId() {
  let rs = "";
  rs = get(STORAGE.CLIENT_ID);
  if (!rs) {
    rs = uuidv4();
    set(STORAGE.CLIENT_ID, rs);
  }
  return rs;
}
