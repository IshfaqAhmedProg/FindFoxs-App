/* eslint-disable */

import * as puppeteer from "puppeteer";
import { parsePhoneNumber } from "libphonenumber-js";
const functions = require("firebase-functions");

// User provided constants
const MAX_CHILD_NODES = 0; // the number of child urls to scrape for data
type Headers = {
  allData: string;
  refinedData1: Array<string>;
};
type RecordData = Record<string, any>;
class DataMatch {
  name: string;
  type: "allData" | "allLinks";
  displayName: string;
  private regexp: RegExp;
  private matchArray: IterableIterator<RegExpMatchArray> | Array<any>;
  headers: Headers;
  constructor(
    _name: string,
    _displayName: string,
    _type: "allData" | "allLinks",
    _regExp: RegExp
  ) {
    this.name = _name;
    this.type = _type;
    this.displayName = _displayName;
    this.regexp = _regExp;
    this.matchArray = [];
    this.headers = {
      allData: _displayName,
      refinedData1: [_displayName, "Other " + _displayName + " Found"],
    };
  }
  getExtractedData(_data: Array<string | null> | string) {
    const extractedDataArray: Array<any> = [];

    switch (this.type) {
      case "allLinks":
        {
          if (Array.isArray(_data)) {
            this.matchArray = _data;
            // console.log("phoneNumber", _data)
            this.matchArray.forEach((item) => {
              if (item.includes("tel:")) {
                const phoneNumber = parsePhoneNumber(
                  "+" +
                    item.replace("tel:", "").replace("+", "").replace("-", "")
                );
                // console.log("phoneNumber found", item)
                if (phoneNumber) {
                  extractedDataArray.push(phoneNumber.formatInternational());
                }
              }
            });
          }
          return extractedDataArray;
          // console.log("phone number")
        }
        break;

      case "allData":
        {
          if (typeof _data === "string") {
            this.matchArray = _data.matchAll(this.regexp);
            // console.log("other", this.matchArray);
            for (const item of this.matchArray) {
              if (extractedDataArray.indexOf(item[0]) === -1) {
                // prevent duplicates
                extractedDataArray.push(item[0]);
              }
            }
          }
          return extractedDataArray;
        }
        break;
      default:
        return extractedDataArray;
        break;
    }
  }
}
// Initialising
let childLinks: Array<string | undefined> = [];
const extractors = [
  {
    dataMatch: new DataMatch(
      "emails",
      "Emails",
      "allData",
      new RegExp(/([A-z0-9_.+-]+@[A-z0-9_.-]+\.[A-z]+)/, "g")
    ),
  },
  {
    dataMatch: new DataMatch(
      "facebookLinks",
      "Facebook Links",
      "allData",
      new RegExp(
        /(?:https?:\/\/)?(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-.]*\/)*([\w\-.]*)/,
        "ig"
      )
    ),
  },
  {
    dataMatch: new DataMatch(
      "instagramLinks",
      "Instagram Links",
      "allData",
      new RegExp(
        /(?:https?:)?\/\/(?:www\.)?(?:instagram\.com|instagr\.am)\/([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)/,
        "g"
      )
    ),
  },
  {
    dataMatch: new DataMatch(
      "linkedInLinks",
      "LinkedIn Links",
      "allData",
      new RegExp(
        /(?:https?:)?\/\/(?:[\w]+\.)?linkedin\.com\/((company)|(school))\/([A-z0-9-À-ÿ.]+)\/?/,
        "g"
      )
    ),
  },
  {
    dataMatch: new DataMatch(
      "phoneNumber",
      "Phone Numbers",
      "allLinks",
      new RegExp(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/, "g")
    ),
  },
];
// adding style to header values by add header Name to all Data object
const emailsAndContactsScraper = async function (
  ROOT_URLS_TO_SCRAPE: Array<string>
) {
  // var sTime, eTime, ppsTime, ppeTime = 0;
  let refinedData: Array<any> = [];
  const allData: Array<RecordData> = [];
  functions.logger.log("Root URLs", ROOT_URLS_TO_SCRAPE);
  // create and style header
  const allDataHeaderNames = ["Root URL", "Scraped URL"];
  const refinedDataHeaderNames = ["URL"];
  extractors.forEach((extractor) => {
    allDataHeaderNames.push(extractor.dataMatch.headers.allData);
    refinedDataHeaderNames.push(...extractor.dataMatch.headers.refinedData1);
  });

  for (let index = 0; index < ROOT_URLS_TO_SCRAPE.length; index++) {
    const rootUrl = ROOT_URLS_TO_SCRAPE[index];
    await extractLinks(rootUrl, rootUrl).then(async (extract) => {
      allData.push(extract);
      functions.logger.log(`childLinks of ${rootUrl}`, childLinks);
      // console.log("childLinks of " + `${rootUrl}`, childLinks)
      for (let i = 0; i < childLinks.length; i++) {
        const childLink = childLinks[i];
        if (childLink) {
          try {
            await extractLinks(rootUrl, childLink, "child").then((extract) => {
              allData.push(extract);
            });
          } catch (error) {
            continue;
          }
        }
      }
    });
    functions.logger.log("All Data", allData);
    // console.log("allData", allData);
  }
  await refineAllData(allData).then((data) => (refinedData = data));
  functions.logger.log("Refined Data", refinedData);

  // console.log("DataMatch.refinedData", refinedData)
  return refinedData;
};

