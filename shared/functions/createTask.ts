import { v5 as uuidv5 } from "uuid";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { getStorage, ref, uploadString } from "firebase/storage";
import { User } from "firebase/auth";
import Task from "@/shared/interfaces/Tasks";
import { db } from "@/firebase/config";

export default async function (
  user: User | null,
  request: any,
  tool: string,
  queryCount: number,
  unit: string
) {
  var adder = null;
  if (user) {
    const dateId = Date.now();
    const MY_NAMESPACE = process.env.NEXT_PUBLIC_UUID_NAMESPACE ?? "Ethoslab";
    const _id = uuidv5(dateId.toString(), MY_NAMESPACE)
      .replace(/[-]/g, "")
      .slice(0, 20);
    const data: Task = {
      dateCreated: Timestamp.fromDate(new Date(dateId)),
      queryCount: queryCount,
      tool,
      status: "RUNNING",
      uid: user.uid,
      _id,
      unit,
    };
    const dataBlobObj = { ...data, request: request };
    const storage = getStorage();
    const dataBlob = JSON.stringify(dataBlobObj);
    const blobRef = ref(storage, `${user.uid}/tasks/${_id}/request`);
    adder = Promise.all([
      uploadString(blobRef, dataBlob).then(async (snapshot) => {
        await setDoc(doc(db, `users/${user.uid}/tasks`, _id), data);
      }),
    ]).catch((err) => {
      console.log(`Error creating task : ${_id}`, err);
      throw new Error(`Error creating task : ${_id}!`);
    });
    return adder;
  }
}
