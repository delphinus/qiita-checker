export const isObject = (value: any): value is object =>
  value !== null && value !== undefined && Object(value) === value
