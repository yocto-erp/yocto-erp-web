export const transformUnNumber = value => (Number.isNaN(value) ? 0 : value);

export const isNumber = value => !Number.isNaN(Number(value));
