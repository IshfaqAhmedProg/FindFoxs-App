import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const requestOptions = {
    method: "GET",
  };
  return new Promise<void>((resolve, reject) => {
    fetch(req.body.url, requestOptions)
      .then((response) => response.json())
      .then((response) => {
        res.status(200).send(response);
        // console.log(response);
        resolve();
      })
      .catch((error) => {
        console.log(error);
        res.status(405).end();
        resolve(); // in case something goes wrong in the catch block (as vijay commented)
      });
  });
};
export default handler;
