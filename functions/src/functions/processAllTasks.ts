/* eslint-disable */
const functions = require("firebase-functions");
const admin = require("firebase-admin");
import emailsAndContactsScraper from "../services/EmailsAndContactsScraper/emailsAndContactsScraper";
import emailValidator from "../services/EmailValidator/emailValidator";
import facebookScraper from "../services/FacebookScraper/facebookScraper";
import googleMapsScraper from "../services/GoogleMapsScraper/googleMapsScraper";
import phoneNumberValidator from "../services/PhoneNumberValidator/phoneNumberValidator";
const path = require("path");
const os = require("os");
const fs = require("fs");

if (admin.apps.length === 0) {
  admin.initializeApp(functions.config().firebase);
}

const processAllTasks = functions
  .runWith({ timeoutSeconds: 540, memory: "1GB" })
  .storage.object()
  .onFinalize(async (object: any) => {
    const fileBucket = object.bucket; // The Storage bucket that contains the file.
    const filePath = object.name ?? ""; // File path in the bucket.
    const fileName = path.basename(filePath);
    const pathParts = path.dirname(filePath).split("/");
    const taskId = pathParts[pathParts.length - 1];
    const uid = pathParts[pathParts.length - 3];
    const contentType = object.contentType ?? ""; // File content type.
    try {
      // Exit if it is response.
      if (fileName == "response") {
        return admin
          .firestore()
          .collection(`users/${uid}/tasks`)
          .doc(taskId)
          .set(
            {
              status: "COMPLETE",
              dateCompleted: admin.firestore.Timestamp.now(),
            },
            { merge: true }
          );
      }
      // Exit if this is triggered on a file that is not a blob.
      if (!contentType.startsWith("application/")) {
        return functions.logger.log("This is not an blob.");
      }

      // download the response file in the storage
      const bucket = admin.storage().bucket(fileBucket);
      const tempFilePath = path.join(os.tmpdir(), taskId + "temp");
      const metadata = {
        contentType: contentType,
      };
      await bucket.file(filePath).download({ destination: tempFilePath });
      functions.logger.log("String downloaded locally to", tempFilePath);
      const requestString = fs.readFileSync(tempFilePath, "utf-8");
      const requestObject = JSON.parse(requestString);
      const tool = requestObject.tool;
      let responseVal: void | Array<any> = [];
      let postAnalysisVal = {};
      functions.logger.log("requestVal:", requestString);
      functions.logger.log("tool:", tool);
      // edit the request to response here
      switch (tool) {
        case "Google Maps Scraper":
          {
            functions.logger.log("Scraping Google Maps");
            responseVal = await googleMapsScraper(requestObject.request).catch(
              (err) => {
                functions.logger.log(err);
                handleTaskFailure(taskId, uid);
              }
            );
            functions.logger.log("after Scraping Google Maps", responseVal);
          }
          break;
        case "Facebook Scraper":
          {
            functions.logger.log("Scraping Facebook");
            responseVal = await facebookScraper(requestObject.request).catch(
              (err) => {
                functions.logger.log(err);
                handleTaskFailure(taskId, uid);
              }
            );
            functions.logger.log("after Scraping Facebook", responseVal);
          }
          break;
        case "Emails And Contacts Scraper":
          {
            functions.logger.log(
              "before Scraping Email and contacts",
              requestObject.request
            );
            responseVal = await emailsAndContactsScraper(
              requestObject.request
            ).catch((err) => {
              functions.logger.log(err);
              handleTaskFailure(taskId, uid);
            });
            // if a middleware then join the responseVal with the requestObject.response and assign to responseVal
            if (fileName == "middleware" && Array.isArray(responseVal)) {
              await joinAddonData(
                responseVal,
                requestObject.response,
                "website"
              ).then((jointData) => {
                responseVal = jointData;
              });
            }
            functions.logger.log(
              "after Scraping Email and contacts",
              responseVal
            );
          }
          break;
        case "Email Validator":
          {
            responseVal = await emailValidator(requestObject.request);
            postAnalysisVal = responseVal.pop();
          }
          break;
        case "Phone Number Validator":
          {
            responseVal = await phoneNumberValidator(requestObject.request);
          }
          break;
        default:
          break;
      }
      let responseFileName = "";
      let responseToWrite = {};
      // swithc case for addons
      if (Array.isArray(responseVal) && responseVal.length != 0) {
        functions.logger.log("addons detected", requestObject.request.addons);
        switch (requestObject.request.addons) {
          case "EmailAndContacts":
            {
              functions.logger.log(
                "Middleware detected",
                requestObject.request.addons
              );
              // get website url of any result in an array
              const maxNoOfWebsite = 10;
              const websiteExtract = responseVal
                .filter((result) => result.website !== "")
                .map((result) => result.website);
              if (websiteExtract.length > maxNoOfWebsite) {
                websiteExtract.length = maxNoOfWebsite;
              }
              responseFileName = "middleware";
              responseToWrite = {
                _id: taskId,
                tool: "Emails And Contacts Scraper",
                request: websiteExtract,
                response: responseVal,
              };
            }
            break;
          default:
            {
              responseFileName = "response";
              responseToWrite = {
                response: responseVal,
              };
            }
            break;
        }
        const responseStringPath = path.join(
          path.dirname(filePath),
          responseFileName
        );
        fs.writeFileSync(tempFilePath, JSON.stringify(responseToWrite));
        functions.logger.log("responseVal", responseVal);
        functions.logger.log("responseToWrite", responseToWrite);
        functions.logger.log("postAnalysis", postAnalysisVal);
        // Uploading the blob.
        await bucket.upload(tempFilePath, {
          destination: responseStringPath,
          metadata: metadata,
        });
        // Once the blob has been uploaded delete the local file to free up disk space.
        fs.unlinkSync(tempFilePath);
        return admin
          .firestore()
          .collection(`users/${uid}/tasks`)
          .doc(taskId)
          .set(postAnalysisVal, { merge: true });
      } else {
        handleTaskFailure(taskId, uid);
      }
    } catch (error) {
      functions.logger.log(error);
      handleTaskFailure(taskId, uid);
    }
  });

async function joinAddonData(
  toJoin: Array<any>,
  joinWith: Array<any>,
  joinBy: string
) {
  // function to join the result of the addon to the previous data
  const jointData = joinWith
    .filter((obj1) => joinWith.some((obj2) => obj1[joinBy] === obj2[joinBy]))
    .map((obj1) => ({
      ...obj1,
      ...toJoin.find((obj2) => obj1[joinBy] === obj2[joinBy]),
    }));
  return jointData;
}

async function handleTaskFailure(taskId: string, uid: string) {
  return admin.firestore().collection(`users/${uid}/tasks`).doc(taskId).set(
    {
      status: "FAILED",
      dateCompleted: admin.firestore.Timestamp.now(),
    },
    { merge: true }
  );
}
export default processAllTasks;
