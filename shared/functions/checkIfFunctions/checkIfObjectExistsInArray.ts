export default function (array: Array<any>, key: string, object: any) {
  return array.some(function (element) {
    return element[key] === object[key];
  });
}
