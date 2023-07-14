import React, { useEffect, useState } from "react";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { getStorage, ref, uploadString } from "firebase/storage";
import { v5 as uuidv5 } from "uuid";
import { estimatedTTC } from "@/shared/functions/estimatedTTC";
import Task from "@/shared/interfaces/Tasks";
import { User } from "firebase/auth";
import { db } from "@/firebase/config";

const useCreateTask = ({
  user,
}: {
  user: User | null;
}): [
  (
    formData: any,
    tool: string,
    queryCount: number,
    unit: string
  ) => Promise<void | [void]>,
  boolean
] => {
  const [loadingCreateTask, setLoadingCreateTask] = useState<boolean>(false);
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
      const _idShort = _id.slice(0, 8);
      const data: Task = {
        dateCreated: Timestamp.fromDate(new Date(dateId)),
        queryCount: queryCount,
        tool,
        status: "RUNNING",
        uid: user.uid,
        _id,
        _idShort,
        unit,
      };

      const storage = getStorage();
      const dataBlob = JSON.stringify({ ...data, request: formData });
      const blobRef = ref(storage, `${user.uid}/tasks/${_id}/request`);
      setLoadingCreateTask(true);
      adder = Promise.all([
        uploadString(blobRef, dataBlob).then(async (snapshot) => {
          await setDoc(doc(db, `users/${user.uid}/tasks`, _id), data);
        }),
      ]).catch((err) => {
        console.log(err);
        setLoadingCreateTask(false);
      });
      return adder;
    }
  };
  return [setUserTasks, loadingCreateTask];
};
export default useCreateTask;
