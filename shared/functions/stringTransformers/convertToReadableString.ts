export default function convertToReadableString(
  data: string | boolean | Array<any> | number
) {
  const stringified =
    Array.isArray(data) && data.length == 0 ? "None" : data.toString();
  return (
    stringified.charAt(0).toUpperCase() +
    stringified.slice(1).replace(/[_,-]/, " ")
  );
}
