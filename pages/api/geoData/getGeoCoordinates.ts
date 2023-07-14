import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const requestOptions = {
    method: "GET",
  };
  return new Promise<void>((resolve, reject) => {
    fetch(
      `https://nominatim.openstreetmap.org/search?q=${req.body.city},+${req.body.state},+${req.body.country}&format=json`,
      requestOptions
    )
      .then((response) => response.json())
      .then((response) => {
        res.status(200).send(response);
        console.log("geocoords response", response);
        resolve();
      })
      .catch((error) => {
        console.log("geocoords error", error);
        res.json(error);
        res.status(405).end();
        resolve();
      });
  });
};
export default handler;
