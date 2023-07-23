function checkIfFacebookPage(urlArray: Array<string>): Array<string> {
  // Regular expression to extract the Facebook page username or ID from the URL
  const urlRegex = new RegExp(
    /(?:https?:\/\/)?(?:www\.)?facebook\.com\/(?:pages\/|pg\/)?([a-zA-Z0-9_.]+)\/?/
  );
  const finalArray = [];
  for (const url of urlArray) {
    if (url && url.match(urlRegex)) {
      finalArray.push(url);
    }
  }
  return finalArray;
}
export default checkIfFacebookPage;
