import isMobilePhone from "validator/lib/isMobilePhone";

export default function checkIfPNumber(pNumberArray: Array<string>) {
  const finalArray = [];
  for (const pNumber of pNumberArray) {
    if (pNumber && isMobilePhone(pNumber.toString())) {
      //format the item for task
      const formattedNumber =
        "+" +
        pNumber
          .toString()
          .replace(/[-+()]/g, "")
          .replace(/\s/g, "");
      console.log(formattedNumber);
      finalArray.push(formattedNumber);
    }
  }
  return finalArray;
}
