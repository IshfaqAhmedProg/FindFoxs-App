/* eslint-disable */
import fetch from "node-fetch";

const phoneNumberValidator = async function (request: Array<string>) {
  const validatedNumbers = await validateAllNumbers(request);
  return validatedNumbers;
};
const validateAllNumbers = async (numbers: Array<string>) => {
  const allAsyncResults = [];
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": `${process.env.RAPID_API_KEY}`,
      "X-RapidAPI-Host": "veriphone.p.rapidapi.com",
    },
  };
  for (const item of numbers) {
    const data = await (
      await fetch(
        `https://veriphone.p.rapidapi.com/verify?phone=%2B${item}`,
        options
      )
    ).json();
    const configdata = { ...(data as any), number: item };
    allAsyncResults.push(configdata);
  }

  return allAsyncResults;
};
export default phoneNumberValidator;
