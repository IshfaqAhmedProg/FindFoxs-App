import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  var headers = new Headers();
  headers.append("X-RapidAPI-Key", process.env.RAPID_API_KEY ?? "");
  headers.append("X-RapidAPI-Host", "veriphone.p.rapidapi.com");
  return new Promise<void>((resolve, reject) => {
    fetch(
      `https://veriphone.p.rapidapi.com/verify?phone=%2B${req.body.number}`,
      {
        method: "GET",
        headers,
      }
    )
      .then((response) => response.json())
      .then((response) => {
        // console.log(response);
        res.status(200).json({ ...response, status: "success" });
        resolve();
      })
      .catch((error) => {
        res.status(405).json(error);
        res.end();
        resolve();
      });
  });
};
export default handler;
