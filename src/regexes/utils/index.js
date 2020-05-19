const float = '-?\\d*(?:\\.\\d+)';

export const number = `(${float}?)`;
export const percentage = `(${float}?%)`;
export const numberOrPercentage = `(${float}?%?)`;
