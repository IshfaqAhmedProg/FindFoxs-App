export const uniqueKeys = (objects: any): Array<string> => {
  const keys = objects.reduce((acc: any, obj: any) => {
    Object.keys(obj).forEach((key) => acc.add(key));
    return acc;
  }, new Set());
  return Array.from(keys);
};
