/* eslint-disable */
import puppeteer from "puppeteer-extra";
import functions = require("firebase-functions");
import StealthPlugin = require("puppeteer-extra-plugin-stealth");
import { Page } from "puppeteer";
var userAgent = require("user-agents");
puppeteer.use(StealthPlugin());
const facebookScraper = async function (request: Array<string>) {
  const result = [];
  try {
    for (const url of request) {
      if (url) {
        const buffer = await getFacebookInfo(url);
        result.push(buffer);
      }
    }
    // const dedupedResult = [...new Map(result.map(v => [v.title, v])).values()]
  } catch (error) {
    functions.logger.log(error);
  }
  return result;
};
async function fillDataFromPage(page: Page) {
  page.on("console", async (msg) => {
    const msgArgs = msg.args();
    for (let i = 0; i < msgArgs.length; ++i) {
      functions.logger.log(await msgArgs[i].jsonValue());
    }
  });
  const dataFromPage = await page.evaluate(() => {
    const likesRegex = /([\d.]+)([KMB])?\s+likes/i;
    const followersRegex = /([\d.]+)([KMB])?\s+followers/i;
    const followingRegex = /([\d.]+)([KMB])?\s+following/i;

    const name = (document.querySelector("h1.x1heor9g") as HTMLElement)
      .innerText;

    const info =
      (document.querySelector(".xieb3on span:nth-child(1)") as HTMLElement)
        ?.innerText ||
      (
        document.querySelector(
          "div.x7wzq59:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > span:nth-child(1) > div:nth-child(1) > div:nth-child(1) > span:nth-child(1) > div:nth-child(1) > div:nth-child(1)"
        ) as HTMLElement
      )?.innerText;

    const category = (
      document.querySelector(
        "div.x7wzq59:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > ul:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > span:nth-child(1) > div:nth-child(1) > span:nth-child(1)"
      ) as HTMLElement
    )?.innerText;

    const address = (
      document.querySelector(
        "div.x1nhvcw1:nth-child(2) > div:nth-child(2) > div:nth-child(1) > span:nth-child(1)"
      ) as HTMLElement
    )?.innerText;

    const phoneNumber = (
      document.querySelector(
        "div.x1nhvcw1:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > span:nth-child(1)"
      ) as HTMLElement
    )?.innerText;

    const email =
      (
        document.querySelector(
          "div.x7wzq59:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(7) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > span:nth-child(1) > span:nth-child(1)"
        ) as HTMLElement
      )?.innerText ||
      (
        document.querySelector(
          "div.x1nhvcw1:nth-child(4) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > span:nth-child(1)"
        ) as HTMLElement
      )?.innerText;

    const website =
      (
        document.querySelector(
          "div.x2lah0s:nth-child(5) > div:nth-child(2) > div:nth-child(1) > a:nth-child(1) > div:nth-child(1) > div:nth-child(1) > span:nth-child(1)"
        ) as HTMLElement
      )?.innerText ||
      (document.querySelector(".x1qq9wsj .x1yc453h") as HTMLElement)
        ?.innerText ||
      (
        document.querySelector(
          "div.x7wzq59:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(5) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > span:nth-child(1) > span:nth-child(1) > a:nth-child(1)"
        ) as HTMLElement
      )?.innerText;
    const rating = (
      document.querySelector(
        "div.x9f619:nth-child(7) > div:nth-child(2) > a:nth-child(1) > div:nth-child(1) > div:nth-child(1) > span:nth-child(1)"
      ) as HTMLElement
    )?.innerText.match(/[\d\.]+(?=\s*\()/);

    const reviews = (
      document.querySelector(
        "div.x9f619:nth-child(7) > div:nth-child(2) > a:nth-child(1) > div:nth-child(1) > div:nth-child(1) > span:nth-child(1)"
      ) as HTMLElement
    )?.innerText.match(/\d+(?=\s+reviews)/);

    const likes =
      (
        document.querySelector(
          "div.x1cy8zhl:nth-child(2) > span:nth-child(1)"
        ) as HTMLElement
      )?.innerText
        .match(likesRegex)?.[0]
        .replace(" likes", "") ||
      (
        document.querySelector(
          "div.x7wzq59:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > span:nth-child(1) > span:nth-child(1)"
        ) as HTMLElement
      )?.innerText.replace(" people", "");

    const followers =
      (
        document.querySelector(
          "div.x1cy8zhl:nth-child(2) > span:nth-child(1)"
        ) as HTMLElement
      )?.innerText
        .match(followersRegex)?.[0]
        .replace(" followers", "") ||
      (
        document.querySelector(
          "div.xl56j7k:nth-child(4) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > span:nth-child(1) > span:nth-child(1)"
        ) as HTMLElement
      )?.innerText.replace(" people follow this", "");

    const following = (
      document.querySelector(
        "div.x1cy8zhl:nth-child(2) > span:nth-child(1)"
      ) as HTMLElement
    )?.innerText
      .match(followingRegex)?.[0]
      .replace(" following", "");

    const pageDetails = {
      nameOnFb: name || "",
      infoOnFb: info?.startsWith("Page · ") ? "" : info,
      categoryOnFb: category
        ? category.replace("Page · ", "")
        : info?.startsWith("Page · ")
        ? info.replace("Page · ", "")
        : "",
      addressOnFb: address || "",
      phoneOnFb: phoneNumber || "",
      emailOnFb: email || "",
      websiteOnFb: website || "",
      ratingOnFb: rating ? `${rating[0]} stars` : "",
      reviewsOnFb: reviews ? reviews[0] : "",
      likesOnFb: likes || "",
      followersOnFb: followers || "",
      followingOnFb: following || "",
    };
    return pageDetails;
  });
  return dataFromPage;
}
async function getFacebookInfo(URL: string) {
  var results: Record<string, any> = {
    nameOnFb: "",
    infoOnFb: "",
    categoryOnFb: "",
    addressOnFb: "",
    phoneOnFb: "",
    emailOnFb: "",
    websiteOnFb: "",
    ratingOnFb: "",
    reviewsOnFb: "",
    likesOnFb: "",
    followersOnFb: "",
    followingOnFb: "",
  };
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.setUserAgent(userAgent.random().toString());
    //need to enable cookies https://stackoverflow.com/questions/69496344/how-to-set-cookies-enabled-in-puppeteer
    await page
      .goto(URL)
      .then(async () => {
        await page.waitForTimeout(5000);
        results = await fillDataFromPage(page);
      })
      .catch((err) =>
        functions.logger.log(
          "\x1b[31mNot possible to scrape, problem with the website!\x1b[37m",
          URL
        )
      );
    results.facebookLink = URL;
    // await page.waitForNavigation();
    await browser.close();
  } catch (err) {
    functions.logger.log("faceboook scraper", URL, err);
  }
  return results;
}
export default facebookScraper;
