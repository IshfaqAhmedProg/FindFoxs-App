import isEmail from "validator/lib/isEmail";

export default function checkIfEmail(emailArray: Array<string>) {
  const finalArray = [];
  for (const email of emailArray) {
    if (email && isEmail(email.toString())) {
      finalArray.push(email);
    }
  }
  return finalArray;
}