async function extractLinks(
  rootUrl: string,
  urlToScrape: string,
  linktype = ""
) {
  const browser = await puppeteer.launch({
    headless: true,
    ignoreHTTPSErrors: true,
  });
  const page = await browser.newPage();

  await page
    .goto(urlToScrape, {
      waitUntil: "domcontentloaded",
    })
    .catch((err: Error) => functions.logger.log("goto error", err));
  // page.waitForNetworkIdle({ idleTime: 1000 }),

  const extractedData: RecordData = {
    rootUrl: rootUrl,
    url: urlToScrape,
  };
  // scrolling to the bottom of the page 216s for 10 URLs with 2 Nodes in headless
  // scrolling to the bottom of the page 337s for 10 URLs with 2 Nodes in headful
  // await autoScroll(page)

  try {
    // populate childlinks
    if (linktype != "child") {
      const hrefs: Array<string | null> = await page.evaluate(() =>
        Array.from(document.querySelectorAll("a[href]"), (a) =>
          a.getAttribute("href")
        )
      );
      // filter out queryURL, '/' and /#sectionofpage and keep url type objects ie:"https://website.com/abcd" or
      // subdirectory type objects i.e:"/abcd"
      const filteredHref = hrefs.filter((c, index) => {
        if (c) {
          if (
            (c.includes(urlToScrape) && c != urlToScrape) ||
            (c.indexOf("/") == 0 && c.indexOf("#") != 1 && c != "/")
          ) {
            return hrefs.indexOf(c) === index;
          }
        }
        return;
      });
      filteredHref.length = Math.min(filteredHref.length, MAX_CHILD_NODES);
      // changing /page to website.com/page
      childLinks = filteredHref.map((link) => {
        if (link) {
          if (link.indexOf("/") == 0) {
            link = urlToScrape + link.slice(1);
          }
          return link;
        }
        return;
      });
    }
    // console.log("childLinks", childLinks)
    const fullPageData = await page.evaluate(
      () => document.querySelector("*")?.innerHTML
    );
    const fullPageLinks = await page.evaluate(() =>
      Array.from(document.querySelectorAll("a[href]"), (a) =>
        a.getAttribute("href")
      )
    );
    extractors.forEach((extractor) => {
      switch (extractor.dataMatch.type) {
        case "allLinks":
          {
            extractedData[extractor.dataMatch.name] =
              extractor.dataMatch.getExtractedData(fullPageLinks);
          }
          break;
        case "allData":
          {
            if (fullPageData) {
              extractedData[extractor.dataMatch.name] =
                extractor.dataMatch.getExtractedData(fullPageData);
            }
          }
          break;
        default:
          break;
      }
      // extractor.dataMatch.setAllData(rootUrl, urlToScrape, extractedData[extractor.dataMatch.name]);
    });
    await browser.close();
  } catch (error) {
    console.log("The browser timedout!", error);
    await browser.close();
  }
  await browser.close();
  // console.log("extractedData", extractedData);
  // DataMatch.setAllData(extractedData)
  return extractedData;
  // allData.push(Object.values(extractedData))
}

async function refineAllData(allData: Array<RecordData>) {
  // https://stackoverflow.com/questions/60036060/combine-object-array-if-same-key-value-in-javascript
  const refinedData: Array<{ [key: string]: string }> = [];
  const flattenedData = Object.values(allData).reduce((acc, curr) => {
    const duplicate: RecordData | undefined = acc.find(
      (e: RecordData) => e.rootUrl == curr.rootUrl
    );
    if (duplicate) {
      extractors.forEach((extractor) => {
        const propertyName = extractor.dataMatch.name as keyof RecordData;
        const currentProperty = curr[propertyName];
        if (Array.isArray(currentProperty)) {
          // logic for most occuring
          const counts = currentProperty.reduce((counts, num) => {
            counts[num] = (counts[num] || 0) + 1;
            return counts;
          }, {});
          const keys = Object.keys(counts);
          // sort most occuring first 222331
          keys.sort(function (p0, p1) {
            return counts[p1] - counts[p0];
          });
          // concate with existing
          console.log(duplicate[propertyName]);
          duplicate[propertyName] = [
            ...new Set([...duplicate[propertyName], ...keys]),
          ];
        }
      });
    } else {
      acc.push(curr);
    }
    return acc;
  }, []);
  // console.log("flattenedData", flattenedData);
  flattenedData.forEach((data: RecordData) => {
    const refinedDataInterface: RecordData = {
      website: data.rootUrl,
    };
    extractors.forEach((extractor) => {
      const name = extractor.dataMatch.name;
      const displayName = extractor.dataMatch.displayName;
      refinedDataInterface[displayName] = data[name][0] || "";
      refinedDataInterface["Other" + displayName] = data[name]
        .slice(1)
        .toString();
    });
    refinedData.push(refinedDataInterface);
  });
  return refinedData;
  // console.log("refinedData", refinedData);
}
export default emailsAndContactsScraper;
