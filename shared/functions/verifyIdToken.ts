import { jwtVerify, createLocalJWKSet } from "jose";
const decodeIdToken = async (idToken: string) => {
  const response = await (
    await fetch(
      "https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com"
    )
  ).json();
  // console.log("response from google", response);
  // console.log("idtoken", idToken);
  // const header64 = idToken.split(".")[0];
  // const header = JSON.parse(Buffer.from(header64, "base64").toString("ascii"));
  const JWKS = createLocalJWKSet(response);
  // console.log("header=>", header);
  const { payload } = await jwtVerify(idToken, JWKS);
  // console.log("payload=>", payload);
  return payload;
};
export default decodeIdToken;
