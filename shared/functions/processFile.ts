import { read, utils } from "xlsx";

export default function processFile(files: FileList) {
  if (files) {
    const file = files[0];
    return new Promise((resolve, reject) => {
      const fileSizeInKb = file.size / 1024;
      const MAX_FILE_SIZE = 25 * 1024;
      if (fileSizeInKb < MAX_FILE_SIZE) {
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);
        fileReader.onload = (e) => {
          if (e.target?.result) {
            const bufferArray = e.target.result;
            const workbook = read(bufferArray, { type: "buffer", raw: true });
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const sheetdata = utils.sheet_to_json(worksheet);
            resolve(sheetdata);
          }
        };
        fileReader.onerror = (err) => {
          console.log(err);
          throw new Error("File reading Error");
        };
      } else {
        throw new Error("File too big");
      }
    });
  }
}
