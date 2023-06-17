import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  var headers = new Headers();
  headers.append("X-RapidAPI-Key", process.env.RAPID_API_KEY ?? "");
  headers.append("X-RapidAPI-Host", "mailcheck.p.rapidapi.com");

  return new Promise<void>((resolve, reject) => {
    fetch(`https://mailcheck.p.rapidapi.com/?domain=${req.body.domain}`, {
      method: "GET",
      headers,
    })
      .then((response) => response.json())
      .then((response) => {
        res.status(200).json(response);
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
export default handler;
