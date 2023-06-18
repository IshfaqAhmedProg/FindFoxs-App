import React, { createContext, useContext, useState } from "react";
import { db, auth } from "../firebase/config";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { getStorage, ref, uploadString } from "firebase/storage";
import { v5 as uuidv5 } from "uuid";
import { estimatedTTC } from "@/shared/functions/estimatedTTC";
import Task from "@/shared/interfaces/Tasks";

const DatabaseContext = createContext<any>({});
export const useDatabase = () => useContext(DatabaseContext);
export const DatabaseContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const setUserTasks = async (
    formData: any,
    tool: string,
    queryCount: number
  ) => {
    setLoading(true);
    var adder = null;
    if (auth.currentUser) {
      const dateId = Date.now();
      const MY_NAMESPACE = process.env.NEXT_PUBLIC_UUID_NAMESPACE ?? "Ethoslab";
      const _id = uuidv5(dateId.toString(), MY_NAMESPACE)
        .replace(/[-]/g, "")
        .slice(0, 20);
      const _idShort = _id.slice(0, 8);
      const estTTC = estimatedTTC(queryCount, tool);
      const data: Task = {
        dateCreated: Timestamp.fromDate(new Date(dateId)),
        queryCount: queryCount,
        tool: tool,
        status: "RUNNING",
        uid: auth.currentUser.uid,
        _id,
        _idShort,
        estimatedTTC: estTTC,
      };
      console.log(
        "data being submitted",
        JSON.stringify({ ...data, request: formData })
      );
      const storage = getStorage();
      const dataBlob = JSON.stringify({ ...data, request: formData });
      const blobRef = ref(
        storage,
        `${auth.currentUser.uid}/tasks/${_id}/request`
      );
      adder = Promise.all([
        uploadString(blobRef, dataBlob).then(async (snapshot) => {
          await setDoc(doc(db, "tasks", _id), data);
        }),
      ]);
      setLoading(false);
      return adder;
    }
  };
  return (
    <DatabaseContext.Provider value={{ setUserTasks, loading }}>
      {children}
    </DatabaseContext.Provider>
  );
};