import { getDownloadURL, ref, getStorage } from "firebase/storage";
import { writeFile, utils } from "sheetjs-style";
import {
  FileType,
  ResultData,
} from "@/components/ToolsComponents/UtilityComponents/ResultSummaryCard";
import { DocumentData } from "@firebase/firestore-types";
import Task from "../interfaces/Tasks";
import getFirstCharacter from "./stringTransformers/getFirstCharacter";

export default function downloadFile(
  resultData: ResultData,
  fileType: FileType,
  task: Task | DocumentData
) {
  const headers = getHeaders(resultData);
  const aoaData = [[]];
  resultData.response.map((obj) => {
    aoaData.push(Object.values(obj));
  });
  const worksheet = utils.aoa_to_sheet(applySheetStyles(headers, aoaData));
  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet);
  const idShort = task._id.slice(0, 8);
  writeFile(
    workbook,
    `FindFoxs${getFirstCharacter(task.tool)}_${idShort}.${fileType}`
  );
}
function getHeaders(resultData: ResultData) {
  return Object.keys(
    resultData.response.sort(
      (a, b) => Object.keys(b).length - Object.keys(a).length
    )[0]
  );
}
function applySheetStyles(headerArray: Array<string>, data: Array<Array<any>>) {
  headerArray.forEach((header) => {
    data[0].push({
      v: `${header}`,
      t: "s",
      s: {
        font: { bold: true, color: { rgb: "FFFFFFFF" } },
        fill: { fgColor: { rgb: "FF7B68EE" } },
        border: {
          top: { style: "medium", color: { rgb: "FF7B68EE" } },
          bottom: { style: "medium", color: { rgb: "FF7B68EE" } },
          left: { style: "medium", color: { rgb: "FF7B68EE" } },
          right: { style: "medium", color: { rgb: "FF7B68EE" } },
        },
        alignment: { wrapText: true },
      },
    });
  });
  return data;
}
export function getTaskDownloadUrl(downloadString: string) {
  return new Promise<string>((resolve, reject) => {
    const storage = getStorage();
    const responseRef = ref(storage, downloadString);
    getDownloadURL(responseRef)
      .then((url) => {
        console.log(url);
        resolve(url);
      })
      .catch((error) => {
        reject(error);
        console.log(error.code);
      });
  });
}
export function getTaskResult(url: string) {
  return new Promise<Array<any>>((resolve, reject) => {
    fetch("/api/taskResult/getTaskResult", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("res", res);
        resolve(res.response);
      })
      .catch((err) => {
        reject(err);
        console.log(err);
      });
  });
}
