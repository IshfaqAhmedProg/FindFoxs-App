/* eslint-disable */

import { Page } from "puppeteer";
import puppeteer from "puppeteer-extra";
import stealthPlugin = require("puppeteer-extra-plugin-stealth");

puppeteer.use(stealthPlugin());
interface GoogleMapsRequest {
  keywords: Array<string>;
  coords: string;
  language: string;
}
const googleMapsScraper = async function (request: GoogleMapsRequest) {
  let fireStoreVals = [];
  try {
    // const firestoreVals = await withPuppeteer.getLocalPlacesInfo(`${request.keywords} in ${request.city} ${request.state} ${request.country}`, request.coords, request.language);
    fireStoreVals = await scrapeAllKeywords(request);
    // var businesses = await firestoreVals.reduce((obj, item) => (obj[item.title] = item, obj), {});
  } catch (error) {
    console.log("error", error);
  }
  return fireStoreVals;
};
/**
 *
 * @param request
 */
async function scrapeAllKeywords(request: GoogleMapsRequest) {
  const result: Array<any> = [];
  for (let index = 0; index < request.keywords.length; index++) {
    const keyword = request.keywords[index];
    console.log(keyword);
    const buffer = await getLocalPlacesInfo(
      keyword,
      request.coords,
      request.language
    );
    buffer.forEach((element) => {
      result.push(element);
    });
  }
  const dedupedResult = [...new Map(result.map((v) => [v.title, v])).values()];
  return dedupedResult;
}
/**
 *
 * @param page
 * @param scrollContainer
 */
async function scrollPage(page: Page, scrollContainer: string) {
  let lastHeight = await page.evaluate(
    `document.querySelector("${scrollContainer}").scrollHeight`
  );

  while (true) {
    await page.evaluate(
      `document.querySelector("${scrollContainer}").scrollTo(0, document.querySelector("${scrollContainer}").scrollHeight)`
    );
    new Promise((r) => setTimeout(r, 5000));
    const newHeight = await page.evaluate(
      `document.querySelector("${scrollContainer}").scrollHeight`
    );
    if (newHeight === lastHeight) {
      break;
    }
    lastHeight = newHeight;
  }
}

/**
 *
 * @param page
 */
async function fillDataFromPage(page: Page) {
  const dataFromPage = await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".bfdHYd")).map((el) => {
      const placeUrl =
        el.parentElement?.querySelector(".hfpxzc")?.getAttribute("href") ?? "";
      const urlPattern =
        /!1s(?<id>[^!]+).+!3d(?<latitude>[^!]+)!4d(?<longitude>[^!]+)/gm; // https://regex101.com/r/KFE09c/1
      const dataId = [...placeUrl.matchAll(urlPattern)].map(
        ({ groups }) => groups?.id
      )[0];
      const latitude = [...placeUrl.matchAll(urlPattern)].map(
        ({ groups }) => groups?.latitude
      )[0];
      const longitude = [...placeUrl.matchAll(urlPattern)].map(
        ({ groups }) => groups?.longitude
      )[0];
      return {
        title: el.querySelector(".qBF1Pd")?.textContent?.trim() ?? "",
        rating: el.querySelector(".MW4etd")?.textContent?.trim() ?? "",
        reviews:
          el
            .querySelector(".UY7F9")
            ?.textContent?.replace("(", "")
            .replace(")", "")
            .trim() ?? "",
        type:
          el
            .querySelector(
              ".W4Efsd:last-child > .W4Efsd:nth-of-type(1) > span:first-child"
            )
            ?.textContent?.replaceAll("·", "")
            .trim() ?? "",
        address:
          el
            .querySelector(
              ".W4Efsd:last-child > .W4Efsd:nth-of-type(1) > span:last-child"
            )
            ?.textContent?.replaceAll("·", "")
            .trim() ?? "",
        openState:
          el
            .querySelector(
              ".W4Efsd:last-child > .W4Efsd:nth-of-type(2) > span:nth-child(1)"
            )
            ?.textContent?.replaceAll("·", "")
            .trim() ?? "",
        phone:
          el
            .querySelector(
              ".W4Efsd:last-child > .W4Efsd:nth-of-type(2) > span:nth-child(2)"
            )
            ?.textContent?.replaceAll("·", "")
            .trim() ?? "",
        website: el.querySelector("a[data-value]")?.getAttribute("href"),
        description:
          el
            .querySelector(
              ".W4Efsd:last-child > .W4Efsd:nth-of-type(1) > span:first-child"
            )
            ?.textContent?.replace("·", "")
            .trim() ?? "",
        serviceOptions:
          el
            .querySelector(".qty3Ue")
            ?.textContent?.replaceAll("·", "")
            .replaceAll("  ", " ")
            .trim() ?? "",
        latitude,
        longitude,
        placeUrl,
        dataId,
      };
    });
  });
  return dataFromPage;
}

/**
 *
 * @param query
 * @param coordinates
 * @param hl
 */
async function getLocalPlacesInfo(
  query: string,
  coordinates: string,
  hl = "en"
) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  console.log(coordinates);
  const page = await browser.newPage();
  const queryURI = encodeURI(query);
  const URL = `http://google.com/maps/search/${queryURI}/${coordinates}?hl=${hl}`;
  // await page.setDefaultNavigationTimeout(60000);
  await page.goto(URL);

  await page.waitForNavigation();

  const scrollContainer = ".m6QErb[aria-label]";

  const localPlacesInfo = [];

  new Promise((r) => setTimeout(r, 2000));

  await scrollPage(page, scrollContainer);
  localPlacesInfo.push(...(await fillDataFromPage(page)));

  await browser.close();
  return localPlacesInfo;
}
export default googleMapsScraper;
