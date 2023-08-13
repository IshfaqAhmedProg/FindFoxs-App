import { useState } from "react";
import { doc, FirestoreError, setDoc, Timestamp } from "firebase/firestore";
import { getStorage, ref, uploadString } from "firebase/storage";
import { v5 as uuidv5 } from "uuid";
import Task from "@/shared/interfaces/Tasks";
import { User } from "firebase/auth";
import { db } from "@/firebase/config";

type ReturnProps = [
  (
    formData: any,
    tool: string,
    queryCount: number,
    unit: string
  ) => Promise<void | [void]>,
  boolean,
  FirestoreError | undefined | Error
];

const useCreateTask = ({ user }: { user: User | null }): ReturnProps => {
  const [loadingCreateTask, setLoadingCreateTask] = useState<boolean>(false);
  const [error, setError] = useState<FirestoreError | undefined | Error>();
  const setUserTasks = async (
    formData: any,
    tool: string,
    queryCount: number,
    unit: string
  ) => {
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
      const dataBlobObj = { ...data, request: formData };
      const storage = getStorage();
      const dataBlob = JSON.stringify(dataBlobObj);
      const blobRef = ref(storage, `${user.uid}/tasks/${_id}/request`);
      setLoadingCreateTask(true);
      adder = Promise.all([
        uploadString(blobRef, dataBlob).then(async (snapshot) => {
          await setDoc(doc(db, `users/${user.uid}/tasks`, _id), data);
        }),
      ]).catch((err) => {
        console.log(err);
        setLoadingCreateTask(false);
        setError(err);
      });
      return adder;
    }
  };
  return [setUserTasks, loadingCreateTask, error];
};
export default useCreateTask;
