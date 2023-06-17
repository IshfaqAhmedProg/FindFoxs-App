import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  var headers = new Headers();
  headers.append(
    "X-CSCAPI-KEY",
    "aTJhR2RKUk9OdWV6bno3MkIwd2ZlaVQwcExueHF1QWxmZnV3UDg2WA=="
  );

  return new Promise<void>((resolve, reject) => {
    fetch("https://api.countrystatecity.in/v1/countries", {
      method: "GET",
      headers: headers,
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((response) => {
        res.status(200).json(response);
        resolve();
      })
      .catch((error) => {
        res.json(error);
        res.status(405).end();
        resolve(); // in case something goes wrong in the catch block (as vijay commented)
      });
  });
};
export default handler;
