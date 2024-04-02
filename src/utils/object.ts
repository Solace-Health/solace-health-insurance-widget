export const removeNullValues = <T extends { [key: string]: unknown }>(
  obj: T
): Partial<T> =>
  Object.entries(obj)
    .filter(([_, v]) => v != null)
    .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});
