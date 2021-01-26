/*
 * NotFoundPage Messages
 *
 * This contains all the text for the NotFoundPage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'containers.Audit';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Page not found.',
  },
  create: {
    id: `${scope}.create`,
    defaultMessage: '{name} tạo {item}',
  },
  update: {
    id: `${scope}.update`,
    defaultMessage: '{name} cập nhập {item}',
  },
  delete: {
    id: `${scope}.delete`,
    defaultMessage: '{name} xoá {item}',
  },
  cost: {
    id: `${scope}.cost`,
    defaultMessage: 'phiếu thu/chi',
  },
});
