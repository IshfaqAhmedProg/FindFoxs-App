export default function (urlArray: Array<string>) {
  const urlRegex = new RegExp(
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
  );
  const finalArray = [];
  for (const url of urlArray) {
    if (url && url.match(urlRegex)) {
      finalArray.push(url);
    }
  }
  return finalArray;
}
