import React, { createContext, useContext, useState } from "react";
import { db, auth } from "../firebase/config";
import { useAuth } from "./AuthContext";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { getStorage, ref, uploadString } from "firebase/storage";
import { v5 as uuidv5 } from "uuid";
import { estimatedTTC } from "@/shared/functions/estimatedTTC";
import { IToolFormData } from "@/shared/interfaces/ToolForm";

const DatabaseContext = createContext<any>({});
export const useDatabase = () => useContext(DatabaseContext);
export const DatabaseContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const setUserTasks = async (
    formData: IToolFormData,
    service: string,
    queryCount: number
  ) => {
    setLoading(true);
    var adder = null;
    const dateId = Date.now();
    const MY_NAMESPACE = process.env.NEXT_PUBLIC_UUID_NAMESPACE ?? "Ethoslab";
    const taskId = uuidv5(dateId.toString(), MY_NAMESPACE)
      .replace(/[-]/g, "")
      .slice(0, 20);
    const taskIdShort = taskId.slice(0, 8);
    const estTTC = estimatedTTC(queryCount, service);
    const data = {
      dateCreated: Timestamp.fromDate(new Date(dateId)),
      queryCount: queryCount,
      service: service,
      taskRunning: true,
      uid: user?.uid,
      taskId,
      taskIdShort,
      estimatedTTC: estTTC,
    };
    if (auth.currentUser) {
      console.log(
        "data being submitted",
        JSON.stringify({ ...data, request: formData })
      );
      const storage = getStorage();
      const dataBlob = JSON.stringify({ ...data, request: formData });
      const blobRef = ref(storage, `${user?.uid}/tasks/${taskId}/request`);
      adder = Promise.all([
        uploadString(blobRef, dataBlob).then(async (snapshot) => {
          await setDoc(doc(db, "tasks", taskId), data);
          setLoading(false);
        }),
      ]);
      return adder;
    }
  };
  return (
    <DatabaseContext.Provider value={{ setUserTasks, loading }}>
      {children}
    </DatabaseContext.Provider>
  );
};
