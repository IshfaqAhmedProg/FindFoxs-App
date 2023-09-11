import type { NextApiRequest, NextApiResponse } from "next";
const emailExistence = require("email-existence");
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  var headers = new Headers();
  headers.append("X-RapidAPI-Key", process.env.RAPID_API_KEY ?? "");
  headers.append("X-RapidAPI-Host", "mailcheck.p.rapidapi.com");
  const email = req.body.domain;
  return new Promise<void>((resolve, reject) => {
    console.log(email);
    fetch(`https://mailcheck.p.rapidapi.com/?domain=${email}`, {
      method: "GET",
      headers,
    })
      .then((response) => response.json())
      .then(async (response) => {
        const updatedData = await checkEmailExistence(email, response);
        res.status(200).json(updatedData);
        resolve();
      })
      .catch((error) => {
        res.json(error);
        console.log(error);
        res.status(405).end();
        resolve(); // in case something goes wrong in the catch block (as vijay commented)
      });
  });
};
const checkEmailExistence = (email: string, obj: any) => {
  return new Promise((resolve, reject) => {
    emailExistence.check(
      email,
      (error: any, res: boolean) => {
        const newCols = {
          email,
          inbox_checkable: false,
          inbox_exists: false,
        };
        if (error) {
          console.log(`Error from email-existence for ${email}`, error);
          obj = { ...obj, ...newCols };
        } else {
          console.log(`Response from email-existence for ${email}`, res);
          newCols.inbox_checkable = true;
          newCols.inbox_exists = res;
          obj = { ...obj, ...newCols };
        }
        resolve(obj);
      },
      1000
    );
  });
};
export default handler;
