export function listPage(url) {
  return `${url}`;
}

export function newPage(url) {
  return `${url}/new`;
}

export function editPage(url, id) {
  return `${url}/${id}/edit`;
}

export function viewPage(url, id) {
  return `${url}/${id}/view`;
}

export function deletePage(url, id) {
  return `${url}/${id}/delete`;
}
