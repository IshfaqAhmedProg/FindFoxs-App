import analyseSingleDataResult from "./analyseSingleDataResult";
import convertToReadableString from "./stringTransformers/convertToReadableString";

export default async function fetchSingleDataResults(
  fetchUrl: string,
  statToMap: Array<string>,
  body: string
) {
  return fetch(fetchUrl, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: body,
  }).then((res) => res.json());
}
