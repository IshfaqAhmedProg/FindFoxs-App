export default function sumObjectValues(object: any) {
  const values: Array<number> = Object.values(object);
  const sum = values.reduce((acc, val) => {
    return acc + val;
  });
  return sum;
}
